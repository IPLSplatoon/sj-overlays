import { PredictionStore } from 'schemas';
import { defineStore } from 'pinia';
import { DASHBOARD_BUNDLE_NAME } from '../helpers/constants';

const predictionStore = nodecg.Replicant<PredictionStore>('predictionStore', DASHBOARD_BUNDLE_NAME);

export const predictionReps = [ predictionStore ];

interface PredictionDataStore {
    predictionStore: PredictionStore;
}

export const usePredictionDataStore = defineStore('prediction', {
    state: () => ({
        predictionStore: null,
    } as PredictionDataStore)
});
