<template>
    <div class="main-scene-wrapper w-max layout horiz c-vert c-horiz">
        <div class="logo-wrapper layout vertical c-horiz c-vert">
            <img
                :src="resolveStaticPath('/SJ_Logo.png')"
                class="logo"
            >
            <div class="tournament-name layout horiz">
                <span class="logo-font">SuperJump</span>
                <img
                    :src="resolveStaticPath('/SJ_5.png')"
                    class="edition"
                >
            </div>
            <img
                :src="resolveStaticPath('/ipl-powered-inkling.png')"
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
import { useNextRoundStore } from 'client-shared/store/nextRoundStore';
import { provideTransitions } from '../../../../helpers/transition';
import { resolveStaticPath } from '../../../../helpers/string';

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

        const beforeEnter = (elem: HTMLElement) => {
            gsap.set(elem.querySelector('.main-content-wrapper'), { height: 0, opacity: 0 });
            gsap.set(elem.querySelector('.logo-wrapper'), { opacity: 0 });
        };

        const enter = (elem: HTMLElement, done: gsap.Callback) => {
            const tl = gsap.timeline({ onComplete: done });

            tl.addLabel('sceneIn');
            tl
                .to(
                    elem.querySelector('.main-content-wrapper'),
                    { duration: 0.2, opacity: 1 },
                    'sceneIn')
                .to(
                    elem.querySelector('.main-content-wrapper'),
                    { duration: 0.55, height: 700, ease: 'power2.out' },
                    'sceneIn')
                .to(
                    elem.querySelector('.logo-wrapper'),
                    { opacity: 1, duration: 0.5, ease: 'power2.out' },
                    'sceneIn');

            return tl;
        };

        const leave = (elem: HTMLElement, done: gsap.Callback) => {
            const tl = gsap.timeline({ onComplete: done });

            tl.addLabel('sceneOut');
            tl
                .to(
                    elem.querySelectorAll('.main-content-wrapper, .main-slides'),
                    { duration: 0.55, height: 0, ease: 'power2.in' },
                    'sceneOut')
                .to(
                    elem.querySelector('.main-content-wrapper'),
                    { duration: 0.2, opacity: 1, delay: 0.35 },
                    'sceneOut')
                .to(
                    elem.querySelector('.logo-wrapper'),
                    { opacity: 0, duration: 0.5, ease: 'power2.in' },
                    'sceneOut');

            return tl;
        };

        provideTransitions('break', null, { beforeEnter, enter, leave });

        return {
            activeSlide: slides.activeComponent,
            beforeEnter,
            enter,
            leave,

            beforeSlideEnter: (elem: HTMLElement) => {
                gsap.set(elem.children, { y: -50, opacity: 0 });
            },
            slideEnter: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem.children, { y: 0, opacity: 1, duration: 0.5, stagger: -0.05, ease: 'power2.out', onComplete: done });
            },
            slideLeave: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem.children, { y: 50, opacity: 0, duration: 0.5, stagger: -0.05, ease: 'power2.in', onComplete: done });
            },
            resolveStaticPath
        };
    }
});
</script>

<style lang="scss">
@use '../../../../styles/glow';
@use '../../../../styles/background';
@use '../../../../styles/constants';

@mixin shadow {
    filter: drop-shadow(0 0 3px constants.$background) drop-shadow(0 0 10px constants.$background);
}

.main-scene-wrapper {
    height: 100%;

    .logo-wrapper {
        width: 500px;
        height: 100%;
        margin-right: 100px;
        margin-bottom: 50px;

        .logo {
            height: 675px;
        }

        .tournament-name {
            align-items: flex-end;
            margin-top: -40px;

            > img {
                width: 105px;
                transform: translate(5px, 20px);
            }
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
        @include background.background();
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
                    @include glow.line-glow(constants.$blue);
                    height: 2px;
                    width: 700px;
                    margin: 10px 0 15px;
                }
            }
        }
    }
}
</style>
