<template>
    <div class="teams-wrapper w-max layout vertical c-horiz">
        <div
            class="team-display"
            :class="{ 'predictions-hidden': !predictionsVisible }"
            :style="{ height: teamDisplayHeight, transform: teamDisplayTransform }"
        >
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
        <break-teams-prediction-display />
    </div>
</template>

<script lang="ts">
import { NodeCGBrowser } from 'nodecg/browser';
import { computed, defineComponent, provide, ref } from 'vue';
import gsap from 'gsap';
import BreakScreenTeam from './BreakScreenTeam.vue';
import { DASHBOARD_BUNDLE_NAME } from '../../../../helpers/constants';
import BreakTeamsPredictionDisplay from './BreakTeamsPredictionDisplay.vue';
import {
    provideTransitions,
    TransitionFunctionMap,
    transitionFunctionsInjectionKey
} from '../../../../helpers/transition';
import { usePredictionDataStore } from '../../../../store/predictionDataStore';

export default defineComponent({
    name: 'BreakTeams',

    components: { BreakTeamsPredictionDisplay, BreakScreenTeam },

    setup() {
        const predictionDataStore = usePredictionDataStore();
        const predictionActive = computed(() => predictionDataStore.predictionStore.currentPrediction?.status === 'ACTIVE');
        const forceShowPredictions = ref(false);
        const predictionsVisible = computed(() => predictionActive.value || forceShowPredictions.value);

        nodecg.listenFor('showPredictionData', DASHBOARD_BUNDLE_NAME, () => {
            forceShowPredictions.value = true;
            setTimeout(() => {
                forceShowPredictions.value = false;
            }, 20 * 1000);
        });

        const transitions: TransitionFunctionMap = {};
        provide(transitionFunctionsInjectionKey, transitions);
        provide('predictionsVisible', predictionsVisible);

        const beforeEnter = (elem: HTMLElement) => {
            transitions['team-a-name'].beforeEnter(elem);
            transitions['team-b-name'].beforeEnter(elem);
            gsap.set(
                elem.querySelectorAll('.teams-wrapper .content .team-a-player, .teams-wrapper .content .team-b-player'),
                { x: -350, opacity: 0 });
            gsap.set(
                elem.querySelectorAll('.teams-wrapper .line.top, .teams-wrapper .line.mid'),
                { opacity: 0, width: 0 });
            gsap.set(
                elem.querySelector('.teams-wrapper .versus'),
                { y: 200 });
            gsap.set(
                elem.querySelectorAll('.teams-wrapper .content'),
                { height: 0 });

            if (predictionsVisible.value) {
                transitions.predictions.beforeEnter(elem);
            }
        };

        const enter = (elem: HTMLElement, done: gsap.Callback) => {
            const tl = gsap.timeline({ onComplete: done });

            tl
                .addLabel('teamsIn')
                .addLabel('sceneIn')
                .addLabel('teamsLineIn', '+=0.35')
                .add('teamsTextIn', '+=0.45');

            if (predictionsVisible.value) {
                tl.add(transitions.predictions.enter(elem, 0), 'teamsIn');
            }

            tl
                .to(
                    elem.querySelector('.teams-wrapper .versus'),
                    { duration: 0.4, y: 0, ease: 'power1.out', delay: 0.15 },
                    'teamsIn')
                .to(
                    elem.querySelectorAll('.teams-wrapper .content'),
                    { duration: 0.55, height: 'calc(100% - 55px)', ease: 'power2.out' },
                    'teamsIn')
                .to(
                    elem.querySelectorAll('.teams-wrapper .line.top'),
                    { duration: 0.55, width: 375, opacity: 1, ease: 'power2.out' },
                    'teamsLineIn')
                .to(
                    elem.querySelectorAll('.teams-wrapper .line.mid'),
                    { duration: 0.55, width: 600, opacity: 1, ease: 'power2.out' },
                    'teamsLineIn')
                .add(transitions['team-a-name'].enter(elem), 'teamsTextIn')
                .add(transitions['team-b-name'].enter(elem), 'teamsTextIn')
                .to(
                    elem.querySelectorAll('.teams-wrapper .content .team-b-player'),
                    { duration: 0.5, x: 0, ease: 'power2.out', stagger: 0.1, opacity: 1 },
                    'teamsTextIn')
                .to(
                    elem.querySelectorAll('.teams-wrapper .content .team-a-player'),
                    { duration: 0.5, x: 0, ease: 'power2.out', stagger: 0.1, opacity: 1 },
                    'teamsTextIn');

            return tl;
        };

        const leave = (elem: HTMLElement, done: gsap.Callback) => {
            const tl = gsap.timeline({ onComplete: done });

            tl
                .addLabel('teamsTextOut')
                .addLabel('sceneOut')
                .addLabel('teamsLineOut', '+=0.4')
                .addLabel('teamsOut', '+=0.6');

            tl
                // the next two tweens are identical because otherwise staggers wouldn't work
                .to(
                    elem.querySelectorAll('.teams-wrapper .content .team-a-player'),
                    { duration: 0.5, x: -350, ease: 'power2.in', stagger: 0.1, opacity: 0 },
                    'teamsTextOut')
                .to(
                    elem.querySelectorAll('.teams-wrapper .content .team-b-player'),
                    { duration: 0.5, x: -350, ease: 'power2.in', stagger: 0.1, opacity: 0 },
                    'teamsTextOut')
                .add(transitions['team-a-name'].leave(elem), 'teamsTextOut')
                .add(transitions['team-b-name'].leave(elem), 'teamsTextOut')
                .to(
                    elem.querySelectorAll('.teams-wrapper .line.top, .teams-wrapper .line.mid'),
                    { duration: 0.55, width: 0, opacity: 0, ease: 'power2.in' },
                    'teamsLineOut')
                .to(
                    elem.querySelector('.teams-wrapper .versus'),
                    { duration: 0.40, y: 200, ease: 'power1.in', delay: 0.15 },
                    'teamsOut')
                .to(
                    elem.querySelectorAll('.teams-wrapper .content'),
                    { duration: 0.55, height: 0, ease: 'power2.in' },
                    'teamsOut');

            if (predictionsVisible.value) {
                tl.add(transitions.predictions.leave(elem), 'teamsOut-=0.1');
            }

            return tl;
        };

        provideTransitions('break', null, { beforeEnter, enter, leave });

        return {
            teamDisplayHeight: computed(() => predictionsVisible.value ? '525px' : '638px'),
            teamDisplayTransform: computed(() => predictionsVisible.value ? 'translateY(0px)' : 'translateY(25px)'),
            predictionsVisible,

            beforeEnter,
            enter,
            leave
        };
    }
});
</script>

<style lang="scss">
.teams-wrapper {
    position: absolute;
    top: 250px;

    .team-display {
        width: 1400px;
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 2fr 1fr 2fr;
        align-items: end;
        position: relative;
        transition: height 500ms, transform 500ms;

        &.predictions-hidden {
            transition-delay: 750ms;
        }

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
}
</style>
