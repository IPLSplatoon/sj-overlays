import { Bracket } from '@tourneyview/common';
import { defineStore } from 'pinia';
import { createReplicantStoreInitializer } from 'client-shared/store/storeHelper';
import { DASHBOARD_BUNDLE_NAME } from 'client-shared/constants';

const bracketData = nodecg.Replicant('bracketData', DASHBOARD_BUNDLE_NAME);

interface BracketDataStore {
    bracketData: Bracket
}

export const useBracketDataStore = defineStore('bracketData', {
    state: (): BracketDataStore => ({
        bracketData: null
    })
});

export const initBracketDataStore = createReplicantStoreInitializer([bracketData], useBracketDataStore);
