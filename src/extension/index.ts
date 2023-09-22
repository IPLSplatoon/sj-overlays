import type NodeCG from '@nodecg/types';
import { StartggImporter, MatchImporter, MatchQueryResult, BattlefyImporter } from '@tourneyview/importer';
import { Configschema } from 'types/Configschema';
import { DASHBOARD_BUNDLE_NAME } from '../client-shared/constants';
import { TournamentData, ActiveBreakScene } from 'schemas';

export = (nodecg: NodeCG.ServerAPI<Configschema>): void => {
    const bracketData = nodecg.Replicant('bracketData');
    const tournamentData = nodecg.Replicant<TournamentData>('tournamentData', DASHBOARD_BUNDLE_NAME);

    function getImporter(): MatchImporter<MatchQueryResult> {
        const tournamentSource = tournamentData.value.meta.source;
        switch (tournamentSource) {
            case 'BATTLEFY':
                return new BattlefyImporter();
            case 'SMASHGG':
                return new StartggImporter(nodecg.bundleConfig?.startgg?.apiKey);
            default:
                throw new Error(`Cannot get importer for source '${tournamentSource}'`);
        }
    }

    nodecg.listenFor('loadBracketFromQuery', async (query, ack) => {
        try {
            const importer = getImporter();
            bracketData.value = await importer.getMatches(query);
            (ack as NodeCG.UnhandledAcknowledgement)(null);
        } catch (e) {
            nodecg.log.error('Failed to load bracket:', e.response?.data ?? e);
            if (!ack.handled) {
                (ack as NodeCG.UnhandledAcknowledgement)(e);
            }
        }
    });


    const activeBreakScene = nodecg.Replicant<ActiveBreakScene>('activeBreakScene', DASHBOARD_BUNDLE_NAME);
    const breakUseCastersScene = nodecg.Replicant<boolean>('breakUseCastersScene', { defaultValue: false });

    activeBreakScene.on('change', () => {
        breakUseCastersScene.value = false;
    });
}
