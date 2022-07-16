import { ActiveRound } from 'schemas';
import { defineStore } from 'pinia';
import { DASHBOARD_BUNDLE_NAME } from '../helpers/constants';

const activeRound = nodecg.Replicant<ActiveRound>('activeRound', DASHBOARD_BUNDLE_NAME);

export const activeRoundReps = [activeRound];

interface ActiveRoundStore {
    activeRound: ActiveRound;
}

export const useActiveRoundStore = defineStore('activeRound', {
    state: () => ({
        activeRound: null
    } as ActiveRoundStore)
});
