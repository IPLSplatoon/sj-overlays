import { Bracket } from '@tourneyview/common';
import { defineStore } from 'pinia';
import { createReplicantStoreInitializer } from 'client-shared/store/storeHelper';

const bracketData = nodecg.Replicant('bracketData');

interface BracketDataStore {
    bracketData: Bracket
}

export const useBracketDataStore = defineStore('bracketData', {
   state: (): BracketDataStore => ({
       bracketData: null
   })
});

export const initBracketDataStore = createReplicantStoreInitializer([bracketData], useBracketDataStore);
