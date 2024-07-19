<template>
    <ipl-space>
        <div class="mapping-display-layout">
            <div>
                <div>{{ addDots(activeRoundStore.activeRound.teamA.name) }} has {{ centralDataStore.centralTeamMapping.teamA.length }} team ID(s) in Central</div>
                <ipl-button
                    label="Reset"
                    requires-confirmation
                    color="red"
                    @click="centralDataStore.resetTeamMapping('a')"
                />
            </div>
            <div>
                <div>{{ addDots(activeRoundStore.activeRound.teamB.name) }} has {{ centralDataStore.centralTeamMapping.teamB.length }} team ID(s) in Central</div>
                <ipl-button
                    label="Reset"
                    requires-confirmation
                    color="red"
                    @click="centralDataStore.resetTeamMapping('b')"
                />
            </div>
        </div>
        <ipl-button
            class="top-margin"
            label="Search teams"
            @click="onTeamSearch"
        />
    </ipl-space>
</template>

<script setup lang="ts">
import { IplButton, IplSpace } from '@iplsplatoon/vue-components';
import { useCentralDataStore } from 'client-shared/store/centralDataStore';
import { useActiveRoundStore } from 'client-shared/store/activeRoundStore';
import { addDots } from '../../../graphics/helpers/string';

const centralDataStore = useCentralDataStore();
const activeRoundStore = useActiveRoundStore();

function onTeamSearch() {
    nodecg.getDialog('centralTeamSearchDialog').open();
}
</script>

<style scoped lang="scss">
.mapping-display-layout {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;

    > * {
        display: flex;
        flex-direction: column;

        > div:first-child {
            flex-grow: 1;
        }

        > button {
            margin-top: 8px;
        }
    }
}
</style>
