<template>
    <div class="teams-wrapper w-max layout vertical c-horiz">
        <div
            class="break-teams-content"
            :class="{ 'predictions-hidden': !predictionsVisible }"
            :style="{ height: teamDisplayHeight, transform: teamDisplayTransform }"
        >
            <transition
                mode="out-in"
                :css="false"
                @enter="subsceneEnter"
                @leave="subsceneLeave"
                @before-enter="beforeSubsceneEnter"
            >
                <head-to-head-subscene v-if="centralTeamDisplayMode === 'headToHead'" />
                <team-rosters-subscene v-else />
            </transition>
        </div>
        <break-teams-prediction-display />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, ref } from 'vue';
import gsap from 'gsap';
import { DASHBOARD_BUNDLE_NAME } from 'client-shared/constants';
import BreakTeamsPredictionDisplay from './BreakTeamsPredictionDisplay.vue';
import {
    provideTransitions,
    TransitionFunctionMap,
    transitionFunctionsInjectionKey
} from '../../../../helpers/transition';
import { usePredictionDataStore } from 'client-shared/store/predictionDataStore';
import TeamRostersSubscene from './TeamRostersSubscene.vue';
import { useCentralDataStore } from 'client-shared/store/centralDataStore';
import HeadToHeadSubscene from './HeadToHeadSubscene.vue';

export default defineComponent({
    name: 'BreakTeams',

    components: { HeadToHeadSubscene, TeamRostersSubscene, BreakTeamsPredictionDisplay },

    setup() {
        const centralDataStore = useCentralDataStore();
        const centralTeamDisplayMode = computed(() => centralDataStore.centralDisplaySettings.displayMode);

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
            transitions['break-teams'].beforeEnter(elem);

            if (predictionsVisible.value) {
                transitions.predictions.beforeEnter(elem);
            }
        };

        const enter = (elem: HTMLElement, done: gsap.Callback) => {
            const tl = gsap.timeline({ onComplete: done });

            tl
                .addLabel('teamsIn')
                .addLabel('sceneIn');

            if (predictionsVisible.value) {
                tl.add(transitions.predictions.enter(elem, 0), 'teamsIn');
            }

            tl.add(transitions['break-teams'].enter(elem, done));

            return tl;
        };

        const leave = (elem: HTMLElement, done: gsap.Callback) => {
            const tl = gsap.timeline({ onComplete: done });

            tl
                .addLabel('sceneOut')
                .addLabel('transitionsOut', '+=0.5');

            tl.add(transitions['break-teams'].leave(elem, done));

            if (predictionsVisible.value) {
                tl.add(transitions.predictions.leave(elem), 'transitionsOut');
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
            leave,

            beforeSubsceneEnter: (elem: HTMLElement) => {
                transitions['break-teams'].beforeEnter(elem);
            },
            subsceneEnter: (elem: HTMLElement, done: gsap.Callback) => {
                const tl = gsap.timeline({ onComplete: done });

                tl.add(transitions['break-teams'].enter(elem));
            },
            subsceneLeave: (elem: HTMLElement, done: gsap.Callback) => {
                const tl = gsap.timeline({ onComplete: done });

                tl.add(transitions['break-teams'].leave(elem));
            },

            centralTeamDisplayMode
        };
    }
});
</script>

<style lang="scss">
.teams-wrapper {
    position: absolute;
    top: 250px;

    .break-teams-content {
        width: 1400px;
        position: relative;
        transition: height 500ms, transform 500ms;

        &.predictions-hidden {
            transition-delay: 750ms;
        }
    }
}
</style>
