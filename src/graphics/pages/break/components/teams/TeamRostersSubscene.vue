<template>
    <div class="team-display">
        <break-screen-team
            team="A"
            class="team-a-display"
        />
        <div class="versus-wrapper layout horiz c-vert">
            <div class="versus">VS</div>
        </div>
        <break-screen-team
            team="B"
            class="team-b-display"
        />
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

const transitions: TransitionFunctionMap = {};
provide(transitionFunctionsInjectionKey, transitions);

provideTransitions('break-teams', null, {
    beforeEnter(elem: HTMLElement) {
        transitions['team-a'].beforeEnter(elem);
        transitions['team-b'].beforeEnter(elem);

        gsap.set(
            elem.querySelector('.versus'),
            { y: 200 });
    },
    enter(elem: HTMLElement, done: gsap.Callback) {
        const tl = gsap.timeline({ onComplete: done });

        tl.addLabel('teamsIn');

        tl
            .to(
                elem.querySelector('.teams-wrapper .versus'),
                { duration: 0.4, y: 0, ease: 'power1.out', delay: 0.15 },
                'teamsIn')
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
            .to(
                elem.querySelector('.teams-wrapper .versus'),
                { duration: 0.40, y: 200, ease: 'power1.in', delay: 0.15 },
                'teamsOut');

        return tl;
    }
});
</script>

<style scoped lang="scss">
.team-display {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 2fr 1fr 2fr;
    align-items: end;

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
