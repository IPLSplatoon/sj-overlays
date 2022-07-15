<template>
    <div class="stages-scoreboard layout horiz c-horiz glow-border glow-blue">
        <div class="content">
            <opacity-swap-transition>
                <fitted-content
                    :key="teamA?.name"
                    :max-width="410"
                    align="right"
                >
                    {{ teamA?.name }}
                </fitted-content>
            </opacity-swap-transition>
            <div class="scores layout horiz c-vert">
                <score-counter
                    :value="teamA?.score ?? 0"
                    :max-width="50"
                />
                <div />
                <score-counter
                    :value="teamB?.score ?? 0"
                    :max-width="50"
                />
            </div>
            <opacity-swap-transition>
                <fitted-content
                    :key="teamB?.name"
                    :max-width="410"
                >
                    {{ teamB?.name }}
                </fitted-content>
            </opacity-swap-transition>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useReplicant } from 'nodecg-vue-composable';
import { DASHBOARD_BUNDLE_NAME } from '../../../../helpers/constants';
import { ActiveRound } from 'schemas';
import ScoreCounter from '../../../../components/ScoreCounter.vue';
import FittedContent from '../../../../components/FittedContent.vue';
import OpacitySwapTransition from '../../../../components/OpacitySwapTransition.vue';
import gsap from 'gsap';
import { provideTransitions } from '../../../../helpers/transition';

export default defineComponent({
    name: 'BreakStagesScoreboard',

    components: { OpacitySwapTransition, FittedContent, ScoreCounter },

    setup() {
        const activeRound = useReplicant<ActiveRound>('activeRound', DASHBOARD_BUNDLE_NAME);

        const beforeEnter = (elem: HTMLElement) => {
            gsap.set(elem, { width: 0, opacity: 0 });
        };

        const enter = (elem: HTMLElement, done: gsap.Callback) => {
            const tl = gsap.timeline({ onComplete: done, onStart: () => gsap.set(elem, { opacity: 1 }) });

            tl.to(elem, { duration: 0.5, width: 1000, ease: 'power2.out' });

            return tl;
        };

        const leave = (elem: HTMLElement, done: gsap.Callback) => {
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(elem, { opacity: 0 });
                    if (done) {
                        done();
                    }
                }
            });

            tl.to(elem, { duration: 0.5, width: 0, ease: 'power2.in' });

            return tl;
        };

        provideTransitions('stagesScoreboard', '.stages-scoreboard', { enter, beforeEnter, leave });

        return {
            teamA: computed(() => activeRound.data?.teamA),
            teamB: computed(() => activeRound.data?.teamB),
        };
    }
});
</script>

<style lang="scss">
@import '../../../../styles/constants';
@import '../../../../styles/background';
@import '../../../../styles/glow';

.stages-scoreboard {
    height: 60px !important;
    width: 1000px;
    position: absolute;
    overflow: hidden;
    top: 227px;
    @include background();

    .content {
        width: 1000px;
        height: 100%;
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 3fr 1fr 3fr;
        align-items: center;
        position: absolute;

        .scores {
            background-color: $violet-a-20;
            z-index: 3;
            height: 100%;

            .fitted-content-wrapper {
                font-weight: 800;
                font-size: 45px;
                width: 50px;
                padding: 0 2px;
                font-family: 'Montserrat', sans-serif;
                text-align: center;
            }

            div {
                flex-grow: 1;
            }
        }

        > .fitted-content-wrapper {
            margin: 0 10px;
        }
    }
}
</style>
