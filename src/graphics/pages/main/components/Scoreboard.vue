<template>
    <transition
        @enter="scoreboardEnter"
        @leave="scoreboardLeave"
        @before-enter="beforeScoreboardEnter"
    >
        <div
            v-if="scoreboardStore.scoreboardData.isVisible"
            class="scoreboard-wrapper"
        >
            <svg
                width="380"
                height="160"
                viewBox="0 0 380 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    class="scoreboard-line"
                    d="M369 88.5V5C369 2.79086 367.209 1 365 1H49C46.7909 1 45 2.79086 45 5V103.5C45 105.709 46.7909 107.5 49 107.5H365C367.209 107.5 369 109.291 369 111.5V149C369 151.209 367.209 153 365 153H-3"
                    stroke-linecap="round"
                    style="fill:none;stroke:#5FBFF9;stroke-width:4px;"
                />
                <path
                    class="scoreboard-line"
                    d="M369 88.5V5C369 2.79086 367.209 1 365 1H49C46.7909 1 45 2.79086 45 5V103.5C45 105.709 46.7909 107.5 49 107.5H365C367.209 107.5 369 109.291 369 111.5V149C369 151.209 367.209 153 365 153H-3"
                    stroke-linecap="round"
                    style="fill:none;stroke:#fff;stroke-width:2px;"
                />
            </svg>
            <div class="content layout vertical c-vert c-horiz">
                <div class="background teams-background" />
                <div class="score-row layout horiz c-vert">
                    <opacity-swap-transition>
                        <fitted-content
                            :key="teamAName"
                            class="team-name"
                            :max-width="230"
                        >
                            {{ teamAName }}
                        </fitted-content>
                    </opacity-swap-transition>
                    <score-counter
                        id="team-a-score"
                        class="team-score"
                        :value="teamA?.score"
                    />
                    <div
                        id="team-a-color"
                        class="team-color"
                        :style="{ backgroundColor: teamA?.color }"
                    />
                </div>
                <div class="score-separator" />
                <div class="score-row layout horiz c-vert">
                    <opacity-swap-transition>
                        <fitted-content
                            :key="teamBName"
                            class="team-name"
                            :max-width="230"
                        >
                            {{ teamBName }}
                        </fitted-content>
                    </opacity-swap-transition>
                    <score-counter
                        id="team-b-score"
                        class="team-score"
                        :value="teamB?.score"
                    />
                    <div
                        id="team-b-color"
                        class="team-color"
                        :style="{ backgroundColor: teamB?.color }"
                    />
                </div>
            </div>
            <div class="flavor-text-container layout horiz c-vert">
                <div class="background flavor-text-background" />
                <opacity-swap-transition>
                    <fitted-content
                        id="scoreboard-flavor-text"
                        :key="scoreboardStore.scoreboardData.flavorText"
                        align="left"
                        :max-width="270"
                        class="scoreboard-flavor-text"
                    >
                        {{ scoreboardStore.scoreboardData.flavorText }}
                    </fitted-content>
                </opacity-swap-transition>
                <img
                    class="scoreboard-icon"
                    src="/bundles/sj-overlays/assets/SJ_eyes.png"
                >
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import gsap from 'gsap';
import { addDots } from '../../../helpers/string';
import FittedContent from '../../../components/FittedContent.vue';
import OpacitySwapTransition from '../../../components/OpacitySwapTransition.vue';
import ScoreCounter from '../../../components/ScoreCounter.vue';
import { useActiveRoundStore } from '../../../store/activeRoundStore';
import { useScoreboardStore } from '../../../store/scoreboardStore';

