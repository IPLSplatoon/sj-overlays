<template>
    <div class="info-bar-wrapper w-max layout c-horiz">
        <div class="info-bar layout horiz c-horiz glow-border glow-blue">
            <div class="bar-content">
                <div class="icon-wrapper layout horiz c-vert c-horiz">
                    <img
                        src="/bundles/sj-overlays/assets/SJ_Eyes.png"
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
                    <img
                        id="mode-icon"
                        src="/bundles/sj-overlays/assets/SJ_RM-Glow.png"
                        class="icon mode-icon"
                    >
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
import { useReplicant } from 'nodecg-vue-composable';
import { DASHBOARD_BUNDLE_NAME } from '../../../../helpers/constants';
import { MusicShown } from 'schemas';
import BreakInfoBarMusic from './BreakInfoBarMusic.vue';
import BreakInfoBarCasterTwitters from './BreakInfoBarCasterTwitters.vue';

export default defineComponent({
    name: 'BreakInfoBar',

    components: {
        BreakInfoBarWelcome,
        BreakInfoBarCasters,
        BreakInfoBarCasterTwitters,
        BreakInfoBarMusic
    },

    setup() {
        const musicShown = useReplicant<MusicShown>('musicShown', DASHBOARD_BUNDLE_NAME);

        const slides = useSlides([
            { component: 'BreakInfoBarWelcome', duration: 10 },
            { component: 'BreakInfoBarCasters', duration: 20 },
            { component: 'BreakInfoBarCasterTwitters', duration: 20 },
            { component: 'BreakInfoBarMusic', enabled: computed(() => musicShown.data ?? true) }
        ]);

        return {
            activeSlide: slides.activeComponent,

            beforeSlideEnter: (elem: HTMLElement) => {
                gsap.set(elem, { opacity: 0, y: -35 });
            },
            slideEnter: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.35, onComplete: done });
            },
            slideLeave: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem, { opacity: 0, y: 35, ease: 'power2.in', duration: 0.35, onComplete: done });
            }
        };
    }
});
</script>

<style lang="scss">
@import '../../../../styles/constants';
@import '../../../../styles/background';
@import '../../../../styles/glow';

.info-bar-wrapper {
    position: absolute;
    width: $pageWidth;
    top: 100px;

    .info-bar {
        @include background();

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
                    filter: drop-shadow(0 0 4px $salmon);

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
