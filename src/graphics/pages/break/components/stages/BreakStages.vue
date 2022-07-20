<template>
    <div class="stages-wrapper layout vertical c-horiz">
        <break-stages-scoreboard />
        <transition
            mode="out-in"
            :css="false"
            @enter="stagesEnter"
            @leave="stagesLeave"
            @before-enter="stagesBeforeEnter"
        >
            <div
                :key="activeRound.match.id"
                class="stage-grid"
                :style="{ width: `${styles.width}px`, gap: `${styles.gap}px`, gridTemplateColumns: `repeat(${games?.length ?? '3'}, 1fr)` }"
            >
                <break-stage-display
                    v-for="(game, index) in games"
                    :key="`${activeRound.match.id}_${index}`"
                    :game="game"
                    :width="styles.stageWidth"
                />
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide } from 'vue';
import gsap from 'gsap';
import BreakStagesScoreboard from './BreakStagesScoreboard.vue';
import { TransitionFunctionMap, transitionFunctionsInjectionKey } from '../../../../helpers/transition';
import BreakStageDisplay from './BreakStageDisplay.vue';
import { useActiveRoundStore } from '../../../../store/activeRoundStore';

const stageStyles: Record<string, { width: number, gap: number, stageWidth: number }> = {
    '3': {
        width: 1100,
        gap: 60,
        stageWidth: 326
    },
    '5': {
        width: 1400,
        gap: 30,
        stageWidth: 256
    },
    '7': {
        width: 1750,
        gap: 30,
        stageWidth: 224
    }
};

export default defineComponent({
    name: 'BreakStages',

    components: { BreakStageDisplay, BreakStagesScoreboard },

    setup() {
        const transitions: TransitionFunctionMap = {};
        provide(transitionFunctionsInjectionKey, transitions);

        const activeRoundStore = useActiveRoundStore();
        const games = computed(() => activeRoundStore.activeRound.games);

        const stagesBeforeEnter = (elem: HTMLElement) => {
            // set these to 102% because 100% causes weird subtle artifacts when the animation starts
            gsap.set(elem.querySelectorAll('.stage-info-wrapper'), { x: '-102%' });
            gsap.set(elem.querySelectorAll('.stage-border'), { drawSVG: '50% 50%' });
        };

        const stagesEnter = (elem: HTMLElement, done: gsap.Callback) => {
            const tl = gsap.timeline({ onComplete: done });

            const stageCount = games.value?.length;
            tl.addLabel('stagesIn', `+=${stageCount * 0.1 - 0.2}`);

            tl
                .to(
                    elem.querySelectorAll('.stage-border-white'),
                    { duration: 0.75, drawSVG: true, ease: 'power2.inOut', stagger: 0.1 },
                    'borderIn')
                .to(
                    elem.querySelectorAll('.stage-border-color'),
                    { duration: 0.75, drawSVG: true, ease: 'power2.inOut', stagger: 0.1 },
                    'borderIn')
                .to(
                    elem.querySelectorAll('.stage-info-wrapper'),
                    { x: 0, duration: 0.35, ease: 'power2.out', stagger: 0.1 },
                    'stagesIn');

            return tl;
        };

        const stagesLeave = (elem: HTMLElement, done: gsap.Callback) => {
            const tl = gsap.timeline({ onComplete: done });

            const stageCount = games.value?.length;
            tl.addLabel('borderOut', `+=${stageCount * 0.1 - 0.2}`);

            tl
                .to(
                    elem.querySelectorAll('.stage-info-wrapper'),
                    { x: '102%', duration: 0.35, ease: 'power2.in', stagger: 0.1 },
                    'sceneOut')
                .to(
                    elem.querySelectorAll('.stage-border-white'),
                    { duration: 0.75, drawSVG: '50% 50%', ease: 'power2.inOut', stagger: 0.1 },
                    'borderOut')
                .to(
                    elem.querySelectorAll('.stage-border-color'),
                    { duration: 0.75, drawSVG: '50% 50%', ease: 'power2.inOut', stagger: 0.1 },
                    'borderOut');

            return tl;
        };

        return {
            activeRound: computed(() => activeRoundStore.activeRound),
            games,
            styles: computed(() => stageStyles[games.value?.length.toString()] ?? stageStyles['3']),

            beforeEnter: (elem: HTMLElement) => {
                transitions.stagesScoreboard.beforeEnter(elem);
                stagesBeforeEnter(elem.querySelector('.stage-grid'));
            },
            enter: (elem: HTMLElement, done: gsap.Callback) => {
                const tl = gsap.timeline({ onComplete: done });

                tl
                    .add(transitions.stagesScoreboard.enter(elem), 'sceneIn')
                    .add(stagesEnter(elem.querySelector('.stage-grid'), undefined), 'sceneIn');
            },
            leave: (elem: HTMLElement, done: gsap.Callback) => {
                const tl = gsap.timeline({ onComplete: done });

                tl
                    .add(transitions.stagesScoreboard.leave(elem), 'sceneOut')
                    .add(stagesLeave(elem.querySelector('.stage-grid'), undefined), 'sceneOut');
            },

            stagesBeforeEnter,
            stagesEnter,
            stagesLeave
        };
    }
});
</script>

<style lang="scss">
.stage-grid {
    height: 600px;
    position: absolute;
    bottom: 150px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 1fr;
    gap: 20px;
}
</style>
