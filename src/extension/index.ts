import type NodeCG from '@nodecg/types';
import { Configschema } from 'types/Configschema';
import { ActiveBreakScene } from 'schemas';
import { DASHBOARD_BUNDLE_NAME } from './constants';

export = (nodecg: NodeCG.ServerAPI<Configschema>): void => {
    const activeBreakScene = nodecg.Replicant<ActiveBreakScene>('activeBreakScene', DASHBOARD_BUNDLE_NAME);
    const breakUseCastersScene = nodecg.Replicant<boolean>('breakUseCastersScene', { defaultValue: false });

    activeBreakScene.on('change', () => {
        breakUseCastersScene.value = false;
    });
}
