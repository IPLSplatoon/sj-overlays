<template>
    <div class="info-bar-wrapper w-max layout c-horiz">
        <div class="info-bar layout horiz c-horiz glow-border glow-blue">
            <div class="bar-content">
                <div class="icon-wrapper layout horiz c-vert c-horiz">
                    <img
                        :src="resolveStaticPath('/SJ_Eyes.png')"
                        class="icon eyes-icon"
                    >
                </div>
                <div class="text-wrapper">
                    <div
                        id="info-rows"
                        class="info-rows"
                    >
                        <transition
                            mode="out-in"
                            :css="false"
                            @enter="slideEnter"
                            @leave="slideLeave"
                            @before-enter="beforeSlideEnter"
                        >
                            <component :is="activeSlide" />
                        </transition>
                    </div>
                </div>
                <div class="icon-wrapper mode-icon layout horiz c-vert c-horiz">
                    <opacity-swap-transition>
                        <img
                            :key="nextMode"
                            :src="modeIconSrc"
                            class="icon"
                            :class="{ 'mode-icon': nextMode != null, 'eyes-icon': nextMode == null }"
                        >
                    </opacity-swap-transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useSlides } from '../../../../helpers/useSlides';
import BreakInfoBarWelcome from './BreakInfoBarWelcome.vue';
import gsap from 'gsap';
import BreakInfoBarCasters from './BreakInfoBarCasters.vue';
import BreakInfoBarMusic from './BreakInfoBarMusic.vue';
import BreakInfoBarCasterTwitters from './BreakInfoBarCasterTwitters.vue';
import { useMusicStore } from 'client-shared/store/musicStore';
import { useActiveRoundStore } from 'client-shared/store/activeRoundStore';
import { getGlowIconFromMode } from '../../../../helpers/constants';
import OpacitySwapTransition from '../../../../components/OpacitySwapTransition.vue';
import { useBreakScreenStore } from 'client-shared/store/breakScreenStore';
import BreakInfoBarActiveRound from './BreakInfoBarActiveRound.vue';
import BreakInfoBarNextRound from './BreakInfoBarNextRound.vue';
import { useNextRoundStore } from 'client-shared/store/nextRoundStore';
import { resolveStaticPath } from '../../../../helpers/string';

export default defineComponent({
    name: 'BreakInfoBar',

    components: {
        OpacitySwapTransition,
        BreakInfoBarWelcome,
        BreakInfoBarCasters,
        BreakInfoBarCasterTwitters,
        BreakInfoBarMusic,
        BreakInfoBarActiveRound,
        BreakInfoBarNextRound
    },

    setup() {
        const musicStore = useMusicStore();
        const activeRoundStore = useActiveRoundStore();
        const breakScreenStore = useBreakScreenStore();
        const nextRoundStore = useNextRoundStore();
        const casterSceneInactive = computed(() => !breakScreenStore.breakUseCastersScene);

        const slides = useSlides([
            { component: 'BreakInfoBarWelcome', duration: 10 },
            { component: 'BreakInfoBarCasters', duration: 20, enabled: casterSceneInactive },
            { component: 'BreakInfoBarCasterTwitters', duration: 20, enabled: casterSceneInactive },
            { component: 'BreakInfoBarMusic', enabled: computed(() => musicStore.musicShown) },
            { component: 'BreakInfoBarActiveRound', enabled: computed(() => breakScreenStore.activeScene !== 'stages' && !nextRoundStore.nextRound.showOnStream) },
            { component: 'BreakInfoBarNextRound', enabled: computed(() => breakScreenStore.activeScene !== 'stages' && nextRoundStore.nextRound.showOnStream) }
        ]);

        const nextMode = computed(() => activeRoundStore.activeRound.games.find(game => game.winner === 'none')?.mode);

        return {
            activeSlide: slides.activeComponent,

            nextMode,
            modeIconSrc: computed(() => getGlowIconFromMode(nextMode.value)),

            beforeSlideEnter: (elem: HTMLElement) => {
                gsap.set(elem, { opacity: 0, y: -35 });
            },
            slideEnter: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.35, onComplete: done });
            },
            slideLeave: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem, { opacity: 0, y: 35, ease: 'power2.in', duration: 0.35, onComplete: done });
            },
            resolveStaticPath
        };
    }
});
</script>

<style lang="scss">
@use '../../../../styles/constants';
@use '../../../../styles/background';
@use '../../../../styles/glow';

.info-bar-wrapper {
    position: absolute;
    width: constants.$pageWidth;
    top: 100px;

    .info-bar {
        @include background.background();

        position: absolute;
        overflow: hidden;
        height: 86px;
        width: 1300px;

        .bar-content {
            $sideContentWidth: 125px;

            position: absolute;
            top: 0;
            width: 1300px;
            height: 100%;

            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: $sideContentWidth auto $sideContentWidth;
            align-items: center;
            justify-items: center;

            font-size: 38px;
            font-style: italic;

            .text-wrapper {
                position: relative;
                width: 100%; height: 100%;

                .info-row {
                    position: absolute;
                    width: 100%; height: 100%;

                    .icon {
                        filter: drop-shadow(0 0 3px white);
                        margin-right: 15px;
                    }
                }
            }

            .icon-wrapper {
                height: 100%;
                width: 100px;
                overflow: hidden;

                .icon {
                    filter: drop-shadow(0 0 4px constants.$salmon);

                    &.eyes-icon {
                        transform: scale(0.6);
                    }

                    &.mode-icon {
                        transform: scale(0.5);
                    }
                }
            }
        }
    }
}
</style>
