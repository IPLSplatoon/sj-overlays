import { CentralCredentials } from 'types/schemas';
import { defineStore } from 'pinia';

const centralCredentials = nodecg.Replicant<CentralCredentials>('centralCredentials');

export const centralDataReps = [centralCredentials];

interface CentralDataStore {
    centralCredentials: CentralCredentials
}

export const useCentralDataStore = defineStore('central', {
    state: () => ({
        centralCredentials: null
    } as CentralDataStore)
});
