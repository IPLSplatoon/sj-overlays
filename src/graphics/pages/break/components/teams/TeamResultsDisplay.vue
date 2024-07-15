<template>
    <div class="team-results-wrapper">
        <transition-group
            name="team-results-list"
            tag="div"
            class="team-results"
            :class="`team-${props.team.toLowerCase()}`"
            @enter="resultItemEnter"
            @leave="resultItemLeave"
            @before-enter="beforeResultItemEnter"
        >
            <div
                v-for="(result, i) in visibleResults"
                :key="`result_${result.id}`"
                class="result-wrapper"
                :data-result-index="i"
            >
                <div
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
                            {{ result.stageResults }}
                        </fitted-content>
                        <transition
                            :css="false"
                            @enter="detailedResultsEnter"
                            @leave="detailedResultsLeave"
                            @before-enter="beforeDetailedResultsEnter"
                        >
                            <div
                                v-if="visibleResults.length === 1"
                                class="detailed-results"
                            >
                                <fitted-content
                                    v-for="match in result.matches"
                                    :key="`match_${match.id}`"
                                    class="result-match"
                                    :class="{
                                        'a-win': match.alpha_win > match.bravo_win,
                                        'b-win': match.bravo_win > match.alpha_win
                                    }"
                                >
                                    <span class="team-a-score">{{ match.alpha_win }}</span><span class="score-separator">-</span><span class="team-b-score">{{ match.bravo_win }}</span> vs {{ $helpers.addDots(match.bravo_name) }}
                                </fitted-content>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </transition-group>
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
import { useSlides } from '../../../../helpers/useSlides';

const props = defineProps<{
    team: 'A' | 'B'
}>();

const currentYear = DateTime.now().year;

const centralDataStore = useCentralDataStore();
const teamIds = computed(() =>
    props.team === 'A'
        ? centralDataStore.centralTeamMapping.teamA
        : centralDataStore.centralTeamMapping.teamB);
const results = computed(() => (
    (props.team === 'A'
        ? centralDataStore.centralTeamMatchups.teamA
        : centralDataStore.centralTeamMatchups.teamB)?.tournaments ?? [])
    .map(t => ({
        ...t,
        year: getTournamentYear(t),
        stageResults: formatStageResults(t.stages),
        matches: t.stages.flatMap(s => s.matches.map(m => {
            if (teamIds.value.includes(m.alpha_id)) return m;

            return {
                ...m,
                alpha_name: m.bravo_name,
                alpha_id: m.bravo_id,
                alpha_win: m.bravo_win,
                bravo_name: m.alpha_name,
                bravo_id: m.alpha_id,
                bravo_win: m.alpha_win
            };
        })).slice(0, 10)
    })).slice(0, 5));
const resultSlides = useSlides(() => {
    if (results.value.length === 1) {
        return [{ component: 'result-0' }];
    }

    return ([
        { component: 'summary', duration: 20 },
        ...(results.value.map((_, i) => ({ component: `result-${i}`, duration: i === 0 ? 11 : 10 })))
    ]);
});
const visibleResults = computed(() => {
    if (resultSlides.activeComponent.value === 'summary') {
        return results.value;
    } else {
        const resultIndex = Number(resultSlides.activeComponent.value.split('-')[1]);
        return [results.value[resultIndex]];
    }
});

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
        gsap.set(elem.querySelectorAll('.result'), { width: '0%', opacity: 0 });
        gsap.set(elem.querySelectorAll('.result-wrapper'), { height: '20%' });
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
            .to(elem.querySelectorAll('.result'), { width: '0%', duration: 0.5, stagger: 0.1, ease: 'power2.in' }, 'leave')
            .to(elem.querySelectorAll('.result'), { opacity: 0, duration: 0.1, stagger: 0.1, delay: 0.45 }, 'leave');

        return tl;
    }
});

