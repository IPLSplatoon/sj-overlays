<template>
    <div class="stage layout vertical c-horiz">
        <svg :viewBox="`0 0 ${width + 20} 620`">
            <path
                class="stage-border stage-border-color stage-border_${index}"
                :d="`M${(width + 4) / 2},2
                             L28,2
                             C13.471,2 2,15.542 2,32.222
                             L2,572
                             C2,588.458 13.471,602 27.6,602
                             L${width - 24},602
                             C${width - 10}.529,602 ${width + 2},588.458 ${width + 2},571.778
                             L${width + 2},32
                             C${width + 2},15.542 ${width - 10}.529,2 ${width - 24}.4,2
                             L${(width + 4) / 2},2`"
                :style="{ fill: 'none', strokeWidth: '4px' }"
            />
            <path
                class="stage-border stage-border-white stage-border_${index}"
                :d="`M${(width + 4) / 2},2
                             L28,2
                             C13.471,2 2,15.542 2,32.222
                             L2,572
                             C2,588.458 13.471,602 27.6,602
                             L${width - 24},602
                             C${width - 10}.529,602 ${width + 2},588.458 ${width + 2},571.778
                             L${width + 2},32
                             C${width + 2},15.542 ${width - 10}.529,2 ${width - 24}.4,2
                             L${(width + 4) / 2},2`"
                :style="{ fill: 'none', stroke: '#fff', strokeWidth: '2px' }"
            />
        </svg>
        <div class="stage-content-wrapper">
            <transition
                mode="out-in"
                :css="false"
                @enter="stageUpdateEnter"
                @leave="stageUpdateLeave"
                @before-enter="stageUpdateBeforeEnter"
            >
                <div
                    :key="`${game.stage}_${game.mode}`"
                    class="stage-info-wrapper"
                >
                    <div
                        class="stage-image"
                        :style="{ backgroundImage: `url('${getStageImagePath(game.stage)}')`, filter: stageImageFilter }"
                    />
                    <opacity-swap-transition>
                        <div
                            v-if="game.winner !== 'none'"
                            class="stage-winner-wrapper layout horiz"
                            :style="{ opacity: game.winner === 'none' ? '0' : '1' }"
                        >
                            <opacity-swap-transition>
                                <div
                                    :key="winnerName"
                                    class="winner-name"
                                >
                                    {{ winnerName }}
                                </div>
                            </opacity-swap-transition>
                        </div>
                    </opacity-swap-transition>
                    <div
                        class="stage-line"
                        :style="{ border: `1px solid ${color}` }"
                    />
                    <div class="stage-info layout vertical c-horiz">
                        <div class="mode-icon layout horiz c-horiz c-vert">
                            <img :src="getIconFromMode(game.mode)">
                        </div>
                        <fitted-content
                            :max-width="width - 30"
                            align="center"
                            class="mode-name"
                        >
                            {{ localizedModeName }}
                        </fitted-content>
                        <div class="stage-name-wrapper layout horiz c-vert">
                            <div class="stage-name">{{ localizedStageName }}</div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onMounted, PropType, watch } from 'vue';
import { colors, getIconFromMode } from '../../../../helpers/constants';
import FittedContent from '../../../../components/FittedContent.vue';
import { hexToRgb, Solver } from '../../../../helpers/color';
import gsap from 'gsap';
import OpacitySwapTransition from '../../../../components/OpacitySwapTransition.vue';
import { useActiveRoundStore } from 'client-shared/store/activeRoundStore';
import { useLocaleInfoStore } from 'client-shared/store/localeInfoStore';
import { useAssetPathStore } from 'client-shared/store/assetPathStore';

export default defineComponent({
    name: 'BreakStageDisplay',

    components: { OpacitySwapTransition, FittedContent },

    props: {
        game: {
            type: Object as PropType<{ winner: 'none' | 'alpha' | 'bravo', mode: string, stage: string }>,
            required: true
        },
        width: {
            type: Number,
            required: true
        }
    },

    setup(props) {
        const activeRoundStore = useActiveRoundStore();
        const localeInfoStore = useLocaleInfoStore();
        const assetPathStore = useAssetPathStore();

        const color = computed(() => {
            switch (props.game.winner) {
                case 'alpha':
                    return colors.red;
                case 'bravo':
                    return colors.green;
                default:
                    return colors.blue;
            }
        });

        function getFilters(color: string) {
            return {
                dropShadowFilter: `drop-shadow(0 0 3px ${color}) drop-shadow(0 0 5px ${color})`,
                colorFilter: new Solver(hexToRgb(color)).solve().filter
            };
        }

        onMounted(() => {
            const el = getCurrentInstance().vnode.el as HTMLElement;

            watch(color, newValue => {
                const filters = getFilters(newValue);

                gsap.to(el.querySelector('.stage-border-color'), { stroke: newValue, duration: 0.5 });
                gsap.to(el.querySelector('svg'), { filter: filters.dropShadowFilter, duration: 0.5 });
                gsap.to(el.querySelector('.stage-line'), { border: `1px solid ${newValue}`, filter: filters.dropShadowFilter, duration: 0.5 });
                gsap.to(el.querySelector('.mode-icon'), { filter: filters.colorFilter, duration: 0.5 });
            }, { immediate: true });
        });

        return {
            color,
            localizedStageName: computed(() => localeInfoStore.localeInfo.stages[props.game.stage]),
            localizedModeName: computed(() => localeInfoStore.localeInfo.modes[props.game.mode]),
            dropShadowFilter: computed(() => `drop-shadow(0 0 3px ${color.value}) drop-shadow(0 0 5px ${color.value})`),
            colorFilter: computed(() => new Solver(hexToRgb(color.value)).solve().filter),
            colors,
            getIconFromMode,
            getStageImagePath: assetPathStore.getStageImagePath,
            stageImageFilter: computed(() => props.game.winner === 'none' ? 'blur(0px) saturate(1)' : 'blur(2px) saturate(0.5)'),
            winnerName: computed(() => {
                switch (props.game.winner) {
                    case 'alpha':
                        return activeRoundStore.activeRound.teamA.name;
                    case 'bravo':
                        return activeRoundStore.activeRound.teamB.name;
                    default:
                        return undefined;
                }
            }),

            stageUpdateBeforeEnter: (elem: HTMLElement) => {
                const filters = getFilters(color.value);
                gsap.set(elem.querySelector('.stage-line'), { border: `1px solid ${color.value}`, filter: filters.dropShadowFilter });
                gsap.set(elem.querySelector('.mode-icon'), { filter: filters.colorFilter });
                gsap.set(elem, { x: '-100%' });
            },
            stageUpdateEnter: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem, { x: 0, ease: 'power2.out', onComplete: done });
            },
            stageUpdateLeave: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem, { x: '100%', ease: 'power2.in', onComplete: done });
            }
        };
    }
});
</script>

<style lang="scss">
@import '../../../../styles/constants';
@import '../../../../styles/background';
@import '../../../../styles/glow';

.stage {
    height: 100%;
    position: relative;
    border-radius: 28px;

    svg {
        width: calc(100% + 20px);
        height: calc(100% + 25px);
        position: absolute;
        margin-left: 16px;
        margin-top: -6px;
        z-index: 4;
    }

    .glow-border {
        z-index: 2;
    }

    .stage-image {
        height: 450px;
        width: 100%;
        background-position: center center;
        background-size: cover;
        transition: filter 500ms;
    }

    .stage-winner-wrapper {
        position: absolute;
        top: 0; left: 0;
        height: 450px;
        width: 100%;
        background-color: $background-a-60;

        .winner-name {
            align-self: flex-end;
            margin: 0 10px 5px;
            font-size: 30px;
            filter: drop-shadow(0 0 4px rgba(22, 22, 22, 0.5));
        }
    }

    .stage-info-wrapper {
        @include background(18px);
    }

    .stage-line {
        @include line-glow($blue);
        width: calc(100% - 5px);
        height: 2px;
        z-index: 5;
    }

    .stage-line:after {
        content: '';
        width: calc(100% + 6px);
        height: 2px;
        background-color: white;
        position: absolute;
        left: -3px;
        top: 0;
    }

    .stage-content-wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 28px;
        position: relative;
    }

    .stage-info {
        flex-grow: 1;
        height: 145px;
        width: 100%;
        position: relative;

        .mode-name {
            font-size: 32px;
            font-weight: 700;
            font-style: italic;
            margin-top: 13px;
        }

        .mode-icon {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0.4;

            img {
                height: 110px;
            }
        }

        .stage-name-wrapper {
            height: 70px;
            z-index: 3;
        }

        .stage-name {
            font-size: 30px;
            font-weight: 400;
            text-align: center;
            line-height: 35px;
            margin: 0 8px;
        }
    }
}
</style>
