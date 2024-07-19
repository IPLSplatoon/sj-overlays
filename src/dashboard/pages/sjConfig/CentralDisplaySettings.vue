<template>
    <ipl-space>
        <ipl-radio
            v-model="displayMode"
            :options="displayModeOptions"
            label="Display mode"
            name="displayMode"
        />
    </ipl-space>
</template>

<script setup lang="ts">
import { IplSpace, IplRadio } from '@iplsplatoon/vue-components';
import { computed } from 'vue';
import { useCentralDataStore } from 'client-shared/store/centralDataStore';
import { CentralDisplaySettings } from 'types/schemas';

const centralDataStore = useCentralDataStore();

const displayMode = computed({
    get() {
        return centralDataStore.centralDisplaySettings.displayMode;
    },
    set(value: CentralDisplaySettings['displayMode']) {
        centralDataStore.setDisplayMode(value);
    }
});
const displayModeOptions = computed(() => [
    { name: 'Teams', value: 'teams' },
    {
        name: 'Head-to-Head',
        value: 'headToHead',
        disabled: centralDataStore.centralTeamMatchups.headToHead == null || centralDataStore.centralTeamMatchups.headToHead.tournaments.length === 0
    },
    {
        name: 'Team A Results',
        value: 'teamAResults',
        disabled: centralDataStore.centralTeamMatchups.teamA == null || centralDataStore.centralTeamMatchups.teamA.tournaments.length === 0
    },
    {
        name: 'Team B Results',
        value: 'teamBResults',
        disabled: centralDataStore.centralTeamMatchups.teamB == null || centralDataStore.centralTeamMatchups.teamB.tournaments.length === 0
    }
]);
</script>