function resultItemLeave(elem: HTMLElement, done: gsap.Callback) {
    const tl = gsap.timeline({ onComplete: done, delay: 0.1 * Number(elem.dataset.resultIndex) });

    const hideVisibleResults = visibleResults.value.length === 1;
    if (hideVisibleResults) {
        tl.to(elem.querySelector('.detailed-results'), { height: 0, duration: 0.75, ease: 'power3.inOut', delay: 0.1 });
    }

    tl.addLabel('leave', hideVisibleResults ? '+=0.1' : undefined);

    tl
        .to(elem.querySelector('.result'), { width: '0%', duration: 0.5, ease: 'power2.in' }, 'leave')
        .to(elem.querySelector('.result'), { opacity: 0, duration: 0.1, delay: 0.45 }, 'leave')
        .to(elem, { height: '0%', duration: 0.75, ease: 'power3.inOut', delay: !hideVisibleResults ? 0 : (results.value.length - 1 - Number(elem.dataset.resultIndex)) * 0.1 });
}

function resultItemEnter(elem: HTMLElement, done: gsap.Callback) {
    const showDetailedResults = visibleResults.value.length === 1;
    const tl = gsap.timeline({ onComplete: done, delay: (showDetailedResults ? 0.2 : 0) + 0.1 * Number(elem.dataset.resultIndex) });
    const heightChangeDelay = showDetailedResults ? 0 : (results.value.length - 1 - Number(elem.dataset.resultIndex)) * 0.1;

    tl.addLabel('enter', `+=${showDetailedResults ? 0.35 : 0.75}`);

    tl
        .to(elem, { height: '20%', duration: showDetailedResults ? 0.55 : 0.75, ease: 'power3.inOut', delay: heightChangeDelay })
        .to(elem.querySelector('.result'), { opacity: 1, duration: 0.1 }, 'enter')
        .to(elem.querySelector('.result'), { width: '100%', duration: 0.5, delay: 0.05, ease: 'power2.out' }, 'enter');

    if (showDetailedResults) {
        tl.to(elem.querySelector('.detailed-results'), { height: 'auto', duration: 0.75, ease: 'power3.inOut' }, `enter+=${0.9 + results.value.length * 0.1}`);
    }
}

function beforeResultItemEnter(elem: HTMLElement) {
    if (visibleResults.value.length === 1) {
        gsap.set(elem.querySelector('.detailed-results'), { height: 0 });
    }
    gsap.set(elem.querySelector('.result'), { opacity: 0, width: '0%' });
    gsap.set(elem, { height: '0%' });
}

function detailedResultsLeave(elem: HTMLElement, done: gsap.Callback) {
    const tl = gsap.timeline({ onComplete: done, delay: Math.max(0, results.value.length - 2) * 0.1 });

    tl.to(elem, { height: 0, duration: 0.75, ease: 'power3.inOut' });
}

function detailedResultsEnter(elem: HTMLElement, done: gsap.Callback) {
    const tl = gsap.timeline({ onComplete: done, delay: 1.4 + results.value.length * 0.1 });

    tl.to(elem, { height: 'auto', duration: 0.75, ease: 'power3.inOut' });
}

function beforeDetailedResultsEnter(elem: HTMLElement) {
    gsap.set(elem, { height: 0 });
}
</script>

<style scoped lang="scss">
@use '../../../../styles/background';
@use '../../../../styles/constants';

.team-results-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
}

.team-results {
    position: absolute;
    height: 100%;
    min-height: 560px;
    width: calc(100% + 150px);
    padding: 0 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &.team-a {
        transform: translateX(-150px);

        .result-match.a-win .team-a-score {
            color: constants.$red;
        }

        .result-match.b-win .team-b-score {
            color: constants.$red;
        }
    }

    &.team-b {
        .result-match.a-win .team-a-score {
            color: constants.$green;
        }

        .result-match.b-win .team-b-score {
            color: constants.$green;
        }
    }
}

.result-wrapper {
    height: 20%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.result {
    @include background.background;

    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    .content-wrapper {
        min-width: 686px;
        width: 686px;
        overflow: hidden;
    }

    .tournament-name {
        font-weight: 700;
        font-size: 36px;
        margin-top: 6px;
    }

    .stage-result {
        font-size: 30px;
        margin-top: -4px;
        margin-bottom: 4px;
    }

    .result-match {
        font-size: 30px;
        transform: translateY(-6px);

        .team-a-score, .team-b-score {
            font-feature-settings: 'tnum';
            font-weight: 800;
            font-family: 'Montserrat', sans-serif;
            font-size: 34px;
            transform: translateY(2px);
            display: inline-block;
        }

        .score-separator {
            margin: 0 6px;
            font-weight: 700;
        }
    }
}
</style>
