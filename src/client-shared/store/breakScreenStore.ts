import { ActiveBreakScene, MainFlavorText, NextRoundStartTime, ObsState, ObsConfig } from 'schemas';
import { defineStore } from 'pinia';
import { DASHBOARD_BUNDLE_NAME } from 'client-shared/constants';

const mainFlavorText = nodecg.Replicant<MainFlavorText>('mainFlavorText', DASHBOARD_BUNDLE_NAME);
const nextRoundStartTime = nodecg.Replicant<NextRoundStartTime>('nextRoundStartTime', DASHBOARD_BUNDLE_NAME);
const activeBreakScene = nodecg.Replicant<ActiveBreakScene>('activeBreakScene', DASHBOARD_BUNDLE_NAME);
// todo: long-term, a better solution of declaring "custom scenes" to ipl-oc should be investigated
const breakUseCastersScene = nodecg.Replicant<boolean>('breakUseCastersScene', { defaultValue: false });
const obsState = nodecg.Replicant<ObsState>('obsState', DASHBOARD_BUNDLE_NAME);
const obsConfig = nodecg.Replicant<ObsConfig>('obsConfig', DASHBOARD_BUNDLE_NAME);

export const breakScreenReps = [ mainFlavorText, nextRoundStartTime, activeBreakScene, breakUseCastersScene, obsState, obsConfig ];

interface BreakScreenStore {
    mainFlavorText: MainFlavorText;
    nextRoundStartTime: NextRoundStartTime;
    activeBreakScene: ActiveBreakScene;
    breakUseCastersScene: boolean;
    obsState: ObsState;
    obsConfig: ObsConfig;
}

export const useBreakScreenStore = defineStore('breakScreen', {
    state: () => ({
        mainFlavorText: null,
        nextRoundStartTime: { startTime: null, isVisible: null },
        activeBreakScene: null,
        breakUseCastersScene: false,
        obsState: null,
        obsConfig: []
    } as BreakScreenStore),
    getters: {
        activeScene: state => state.breakUseCastersScene ? 'casters' : state.activeBreakScene,
        activeObsConfig: state => {
            if (state.obsState.status !== 'CONNECTED' || state.obsState.currentSceneCollection == null) return null;
            return state.obsConfig.find(configItem => configItem.sceneCollection === state.obsState.currentSceneCollection);
        }
    },
    actions: {
        setBreakCastersScene(shown: boolean) {
            breakUseCastersScene.value = shown;
        }
    }
});
