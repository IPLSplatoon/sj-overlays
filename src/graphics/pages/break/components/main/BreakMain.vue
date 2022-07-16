<template>
    <div class="main-scene-wrapper w-max layout horiz c-vert c-horiz">
        <div class="logo-wrapper layout vertical c-horiz c-vert">
            <img
                src="/bundles/sj-overlays/assets/SJ_Logo.png"
                class="logo"
            >
            <div class="logo-font">SuperJump</div>
            <img
                src="/bundles/sj-overlays/assets/ipl-powered-inkling.png"
                class="ipl-powered"
            >
        </div>
        <div class="main-content-wrapper layout c-vert glow-border glow-blue">
            <div class="main-slides layout vertical c-horiz c-vert">
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
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import gsap from 'gsap';
import { useSlides } from '../../../../helpers/useSlides';
import MainSlideGeneralInfo from './MainSlideGeneralInfo.vue';
import MainSlideSupport from './MainSlideSupport.vue';
import MainSlideNextMatch from './MainSlideNextMatch.vue';
import { useNextRoundStore } from '../../../../store/nextRoundStore';

export default defineComponent({
    name: 'BreakMain',

    components: { MainSlideGeneralInfo, MainSlideSupport, MainSlideNextMatch },

    setup() {
        const nextRoundStore = useNextRoundStore();

        const slides = useSlides([
            { component: 'MainSlideGeneralInfo' },
            { component: 'MainSlideSupport', duration: 15 },
            { component: 'MainSlideNextMatch', enabled: computed(() => nextRoundStore.nextRound.showOnStream) }
        ]);

        return {
            activeSlide: slides.activeComponent,
            beforeEnter: (elem: HTMLElement) => {
                gsap.set(elem.querySelector('.main-content-wrapper'), { height: 0 });
                gsap.set(elem.querySelector('.logo-wrapper'), { opacity: 0 });
            },
            enter: (elem: HTMLElement, done: gsap.Callback) => {
                const tl = gsap.timeline({ onComplete: done });

                tl.addLabel('sceneIn');
                tl
                    .to(
                        elem.querySelector('.main-content-wrapper'),
                        { duration: 0.55, height: 700, ease: 'power2.out' },
                        'sceneIn')
                    .to(
                        elem.querySelector('.logo-wrapper'),
                        { opacity: 1, duration: 0.5, ease: 'power2.out' },
                        'sceneIn');
            },
            leave: (elem: HTMLElement, done: gsap.Callback) => {
                const tl = gsap.timeline({ onComplete: done });

                tl.addLabel('sceneOut');
                tl
                    .to(
                        elem.querySelectorAll('.main-content-wrapper, .main-slides'),
                        { duration: 0.55, height: 0, ease: 'power2.in' },
                        'sceneOut')
                    .to(
                        elem.querySelector('.logo-wrapper'),
                        { opacity: 0, duration: 0.5, ease: 'power2.in' },
                        'sceneOut');
            },

            beforeSlideEnter: (elem: HTMLElement) => {
                gsap.set(elem.children, { y: -50, opacity: 0 });
            },
            slideEnter: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem.children, { y: 0, opacity: 1, duration: 0.5, stagger: -0.05, ease: 'power2.out', onComplete: done });
            },
            slideLeave: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem.children, { y: 50, opacity: 0, duration: 0.5, stagger: -0.05, ease: 'power2.in', onComplete: done });
            }
        };
    }
});
</script>

<style lang="scss">
@import '../../../../styles/constants';
@import '../../../../styles/background';
@import '../../../../styles/glow';

@mixin shadow {
    filter: drop-shadow(0 0 3px $background) drop-shadow(0 0 10px $background);
}

.main-scene-wrapper {
    height: 100%;

    .logo-wrapper {
        width: 500px;
        height: 100%;
        margin-right: 75px;
        margin-bottom: 50px;

        .logo {
            height: 700px;
        }

        .ipl-powered {
            @include shadow;

            width: 350px;
            margin-top: 20px;
        }

        .logo-font {
            @include shadow;

            font-size: 80px;
            margin-top: -40px;
        }
    }

    .main-content-wrapper {
        @include background();
        position: relative;
        width: 1000px;
        height: 700px;
        overflow: hidden;

        .main-slides {
            position: absolute;
            width: 100%;
            height: 700px;
            overflow: hidden;
            z-index: 3;

            .slide {
                position: absolute;
                width: calc(100% - 100px);
                height: 630px;

                .title {
                    font-size: 80px;
                    font-weight: 700;
                    height: 109px;
                }

                .separator {
                    @include line-glow($blue);
                    height: 2px;
                    width: 700px;
                    margin: 10px 0 15px;
                }
            }
        }
    }
}
</style>
