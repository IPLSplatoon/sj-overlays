import { DisplayData, ActiveRelayEvent } from 'relay-nodecg-connector';
import { defineStore } from 'pinia';

const RELAY_BUNDLE_NAME = 'relay-nodecg-connector';

const displayData = nodecg.Replicant<DisplayData>('displayData', RELAY_BUNDLE_NAME);
const activeRelayEvent = nodecg.Replicant<ActiveRelayEvent>('activeRelayEvent', RELAY_BUNDLE_NAME);

export const relayDataReps = [displayData, activeRelayEvent];

interface RelayDataStore {
    displayData: DisplayData
    activeRelayEvent: ActiveRelayEvent
}

export const useRelayDataStore = defineStore('relayData', {
    state: (): RelayDataStore => ({
        displayData: null,
        activeRelayEvent: null
    })
});
