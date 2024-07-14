import type NodeCG from '@nodecg/types';
import { ActiveBreakScene, ActiveRound } from 'schemas';
import { DASHBOARD_BUNDLE_NAME } from './constants';
import { CentralCredentials, CentralTeamMapping, CentralTeamMatchups, Configschema } from 'types/schemas';
import axios from 'axios';
import { CentralMatchupsResponse, CentralSSOLoginResponse } from 'types/central';
import { decodeJwt } from 'jose';
import { DateTime } from 'luxon';

export = (nodecg: NodeCG.ServerAPI<Configschema>): void => {
    const activeBreakScene = nodecg.Replicant<ActiveBreakScene>('activeBreakScene', DASHBOARD_BUNDLE_NAME);
    const breakUseCastersScene = nodecg.Replicant<boolean>('breakUseCastersScene', { defaultValue: false });

    activeBreakScene.on('change', () => {
        breakUseCastersScene.value = false;
    });

    const router = nodecg.Router();
    const centralPath = nodecg.bundleConfig.central?.basePath;
    const centralCredentials = nodecg.Replicant<CentralCredentials>('centralCredentials');

    router.get('/central-sso', async (req, res) => {
        if (centralPath == null) {
            return res.status(500).send('Central URL is not configured.');
        }

        if (req.query.code == null) {
            return res.status(400).send('No code provided.');
        }

        try {
            const loginResponse = await axios.post<CentralSSOLoginResponse>(`${centralPath}/sso/login`, {
                code: req.query.code
            });

            const decoded = decodeJwt(loginResponse.data.session);

            centralCredentials.value = {
                expires: decoded.exp,
                token: loginResponse.data.session
            };
        } catch (e) {
            return res.status(500).send(`Failed to login: ${e}`);
        }

        res.status(200).send('<script>window.close();</script>');
    });

    function checkAccessToken() {
        if (centralCredentials.value?.expires == null) return;

        if (DateTime.fromSeconds(centralCredentials.value.expires).diffNow().milliseconds <= 0) {
            centralCredentials.value = {
                token: null,
                expires: null
            };
        }
    }

    checkAccessToken();
    setInterval(checkAccessToken, 60 * 1000);

    nodecg.mount(`/${nodecg.bundleName}`, router);


    const activeRound = nodecg.Replicant('activeRound', DASHBOARD_BUNDLE_NAME) as unknown as NodeCG.ServerReplicantWithSchemaDefault<ActiveRound>;
    const centralTeamMapping = nodecg.Replicant('centralTeamMapping') as unknown as NodeCG.ServerReplicantWithSchemaDefault<CentralTeamMapping>;
    const centralTeamMatchups = nodecg.Replicant('centralTeamMatchups') as unknown as NodeCG.ServerReplicantWithSchemaDefault<CentralTeamMatchups>;

    activeRound.on('change', (newValue, oldValue) => {
        if (oldValue == null) return;
        let resetMatchupData = false;
        if (newValue.teamA.id !== oldValue.teamA.id) {
            centralTeamMapping.value.teamA = [];
            resetMatchupData = true;
        }
        if (newValue.teamB.id !== oldValue.teamB.id) {
            centralTeamMapping.value.teamB = [];
            resetMatchupData = true;
        }
        if (resetMatchupData) {
            centralTeamMatchups.value = {
                headToHead: undefined,
                teamA: undefined,
                teamB: undefined
            };
        }
    });

    function buildMatchupSearchUrl(teamIds: string[], endpoint: 'matchups' | 'team-matches'): string {
        if (centralPath == null) {
            throw new Error('Central URL is not configured.');
        }

        const url = new URL(`${centralPath}/match/${endpoint}`);
        teamIds.forEach(id => {
            url.searchParams.append('team_id', id);
        });

        return url.toString();
    }

    async function getMatchups(teamIds: string[], type: 'headToHead' | 'team'): Promise<CentralMatchupsResponse> {
        if (centralCredentials.value?.token == null) {
            throw new Error('Not logged in to Central');
        }
        const headers = { Authorization: `JWT ${centralCredentials.value.token}` };

        try {
            const response = await axios.get<CentralMatchupsResponse>(
                buildMatchupSearchUrl(teamIds, type === 'headToHead' ? 'matchups' : 'team-matches'),
                { headers }
            );

            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response?.status === 404) {
                return {
                    tournaments: []
                };
            }

            throw e;
        }
    }

    nodecg.listenFor('loadCentralMatchups', async (data, ack) => {
        if (ack == null || ack.handled) return;

        try {
            const headToHeadData = await getMatchups([...centralTeamMapping.value.teamA, ...centralTeamMapping.value.teamB], 'headToHead');
            const teamAData = await getMatchups(centralTeamMapping.value.teamA, 'team');
            const teamBData = await getMatchups(centralTeamMapping.value.teamB, 'team');

            centralTeamMatchups.value = {
                headToHead: headToHeadData,
                teamA: teamAData,
                teamB: teamBData
            };
        } catch (e) {
            return ack(e);
        }

        ack(null);
    });
}
