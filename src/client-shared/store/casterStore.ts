import { Casters, BundleCasterSets } from 'schemas';
import { defineStore } from 'pinia';
import { DASHBOARD_BUNDLE_NAME } from 'client-shared/constants';

const casters = nodecg.Replicant<Casters>('casters', DASHBOARD_BUNDLE_NAME);
const bundleCasterSets = nodecg.Replicant<BundleCasterSets>('bundleCasterSets', DASHBOARD_BUNDLE_NAME);
const analystScreenVideoUrl = nodecg.Replicant<string>('analystScreenVideoUrl', { defaultValue: '' });
const analystScreenVideoVisible = nodecg.Replicant<boolean>('analystScreenVideoVisible', { defaultValue: false });

export const casterReps = [casters, bundleCasterSets, analystScreenVideoUrl, analystScreenVideoVisible];

interface CasterStore {
    casters: Casters
    bundleCasterSets: BundleCasterSets
    analystScreenVideoUrl: string
    analystScreenVideoVisible: boolean
}

export const useCasterStore = defineStore('casters', {
    state: () => ({
        casters: {},
        bundleCasterSets: {},
        analystScreenVideoUrl: '',
        analystScreenVideoVisible: false
    } as unknown as CasterStore),
    actions: {
        setAnalystScreenVideoUrl(newValue: string) {
            analystScreenVideoUrl.value = newValue;
        },
        setAnalystScreenVideoVisible(newValue: boolean) {
            analystScreenVideoVisible.value = newValue;
        }
    }
});
