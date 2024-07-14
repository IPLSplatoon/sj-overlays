<template>
    <div
        class="team-results"
        :class="`team-${props.team.toLowerCase()}`"
    >
        <div
            v-for="result in results"
            :key="`result_${result.id}`"
            class="result glow-border"
            :class="props.team === 'A' ? 'glow-red' : 'glow-green'"
        >
            <div class="content-wrapper">
                <fitted-content class="tournament-name">
                    {{ result.name }}
                    <template v-if="result.year != null">
                        ({{ result.year }})
                    </template>
                </fitted-content>
                <fitted-content class="stage-result">
                    {{ formatStageResults(result.stages) }}
                </fitted-content>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { provideTransitions } from '../../../../helpers/transition';
import gsap from 'gsap';
import { useCentralDataStore } from 'client-shared/store/centralDataStore';
import { computed } from 'vue';
import { MatchupList } from 'types/schemas';
import FittedContent from '../../../../components/FittedContent.vue';
import { DateTime } from 'luxon';

const props = defineProps<{
    team: 'A' | 'B'
}>();

const currentYear = DateTime.now().year;

const centralDataStore = useCentralDataStore();
const results = computed(() => (
    (props.team === 'A'
        ? centralDataStore.centralTeamMatchups.teamA
        : centralDataStore.centralTeamMatchups.teamB)?.tournaments ?? [])
    .map(t => ({
        ...t,
        year: getTournamentYear(t)
    })));
const teamIds = computed(() =>
    props.team === 'A'
        ? centralDataStore.centralTeamMapping.teamA
        : centralDataStore.centralTeamMapping.teamB);

function getTournamentYear(tournament: MatchupList['tournaments'][number]): string | null {
    const tournamentYear = DateTime.fromISO(tournament.start_time).year;
    if (tournamentYear === currentYear || tournament.name.includes(String(tournamentYear))) {
        return null;
    } else {
        return String(tournamentYear);
    }
}

function formatStageResults(stages: MatchupList['tournaments'][number]['stages']): string {
    return stages.reduce((result, stage, i) => {
        const teamPlacement = stage.team_placements.find(p => teamIds.value.includes(p.team_id));
        result += `#${teamPlacement?.placement ?? '?'} of ${stage.no_teams} in ${stage.name}`;
        if (i !== stages.length - 1) {
            result += ', ';
        }
        return result;
    }, '');
}

provideTransitions(`team-${props.team === 'A' ? 'b' : 'a'}`, (elem) => elem.classList.contains('team-results') ? null : `.team-results.team-${props.team.toLowerCase()}`, {
    beforeEnter(elem) {
        gsap.set(elem.querySelectorAll('.result'), { width: 0, opacity: 0 });
    },
    enter(elem, done) {
        const tl = gsap.timeline({ onComplete: done });

        tl.addLabel('enter');

        tl
            .to(elem.querySelectorAll('.result'), { opacity: 1, duration: 0.1, stagger: 0.1 }, 'enter')
            .to(elem.querySelectorAll('.result'), { duration: 0.5, width: '100%', stagger: 0.1, ease: 'power2.out', delay: 0.05 }, 'enter');

        return tl;
    },
    leave(elem, done) {
        const tl = gsap.timeline({ onComplete: done });

        tl.addLabel('leave');

        tl
            .to(elem.querySelectorAll('.result'), { width: 0, duration: 0.5, stagger: 0.1, ease: 'power2.in' }, 'leave')
            .to(elem.querySelectorAll('.result'), { opacity: 0, duration: 0.1, stagger: 0.1, delay: 0.45 }, 'leave');

        return tl;
    }
});
</script>

<style scoped lang="scss">
@use '../../../../styles/background';

.team-results {
    position: relative;
    height: 100%;
    width: calc(100% + 150px);
    overflow: hidden;
    padding: 0 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &.team-a {
        transform: translateX(-150px);
    }
}

.result {
    @include background.background;

    margin: 8px 0;
    padding: 8px 12px;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    .content-wrapper {
        min-width: 686px;
        width: 686px;
        overflow: hidden;
    }

    .tournament-name {
        font-weight: 700;
        font-size: 36px;
    }

    .stage-result {
        font-size: 30px;
        margin-top: -4px;
    }
}
</style>
