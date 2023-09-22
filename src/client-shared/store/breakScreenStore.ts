import { ActiveBreakScene, MainFlavorText, NextRoundStartTime } from 'schemas';
import { defineStore } from 'pinia';
import { DASHBOARD_BUNDLE_NAME } from 'client-shared/constants';

const mainFlavorText = nodecg.Replicant<MainFlavorText>('mainFlavorText', DASHBOARD_BUNDLE_NAME);
const nextRoundStartTime = nodecg.Replicant<NextRoundStartTime>('nextRoundStartTime', DASHBOARD_BUNDLE_NAME);
const activeBreakScene = nodecg.Replicant<ActiveBreakScene>('activeBreakScene', DASHBOARD_BUNDLE_NAME);
// todo: long-term, a better solution of declaring "custom scenes" to ipl-oc should be investigated
const breakUseCastersScene = nodecg.Replicant<boolean>('breakUseCastersScene', { defaultValue: false });

export const breakScreenReps = [ mainFlavorText, nextRoundStartTime, activeBreakScene, breakUseCastersScene ];

interface BreakScreenStore {
    mainFlavorText: MainFlavorText;
    nextRoundStartTime: NextRoundStartTime;
    activeBreakScene: ActiveBreakScene;
    breakUseCastersScene: boolean;
}

export const useBreakScreenStore = defineStore('breakScreen', {
    state: () => ({
        mainFlavorText: null,
        nextRoundStartTime: { startTime: null, isVisible: null },
        activeBreakScene: null,
        breakUseCastersScene: false
    } as BreakScreenStore),
    actions: {
        setBreakCastersScene(shown: boolean) {
            breakUseCastersScene.value = shown;
        }
    }
});
