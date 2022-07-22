import { ActiveRound, SwapColorsInternally } from 'schemas';
import { defineStore } from 'pinia';
import { DASHBOARD_BUNDLE_NAME } from '../helpers/constants';

const activeRound = nodecg.Replicant<ActiveRound>('activeRound', DASHBOARD_BUNDLE_NAME);
const swapColorsInternally = nodecg.Replicant<SwapColorsInternally>('swapColorsInternally', DASHBOARD_BUNDLE_NAME);

export const activeRoundReps = [activeRound, swapColorsInternally];

interface ActiveRoundStore {
    activeRound: ActiveRound;
    swapColorsInternally: SwapColorsInternally;
}

export const useActiveRoundStore = defineStore('activeRound', {
    state: (): ActiveRoundStore => ({
        activeRound: null,
        swapColorsInternally: null
    })
});
