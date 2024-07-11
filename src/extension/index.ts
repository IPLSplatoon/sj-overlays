import type NodeCG from '@nodecg/types';
import { ActiveBreakScene } from 'schemas';
import { DASHBOARD_BUNDLE_NAME } from './constants';
import { CentralCredentials, Configschema } from 'types/schemas';
import axios from 'axios';
import { CentralSSOLoginResponse } from 'types/central';
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
}
