<template>
    <div class="head-to-head-wrapper layout vertical c-horiz">
        <fitted-content
            class="title"
            align="center"
            :max-width="1200"
        >
            <span class="team-a-name">{{ $helpers.addDots(activeRoundStore.activeRound.teamA.name) }}</span> vs <span class="team-b-name">{{ $helpers.addDots(activeRoundStore.activeRound.teamB.name) }}</span>
        </fitted-content>
        <div
            v-for="(tournament, i) in headToHeadMatchups"
            :key="`tournament-result_${i}`"
            class="tournament-result glow-border"
            :class="`glow-${tournament.color}`"
        >
            <div class="content-wrapper">
                <fitted-content
                    class="tournament-name"
                    align="center"
                >
                    {{ tournament.name }}
                    <template v-if="tournament.year !== currentYear && !tournament.name.includes(String(tournament.year))">
                        ({{ tournament.year }})
                    </template>
                </fitted-content>
                <template v-for="stage in tournament.stages">
                    <fitted-content
                        v-for="(match, x) in stage.matches"
                        :key="`result_${x}`"
                        class="result"
                        align="center"
                    >
                        <span class="team-a-score">{{ match.alpha_win }}</span><span class="score-separator">-</span><span class="team-b-score">{{ match.bravo_win }}</span> in <span class="stage-name">{{ stage.name }}</span>
                    </fitted-content>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { provideTransitions } from '../../../../helpers/transition';
import gsap from 'gsap';
import { useActiveRoundStore } from 'client-shared/store/activeRoundStore';
import FittedContent from 'src/graphics/components/FittedContent.vue';
import { useCentralDataStore } from 'client-shared/store/centralDataStore';
import { computed } from 'vue';
import { DateTime } from 'luxon';
import type { MatchupList } from 'types/schemas';

const activeRoundStore = useActiveRoundStore();
const centralDataStore = useCentralDataStore();

const currentYear = DateTime.now().year;

const maxHeadToHeadLines = 7;
const headToHeadMatchups = computed(() => {
    const matchups: MatchupList['tournaments'] = centralDataStore.centralTeamMatchups.headToHead?.tournaments ?? [];
    const result: MatchupList['tournaments'] = [];
    let lines = 0;
    for (let i = 0; i < matchups.length; i++) {
        if (lines >= maxHeadToHeadLines - 1) break;
        lines++;
        const stages: MatchupList['tournaments'][number]['stages'] = [];
        for (let j = 0; j < matchups[i].stages.length; j++) {
            if (lines >= maxHeadToHeadLines) break;
            const matches: MatchupList['tournaments'][number]['stages'][number]['matches'] = [];
            for (let k = 0; k < matchups[i].stages[j].matches.length; k++) {
                if (lines >= maxHeadToHeadLines) break;
                matches.push(matchups[i].stages[j].matches[k]);
                lines++;
            }
            stages.push({
                ...matchups[i].stages[j],
                matches
            });
        }
        result.push({
            ...matchups[i],
            stages
        });
    }

    return result.map(t => {
        let alphaWinCount = 0;
        let bravoWinCount = 0;

        for (let i = 0; i < t.stages.length; i++) {
            for (let j = 0; j < t.stages[i].matches.length; j++) {
                const m = t.stages[i].matches[j];
                const flipTeams = centralDataStore.centralTeamMapping.teamA.includes(m.bravo_id);
                const alphaWin = flipTeams ? m.bravo_win : m.alpha_win;
                const bravoWin = flipTeams ? m.alpha_win : m.bravo_win;

                if (alphaWin > bravoWin) {
                    alphaWinCount++;
                } else if (bravoWin > alphaWin) {
                    bravoWinCount++;
                }
            }
        }

        let tournamentColor = 'blue';
        if (alphaWinCount > bravoWinCount) {
            tournamentColor = 'red';
        } else if (bravoWinCount > alphaWinCount) {
            tournamentColor = 'green';
        }

        return {
            ...t,
            year: DateTime.fromISO(t.start_time).year,
            color: tournamentColor,
            stages: t.stages.map(s => ({
                ...s,
                // Ensure results are always ordered correctly
                matches: s.matches.map(m => centralDataStore.centralTeamMapping.teamA.includes(m.alpha_id) ? m : {
                    ...m,
                    alpha_id: m.bravo_id,
                    alpha_name: m.bravo_name,
                    alpha_win: m.bravo_win,
                    bravo_id: m.alpha_id,
                    bravo_name: m.alpha_name,
                    bravo_win: m.alpha_win
                })
            }))
        };
    });
});

provideTransitions('break-teams', null, {
    beforeEnter(elem: HTMLElement) {
        gsap.set(elem.querySelector('.title'), { opacity: 0 });
        gsap.set(elem.querySelectorAll('.tournament-result'), { opacity: 0, width: 0 });
    },
    enter(elem: HTMLElement, done: gsap.Callback) {
        const tl = gsap.timeline({ onComplete: done });

        tl.addLabel('enter');

        tl
            .to(elem.querySelector('.title'), { opacity: 1, duration: 0.35 }, 'enter')
            .to(elem.querySelectorAll('.tournament-result'), { opacity: 1, duration: 0.1, stagger: 0.1 }, 'enter')
            .to(elem.querySelectorAll('.tournament-result'), { width: 'auto', duration: 0.55, ease: 'power2.out', stagger: 0.1 }, 'enter');

        return tl;
    },
    leave(elem: HTMLElement, done: gsap.Callback) {
        const tl = gsap.timeline({ onComplete: done });

        tl.addLabel('leave');

        tl
            .to(elem.querySelector('.title'), { opacity: 0, duration: 0.35 }, 'leave')
            .to(elem.querySelectorAll('.tournament-result'), { duration: 0.55, width: 0, ease: 'power2.in', stagger: 0.1 }, 'leave')
            .to(elem.querySelectorAll('.tournament-result'), { opacity: 0, delay: 0.5, duration: 0.1, stagger: 0.1 }, 'leave');

        return tl;
    }
});
</script>

<style scoped lang="scss">
@use '../../../../styles/constants';
@use '../../../../styles/background';

$gradient: linear-gradient(to right, constants.$red 35%, constants.$green 65%);

.head-to-head-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.title {
    text-align: center;
    font-size: 46px;
    min-height: 64px;
    margin-bottom: 8px;

    .team-a-name, .team-b-name {
        font-weight: 700;
    }

    .team-a-name {
        filter: drop-shadow(0 0 3px constants.$red);
    }

    .team-b-name {
        filter: drop-shadow(0 0 2px constants.$green);
    }
}

.tournament-result {
    @include background.background;

    margin: 8px 0;
    padding: 6px 12px;
    display: flex;
    justify-content: center;
    overflow: hidden;

    .content-wrapper {
        width: 800px;
    }

    .tournament-name {
        font-size: 40px;
        font-weight: 700;
    }

    .result {
        font-size: 38px;
        margin-top: -4px;

        .team-a-score, .team-b-score {
            font-feature-settings: 'tnum';
            font-weight: 800;
            font-family: 'Montserrat', sans-serif;
            font-size: 44px;
            transform: translateY(2px);
            display: inline-block;
        }

        .score-separator {
            margin: 0 6px;
            font-weight: 700;
        }
    }
}

.head-to-head {
    @include background.background(11px);

    width: 70%;
    height: 100%;
    flex-grow: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .content-wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .content {
        width: 940px;
        height: 95%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}
</style>
