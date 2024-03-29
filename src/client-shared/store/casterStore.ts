import { Casters } from 'schemas';
import { defineStore } from 'pinia';
import { DASHBOARD_BUNDLE_NAME } from 'client-shared/constants';

const casters = nodecg.Replicant<Casters>('casters', DASHBOARD_BUNDLE_NAME);

export const casterReps = [casters];

interface CasterStore {
    casters: Casters
}

export const useCasterStore = defineStore('casters', {
    state: () => ({
        casters: {}
    } as CasterStore)
});
