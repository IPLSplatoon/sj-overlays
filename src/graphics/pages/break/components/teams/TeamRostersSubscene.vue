<template>
    <div class="team-display">
        <transition
            mode="out-in"
            :css="false"
            @enter="teamAEnter"
            @leave="teamALeave"
            @before-enter="beforeTeamAEnter"
        >
            <team-results-display
                v-if="centralDataStore.centralDisplaySettings.displayMode === 'teamBResults'"
                team="B"
            />
            <break-screen-team
                v-else
                team="A"
                class="team-a-display"
            />
        </transition>
        <div class="versus-wrapper layout horiz c-vert">
            <transition
                :css="false"
                @enter="versusEnter"
                @leave="versusLeave"
                @before-enter="beforeVersusEnter"
            >
                <div
                    v-if="centralDataStore.centralDisplaySettings.displayMode === 'teams'"
                    class="versus"
                >
                    VS
                </div>
            </transition>
        </div>
        <transition
            mode="out-in"
            :css="false"
            @enter="teamBEnter"
            @leave="teamBLeave"
            @before-enter="beforeTeamBEnter"
        >
            <team-results-display
                v-if="centralDataStore.centralDisplaySettings.displayMode === 'teamAResults'"
                team="A"
            />
            <break-screen-team
                v-else
                team="B"
                class="team-b-display"
            />
        </transition>
    </div>
</template>

<script setup lang="ts">
import BreakScreenTeam from './BreakScreenTeam.vue';
import {
    provideTransitions,
    TransitionFunctionMap,
    transitionFunctionsInjectionKey
} from '../../../../helpers/transition';
import { provide } from 'vue';
import gsap from 'gsap';
import TeamResultsDisplay from './TeamResultsDisplay.vue';
import { useCentralDataStore } from 'client-shared/store/centralDataStore';

const centralDataStore = useCentralDataStore();

const transitions: TransitionFunctionMap = {};
provide(transitionFunctionsInjectionKey, transitions);

provideTransitions('break-teams', null, {
    beforeEnter(elem: HTMLElement) {
        transitions['team-a'].beforeEnter(elem);
        transitions['team-b'].beforeEnter(elem);

        beforeVersusEnter(elem.querySelector('.versus'));
    },
    enter(elem: HTMLElement, done: gsap.Callback) {
        const tl = gsap.timeline({ onComplete: done });

        tl.addLabel('teamsIn');

        tl
            .add(versusEnter(elem.querySelector('.teams-wrapper .versus')), 'teamsIn')
            .add(transitions['team-a'].enter(elem), 'teamsIn')
            .add(transitions['team-b'].enter(elem), 'teamsIn');

        return tl;
    },
    leave(elem: HTMLElement, done: gsap.Callback) {
        const tl = gsap.timeline({ onComplete: done });

        tl
            .addLabel('teamsOut', '+=0.6');

        tl
            .add(transitions['team-a'].leave(elem), 'sceneOut')
            .add(transitions['team-b'].leave(elem), 'sceneOut')
            .add(versusLeave(elem.querySelector('.teams-wrapper .versus')), 'teamsOut');

        return tl;
    }
});

const beforeVersusEnter = (elem: HTMLElement) => {
    gsap.set(elem, { y: 200 });
};
const versusEnter = (elem: HTMLElement, done?: gsap.Callback) => {
    return gsap.to(elem, { duration: 0.4, y: 0, ease: 'power1.out', delay: 0.5, onComplete: done });
};
const versusLeave = (elem: HTMLElement, done?: gsap.Callback) => {
    return gsap.to(elem, { duration: 0.40, y: 200, ease: 'power1.in', delay: 0.15, onComplete: done });
};

const beforeTeamEnter = (team: 'a' | 'b') => (elem: HTMLElement) => {
    transitions[`team-${team}`].beforeEnter(elem);
};
const teamEnter = (team: 'a' | 'b') => (elem: HTMLElement, done: gsap.Callback) => {
    const tl = gsap.timeline({ onComplete: done });
    tl.add(transitions[`team-${team}`].enter(elem));
};
const teamLeave = (team: 'a' | 'b') => (elem: HTMLElement, done: gsap.Callback) => {
    const tl = gsap.timeline({ onComplete: done });
    tl.add(transitions[`team-${team}`].leave(elem));
};
const beforeTeamAEnter = beforeTeamEnter('a');
const teamAEnter = teamEnter('a');
const teamALeave = teamLeave('a');
const beforeTeamBEnter = beforeTeamEnter('b');
const teamBEnter = teamEnter('b');
const teamBLeave = teamLeave('b');
</script>

<style scoped lang="scss">
.team-display {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 2fr 1fr 2fr;
    align-items: end;
    align-content: center;

    .versus-wrapper {
        width: 100%;
        height: 120px;
        align-self: center;
        overflow: hidden;

        .versus {
            width: 100%;
            font-weight: 800;
            font-size: 110px;
            text-align: center;
            filter: drop-shadow(0 0 3px white);
        }
    }
}
</style>
