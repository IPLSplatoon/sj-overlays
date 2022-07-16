<template>
    <transition
        mode="out-in"
        :css="false"
        @enter="enter"
        @leave="leave"
        @before-enter="beforeEnter"
    >
        <div
            v-if="predictionsVisible"
            class="prediction-display"
        >
            <div class="prediction-wrapper layout vertical c-horiz">
                <fitted-content
                    class="prediction-title"
                    :max-width="1200"
                    align="center"
                >
                    {{ predictionTitle }}
                </fitted-content>
                <div class="prediction-box glow-border glow-blue layout horiz c-horiz">
                    <div class="background-wrapper">
                        <div
                            class="background first-outcome-background"
                            :style="{ width: `${firstOutcomePercentage}%` }"
                        />
                        <div
                            class="background second-outcome-background"
                            :style="{ width: `${secondOutcomePercentage}%` }"
                        />
                    </div>
                    <div class="options layout horiz">
                        <div class="option alpha">
                            <div class="point-count">{{ firstOutcomePointsUsedTweened }}p</div>
                            <div class="percentage">{{ firstOutcomePercentageTweened }}%</div>
                        </div>
                        <div class="option bravo">
                            <div class="point-count">{{ secondOutcomePointsUsedTweened }}p</div>
                            <div class="percentage">{{ secondOutcomePercentageTweened }}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject } from 'vue';
import FittedContent from '../../../../components/FittedContent.vue';
import { useTweenedNumber } from '../../../../helpers/useTweenedNumber';
import { colors } from '../../../../helpers/constants';
import gsap from 'gsap';
import { provideTransitions } from '../../../../helpers/transition';
import { usePredictionDataStore } from '../../../../store/predictionDataStore';
import { useActiveRoundStore } from '../../../../store/activeRoundStore';

export default defineComponent({
    name: 'BreakTeamsPredictionDisplay',

    components: { FittedContent },

    setup() {
        const predictionDataStore = usePredictionDataStore();
        const activeRoundStore = useActiveRoundStore();

        function findOutcome(teamName: string, defaultIndex: number) {
            const matchingOutcomeIndex = predictionDataStore.predictionStore.currentPrediction?.outcomes
                .findIndex(outcome => outcome.title.toLowerCase() === teamName?.toLowerCase());

            return predictionDataStore.predictionStore.currentPrediction?.outcomes[matchingOutcomeIndex >= 0 ? matchingOutcomeIndex : defaultIndex];
        }
        const firstOutcome = computed(() => findOutcome(activeRoundStore.activeRound.teamA.name, 0));
        const secondOutcome = computed(() => findOutcome(activeRoundStore.activeRound.teamB.name, 1));

        const totalPointsUsed = computed(() => (firstOutcome.value?.pointsUsed ?? 0) + (secondOutcome.value?.pointsUsed ?? 0));
        const firstOutcomePercentage = computed(() => {
            const pointsUsed = firstOutcome.value?.pointsUsed;
            if (pointsUsed === 0 || !pointsUsed) {
                return 0;
            }
            return Math.round((pointsUsed / totalPointsUsed.value) * 100);
        });
        const secondOutcomePercentage = computed(() => {
            const pointsUsed = secondOutcome.value?.pointsUsed;
            if (pointsUsed === 0 || !pointsUsed) {
                return 0;
            }
            return Math.round((pointsUsed / totalPointsUsed.value) * 100);
        });
        const firstOutcomePercentageTweened = useTweenedNumber(firstOutcomePercentage);
        const secondOutcomePercentageTweened = useTweenedNumber(secondOutcomePercentage);

        const beforeEnter = (elem: HTMLElement) => {
            gsap.set(elem.querySelector('.prediction-box'), { width: 0, opacity: 0 });
            gsap.set(elem.querySelector('.prediction-title'), { opacity: 0 });
        };

        const enter = (elem: HTMLElement, done: gsap.Callback, delay = 0.5) => {
            const tl = gsap.timeline({
                delay,
                onComplete: done,
                onStart: () => gsap.set(elem.querySelector('.prediction-box'), { opacity: 1 })
            });

            tl.addLabel('predictionEnter');

            tl
                .to(
                    elem.querySelector('.prediction-title'),
                    { duration: 0.5, opacity: 1, ease: 'power2.out' },
                    'predictionEnter')
                .to(
                    elem.querySelector('.prediction-box'),
                    { duration: 0.65, width: 1300, ease: 'power2.out' },
                    'predictionEnter');

            return tl;
        };

        const leave = (elem: HTMLElement, done: gsap.Callback) => {
            const tl = gsap.timeline({ onComplete: done });

            tl.addLabel('predictionLeave');

            tl
                .to(
                    elem.querySelector('.prediction-box'),
                    { duration: 0.65, width: 0, ease: 'power2.in' },
                    'predictionLeave')
                .to(
                    elem.querySelector('.prediction-title'),
                    { duration: 0.5, opacity: 0, ease: 'power2.in' },
                    'predictionLeave');

            return tl;
        };

        provideTransitions('predictions', '.prediction-display', { beforeEnter, enter, leave });

        return {
            predictionsVisible: inject<ComputedRef<boolean>>('predictionsVisible'),
            predictionTitle: computed(() => predictionDataStore.predictionStore.currentPrediction?.title),
            firstOutcomePercentage,
            secondOutcomePercentage,
            firstOutcomePercentageTweened,
            secondOutcomePercentageTweened,
            percentageBackground: computed(() =>
                (firstOutcomePercentage.value === 0 && secondOutcomePercentage.value === 0)
                    ? 'unset'
                    : `linear-gradient(90deg, ${colors.red_a_20} 0%, ${colors.red_a_20} ${firstOutcomePercentage.value}%, ${colors.green_a_40} ${firstOutcomePercentage.value}%, ${colors.green_a_40} 100%)`),
            firstOutcomePointsUsedTweened: useTweenedNumber(computed(() => firstOutcome.value?.pointsUsed ?? 0)),
            secondOutcomePointsUsedTweened: useTweenedNumber(computed(() => secondOutcome.value?.pointsUsed ?? 0)),

            beforeEnter,
            enter,
            leave
        };
    }
});
</script>

<style lang="scss">
@import '../../../../styles/constants';
@import '../../../../styles/background';
@import '../../../../styles/glow';

.prediction-wrapper {
    $predictionWidth: 1300px;
    margin-top: 50px;

    .prediction-title {
        margin-bottom: 5px;
        font-size: 35px;
        font-style: italic;
        filter: drop-shadow(0 0 5px $background) drop-shadow(0 0 10px $background);
    }

    .prediction-box {
        @include background();

        height: 120px;
        width: $predictionWidth;
        overflow: hidden;

        .background-wrapper {
            position: absolute;
            height: 100%;
            width: $predictionWidth;
            display: flex;
            justify-content: space-between;

            .background {
                transition: width 350ms;
                height: 100%;

                &.first-outcome-background {
                    background-color: $red-a-20;
                }

                &.second-outcome-background {
                    background-color: $green-a-40;
                }
            }
        }

        .options {
            width: $predictionWidth;
            height: 100%;
            position: absolute;

            .option {
                width: 50%;
                margin: 6px 20px;

                &.bravo {
                    text-align: right;
                }

                .point-count {
                    font-size: 32px;
                    font-style: italic;
                }

                .percentage {
                    font-size: 72px;
                    font-weight: 800;
                    line-height: 65px;
                }
            }
        }
    }
}
</style>