export default defineComponent({
    name: 'Scoreboard',

    components: { ScoreCounter, OpacitySwapTransition, FittedContent },

    setup() {
        const activeRoundStore = useActiveRoundStore();
        const teamA = computed(() => activeRoundStore.activeRound.teamA);
        const teamB = computed(() => activeRoundStore.activeRound.teamB);

        const scoreboardStore = useScoreboardStore();

        return {
            teamA,
            teamB,
            teamAName: computed(() => addDots(teamA.value?.name)),
            teamBName: computed(() => addDots(teamB.value?.name)),
            scoreboardStore,
            scoreboardEnter: (elem: HTMLElement, done: gsap.Callback) => {
                const tl = gsap.timeline({
                    onComplete: done,
                });

                tl.addLabel('lineIn').addLabel('textIn', '+=0.45');

                tl
                    .to(elem.querySelectorAll('.scoreboard-line'),
                        { duration: 1, drawSVG: true, ease: 'power1.inOut' },
                        'lineIn')
                    .to(elem.querySelectorAll('.background'),
                        { duration: 0.6, opacity: 1, x: 0, ease: 'power2.out', delay: 0.7 },
                        'lineIn')
                    .to(elem.querySelector('.score-separator'),
                        { duration: 0.6, width: 295, ease: 'power2.out', delay: 0.3 },
                        'lineIn')
                    .to(elem.querySelector('.score-separator'),
                        { duration: 0.25, opacity: 1, ease: 'power2.out', delay: 0.2 },
                        'lineIn')
                    .to(elem.querySelectorAll('.team-name'),
                        { x: 0, duration: 0.65, ease: 'power2.out', stagger: 0.1 },
                        'textIn')
                    .to(elem.querySelectorAll('.team-score'),
                        { y: 0, duration: 0.35, ease: 'power2.out' },
                        'textIn')
                    .to(elem.querySelectorAll('.team-color'),
                        { x: 0, duration: 0.35, ease: 'power2.out', delay: 0.4 },
                        'textIn')
                    .to(elem.querySelectorAll('.scoreboard-icon, #scoreboard-flavor-text'),
                        { x: 0, opacity: 1, duration: 0.5, stagger: -0.1, ease: 'power2.out' },
                        'textIn');
            },
            beforeScoreboardEnter: (elem: HTMLElement) => {
                gsap.set(elem.querySelectorAll('.scoreboard-line'), { drawSVG: '100% 100%' });
                gsap.set(elem.querySelector('.flavor-text-background'), { opacity: 0, x: 100 });
                gsap.set(elem.querySelector('.teams-background'), { opacity: 0, x: -100 });
                gsap.set(elem.querySelector('.score-separator'), { width: 0, opacity: 0 });
                gsap.set(elem.querySelectorAll('.team-name'), { x: -250 });
                gsap.set(elem.querySelector('#team-a-score'), { y: 50 });
                gsap.set(elem.querySelector('#team-b-score'), { y: -50 });
                gsap.set(elem.querySelectorAll('.team-color'), { x: 50 });
                gsap.set(elem.querySelectorAll('.scoreboard-icon, #scoreboard-flavor-text'), { x: -50, opacity: 0 });
            },
            scoreboardLeave: (elem: HTMLElement, done: gsap.Callback) => {
                const tl = gsap.timeline({
                    onComplete: done,
                });

                tl.addLabel('textOut').addLabel('lineOut', '+=0.35');

                tl
                    .to(elem.querySelectorAll('.scoreboard-line'),
                        { duration: 1, drawSVG: '100% 100%', ease: 'power1.inOut' },
                        'lineOut')
                    .to(elem.querySelector('.flavor-text-background'),
                        { duration: 0.6, opacity: 0, x: 100, ease: 'power2.in' },
                        'textOut')
                    .to(elem.querySelector('.teams-background'),
                        { duration: 0.6, opacity: 0, x: -100, ease: 'power2.in' },
                        'textOut')
                    .to(elem.querySelector('.score-separator'),
                        { duration: 0.6, width: 0, ease: 'power2.in' },
                        'lineOut')
                    .to(elem.querySelector('.score-separator'),
                        { duration: 0.25, opacity: 0, ease: 'power2.out', delay: 0.55 },
                        'lineOut')
                    .to(elem.querySelectorAll('.team-name'),
                        { x: -250, duration: 0.45, ease: 'power2.in', stagger: 0.1 },
                        'textOut')
                    .to(elem.querySelector('#team-a-score'),
                        { y: 50, duration: 0.35, ease: 'power2.in' },
                        'textOut')
                    .to(elem.querySelector('#team-b-score'),
                        { y: -50, duration: 0.35, ease: 'power2.in' },
                        'textOut')
                    .to(elem.querySelectorAll('.team-color'),
                        { x: 50, duration: 0.35, ease: 'power2.in' },
                        'textOut')
                    .to(elem.querySelectorAll('.scoreboard-icon, #scoreboard-flavor-text'),
                        { x: -50, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.in' },
                        'textOut');
            }
        };
    }
});
</script>

<style lang="scss">
@import '../../../styles/glow';
@import '../../../styles/constants';

.scoreboard-wrapper {
    position: absolute;
    left: 0;
    top: 50px;

    > svg {
        @include svg-glow();
        z-index: 10;
        position: absolute;
    }

    .content {
        position: absolute;
        top: 3px;
        left: 45px;
        height: 104px;
        width: 323px;
        overflow: hidden;

        .background {
            position: absolute;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, rgba(63, 20, 80, 0.8) 95%, rgba(63, 20, 80, 0) 100%);
        }

        .score-separator {
            @include line-glow($blue);
            height: 2px;
            width: 295px;
            align-self: flex-start;
            margin-left: 14px;
        }

        .score-row {
            height: 50px;
            width: 296px;
            overflow: hidden;
            padding: 0 14px;

            .team-name {
                min-width: 230px;
                margin-left: 2px;
            }

            .team-score {
                min-width: 40px;
                font-weight: 800;
                font-size: 37px;
                width: 50px;
                padding: 0 2px;
                font-family: 'Montserrat', sans-serif;
            }

            .team-color {
                height: 33px;
                width: 20px;
                border-radius: 5px;
                filter: blur(1px);
                box-shadow: inset 0 0 5px rgba(22, 22, 22, 0.5);
                transition: background-color 500ms;
            }
        }
    }

    .flavor-text-container {
        position: absolute;
        top: 109px;
        left: 30px;
        padding-right: 7px;
        height: 43px;
        width: 330px;
        justify-content: flex-end;
        overflow: hidden;

        .background {
            width: 100%;
            height: 100%;
            position: absolute;
            right: -8px;
            background: linear-gradient(270deg, rgba(63, 20, 80, 0.8) 91.36%, rgba(63, 20, 80, 0) 100%);
            z-index: 4;
        }

        img {
            height: 30px;
            filter: drop-shadow(0 0 4px $salmon);
            margin-left: 8px;
            z-index: 5;
        }

        .scoreboard-flavor-text {
            font-size: 24px;
            z-index: 5;
        }
    }
}
</style>
