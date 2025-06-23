<template>
    <ipl-space class="matchup-display-layout">
        <div class="text-center">
            <template v-if="headToHeadSum.tournaments === 0">
                Head-to-head data is missing.
            </template>
            <template v-else>
                Head-to-head matches: {{ headToHeadSum.tournaments }} tournament(s), {{ headToHeadSum.stages }} stage(s), {{ headToHeadSum.matches }} match(es)
            </template>
        </div>
        <div>
            <template v-if="teamASum.tournaments === 0">
                Recent match data for {{ addDots(activeRoundStore.activeRound.teamA.name) }} is missing.
            </template>
            <template v-else>
                Matches for {{ addDots(activeRoundStore.activeRound.teamA.name) }}: {{ teamASum.tournaments }} tournament(s), {{ teamASum.stages }} stage(s), {{ teamASum.matches }} match(es)
            </template>
        </div>
        <div>
            <template v-if="teamBSum.tournaments === 0">
                Recent match data for {{ addDots(activeRoundStore.activeRound.teamB.name) }} is missing.
            </template>
            <template v-else>
                Matches for {{ addDots(activeRoundStore.activeRound.teamB.name) }}: {{ teamBSum.tournaments }} tournament(s), {{ teamBSum.stages }} stage(s), {{ teamBSum.matches }} match(es)
            </template>
        </div>
        <ipl-button
            label="Reload matchups"
            async
            @click="loadMatchups"
        />
    </ipl-space>
</template>

<script setup lang="ts">
import { IplButton, IplSpace } from '@iplsplatoon/vue-components';
import type { MatchupList } from 'types/schemas';
import { computed } from 'vue';
import { useCentralDataStore } from 'client-shared/store/centralDataStore';
import { useActiveRoundStore } from 'client-shared/store/activeRoundStore';
import { addDots } from '../../../graphics/helpers/string';

const centralDataStore = useCentralDataStore();
const activeRoundStore = useActiveRoundStore();

function sumMatchups(matchups: MatchupList | undefined) {
    if (matchups == null) {
        return {
            tournaments: 0,
            stages: 0,
            matches: 0
        };
    }

    let stageCount = 0;
    let matchCount = 0;

    for (let i = 0; i < matchups.tournaments.length; i++) {
        stageCount += matchups.tournaments[i].stages.length;
        for (let j = 0; j < matchups.tournaments[i].stages.length; j++) {
            matchCount += matchups.tournaments[i].stages[j].matches.length;
        }
    }

    return {
        tournaments: matchups.tournaments.length,
        stages: stageCount,
        matches: matchCount
    };
}

const headToHeadSum = computed(() => sumMatchups(centralDataStore.centralTeamMatchups.headToHead));
const teamASum = computed(() => sumMatchups(centralDataStore.centralTeamMatchups.teamA));
const teamBSum = computed(() => sumMatchups(centralDataStore.centralTeamMatchups.teamB));

async function loadMatchups() {
    return nodecg.sendMessage('loadCentralMatchups');
}
</script>

<style lang="scss" scoped>
.matchup-display-layout {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;

    > div:first-child, > .ipl-button {
        grid-column: span 2;
    }
}
</style>
