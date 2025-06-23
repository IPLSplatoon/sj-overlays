import { Casters, BundleCasterSets } from 'schemas';
import { defineStore } from 'pinia';
import { DASHBOARD_BUNDLE_NAME } from 'client-shared/constants';

const casters = nodecg.Replicant<Casters>('casters', DASHBOARD_BUNDLE_NAME);
const bundleCasterSets = nodecg.Replicant<BundleCasterSets>('bundleCasterSets', DASHBOARD_BUNDLE_NAME);

export const casterReps = [casters, bundleCasterSets];

interface CasterStore {
    casters: Casters
    bundleCasterSets: BundleCasterSets
}

export const useCasterStore = defineStore('casters', {
    state: () => ({
        casters: {},
        bundleCasterSets: {}
    } as unknown as CasterStore)
});
