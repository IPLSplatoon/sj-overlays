import { NextRound } from 'schemas';
import { defineStore } from 'pinia';
import { DASHBOARD_BUNDLE_NAME } from '../helpers/constants';

const nextRound = nodecg.Replicant<NextRound>('nextRound', DASHBOARD_BUNDLE_NAME);

export const nextRoundReps = [nextRound];

interface NextRoundStore {
    nextRound: NextRound;
}

export const useNextRoundStore = defineStore('nextRound', {
    state: () => ({
        nextRound: null
    } as NextRoundStore)
});
