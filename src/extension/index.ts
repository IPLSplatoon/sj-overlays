import type NodeCG from '@nodecg/types';
import { Configschema } from 'types/Configschema';
import { DASHBOARD_BUNDLE_NAME } from '../client-shared/constants';
import { ActiveBreakScene } from 'schemas';

export = (nodecg: NodeCG.ServerAPI<Configschema>): void => {
    const activeBreakScene = nodecg.Replicant<ActiveBreakScene>('activeBreakScene', DASHBOARD_BUNDLE_NAME);
    const breakUseCastersScene = nodecg.Replicant<boolean>('breakUseCastersScene', { defaultValue: false });

    activeBreakScene.on('change', () => {
        breakUseCastersScene.value = false;
    });
}
