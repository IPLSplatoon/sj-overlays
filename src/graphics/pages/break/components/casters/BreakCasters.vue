<template>
    <div class="casters-wrapper w-max layout horiz c-horiz">
        <div
            ref="castersLayout"
            class="casters-layout"
            style="transform: translate(0px, 0px)"
        >
            <caster-display
                v-for="(caster, id, i) in props.casters"
                :key="id"
                :caster="caster"
                :width="casterWidth"
                :class="{
                    'span-two': casterCount % 2 === 1 && casterCount === i + 1,
                    small: markCastersSmall,
                    resizing: markCastersResizing
                }"
            />
        </div>
        <div
            v-if="props.largeVideoVisible != null"
            ref="largeCasterVideoWrapper"
            class="large-caster-video-wrapper"
        >
            <div class="large-caster-video glow-border glow-blue">
                <video-loader :src="props.largeVideoUrl" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { provideTransitions } from '../../../../helpers/transition';
import CasterDisplay from './CasterDisplay.vue';
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue';
import type { Casters } from 'schemas';
import VideoLoader from '../../../../components/VideoLoader.vue';
import { useBreakScreenStore } from 'client-shared/store/breakScreenStore';

const breakScreenStore = useBreakScreenStore();

const props = withDefaults(defineProps<{
    casters: Casters
    largeVideoUrl?: string
    largeVideoVisible?: boolean | null
}>(), {
    largeVideoUrl: undefined,
    largeVideoVisible: null
});

const casterCount = computed(() => Object.keys(props.casters).length);

const casterWidth = computed(() => {
    switch (casterCount.value) {
        case 1:
            return 1000;
        case 2:
            return 700;
        default:
            return 500;
    }
});

const castersLayout = useTemplateRef('castersLayout');
const largeCasterVideoWrapper = useTemplateRef('largeCasterVideoWrapper');
const markCastersSmall = ref(props.largeVideoVisible === true);
const markCastersResizing = ref(false);

onMounted(() => {
    if (props.largeVideoVisible == null) return;

    if (props.largeVideoVisible) {
        castersLayout.value!.classList.add('alt-layout');
        gsap.set(castersLayout.value!, { x: -700 });
        markCastersSmall.value = props.largeVideoVisible === true;
    } else {
        gsap.set(largeCasterVideoWrapper.value.querySelector('.large-caster-video'), { height: '0%', opacity: 0 });
    }

    watch(() => props.largeVideoVisible, newValue => {
        if (breakScreenStore.activeBreakScene === 'analysts') {
            const tl = gsap.timeline({
                onComplete: () => {
                    markCastersSmall.value = newValue;
                    markCastersResizing.value = false;
                }
            });
            const state = Flip.getState(castersLayout.value!.querySelectorAll('.caster-display-wrapper'), { simple: true });
            if (newValue) {
                castersLayout.value!.classList.add('alt-layout');
            } else {
                castersLayout.value!.classList.remove('alt-layout');
            }

            markCastersResizing.value = true;
            if (newValue) {
                tl
                    .addLabel('casters-size-change')
                    .addLabel('video-show-hide', '+=0.6');
            } else {
                tl
                    .addLabel('video-show-hide')
                    .addLabel('casters-size-change', '+=0.6');
            }

            tl
                .to(largeCasterVideoWrapper.value.querySelector('.large-caster-video'), {
                    opacity: newValue ? 1 : 0,
                    duration: 0.05,
                    ease: 'none',
                    delay: newValue ? 0 : 0.45
                }, 'video-show-hide')
                .to(largeCasterVideoWrapper.value.querySelector('.large-caster-video'), {
                    height: newValue ? '100%' : '0%',
                    duration: 0.5,
                    ease: newValue ? 'power2.out' : 'power2.in'
                }, 'video-show-hide')
                .to(castersLayout.value!.querySelectorAll('.caster-display'), {
                    scale: newValue ? 0.5 : 1,
                    delay: newValue ? 0 : 0.25,
                    ease: 'power2.inOut',
                    duration: 0.5
                }, 'casters-size-change')
                .to(castersLayout.value!.querySelectorAll('.caster-name'), {
                    scale: newValue ? 1.6 : 1,
                    delay: newValue ? 0 : 0.25,
                    ease: 'power2.inOut',
                    duration: 0.5
                }, 'casters-size-change')
                .fromTo(castersLayout.value!.querySelectorAll('.caster-twitter'), {
                    opacity: newValue ? 1 : 0
                }, {
                    opacity: newValue ? 0 : 1,
                    x: newValue ? -100 : 0,
                    delay: newValue ? 0 : 0.25,
                    ease: 'power2.inOut',
                    duration: 0.5
                }, 'casters-size-change')
                .add(Flip.from(state, {
                    duration: 0.75,
                    ease: 'power2.inOut',
                    absolute: '.caster-display-wrapper'
                }), 'casters-size-change')
                .to(castersLayout.value!, {
                    x: newValue ? -700 : 0,
                    ease: 'power2.inOut',
                    duration: 0.75
                }, 'casters-size-change');
        } else {
            markCastersSmall.value = newValue;
            gsap.set(castersLayout.value!, { x: newValue ? -700 : 0 });
            if (newValue) {
                castersLayout.value!.classList.add('alt-layout');
            } else {
                castersLayout.value!.classList.remove('alt-layout');
            }
        }
    });
});

const beforeEnter = (elem: HTMLElement) => {
    gsap.set(elem.querySelectorAll('.caster-line-color, .caster-line-white'), { drawSVG: '0%' });
    if (props.largeVideoVisible) {
        gsap.set(elem.querySelectorAll('.caster-name'), { scale: 1.6 });
    }
    gsap.set(elem.querySelectorAll('.caster-name, .caster-twitter'), { opacity: 0, x: -100 });
    gsap.set(elem.querySelectorAll('.caster-details > .background'), { opacity: 0 });
    gsap.set(elem.querySelectorAll('.caster-visual'), { y: '-101%' });
    gsap.set(elem.querySelector('.large-caster-video'), { height: '0%', opacity: 0 });
};

const enter = (elem: HTMLElement, done: gsap.Callback) => {
    const tl = gsap.timeline({ onComplete: done });

    tl.addLabel('sceneIn');
    if (props.largeVideoVisible) {
        tl.to(elem.querySelector('.large-caster-video'), {
            opacity: 1,
            duration: 0.05,
            ease: 'none'
        }, 'sceneIn');
        tl.to(elem.querySelector('.large-caster-video'), {
            height: '100%',
            duration: 0.5,
            ease: 'power2.out'
        }, 'sceneIn');
    }
    tl
        .to(
            elem.querySelectorAll('.caster-line-color, .caster-line-white'),
            {
                drawSVG: '100%',
                duration: 1,
                stagger: (index, _, list) => Math.floor(index / 2) / (list.length / 2 - 1),
                ease: 'power2.inOut'
            },
            'sceneIn')
        .to(
            elem.querySelectorAll('.caster-details > .background'),
            {
                opacity: 1,
                stagger: { amount: 1 }
            },
            'sceneIn')
        .to(
            elem.querySelectorAll(props.largeVideoVisible === true ? '.caster-name' : '.caster-name, .caster-twitter'),
            {
                opacity: 1,
                x: 0,
                duration: 0.65,
                delay: (_, target) => target.classList.contains('caster-name') ? 0.9 : 1.1,
                stagger: props.largeVideoVisible ? { amount: 1 } : (index, _, list) => Math.floor(index / 2) / (list.length / 2 - 1),
                ease: 'power2.out'
            },
            'sceneIn')
        .to(
            elem.querySelectorAll('.caster-visual'),
            {
                y: 0,
                delay: 0.5,
                stagger: { amount: 1 },
                ease: 'power2.out'
            },
            'sceneIn');

    return tl;
};

const leave = (elem: HTMLElement, done: gsap.Callback) => {
    const tl = gsap.timeline({ onComplete: done });

    tl.addLabel('sceneOut');
    if (props.largeVideoVisible) {
        tl.to(elem.querySelector('.large-caster-video'), {
            opacity: 0,
            duration: 0.05,
            ease: 'none',
            delay: 0.45
        }, 'sceneOut');
        tl.to(elem.querySelector('.large-caster-video'), {
            height: '0%',
            duration: 0.5,
            ease: 'power2.in'
        }, 'sceneOut');
    }
    const staggerMultiplier = props.largeVideoVisible === true ? -1 : 1;
    tl
        .to(
            elem.querySelectorAll('.caster-line-color, .caster-line-white'),
            {
                drawSVG: '0%',
                duration: 1,
                stagger: (index, _, list) => Math.floor(index / 2) / (list.length / 2 - 1) * staggerMultiplier,
                delay: 0.5,
                ease: 'power2.inOut'
            },
            'sceneOut')
        .to(
            elem.querySelectorAll('.caster-details > .background'),
            {
                opacity: 0,
                stagger: { amount: 1 * staggerMultiplier },
                delay: 0.5
            },
            'sceneOut')
        .to(
            elem.querySelectorAll('.caster-name, .caster-twitter'),
            {
                opacity: 0,
                x: 100,
                duration: 0.65,
                delay: (index, target) => target.classList.contains('caster-name') ? 0 : 0.2,
                stagger: props.largeVideoVisible ? { amount: 1 * staggerMultiplier } : (index, _, list) => Math.floor(index / 2) / (list.length / 2 - 1) * staggerMultiplier,
                ease: 'power2.in'
            },
            'sceneOut')
        .to(
            elem.querySelectorAll('.caster-visual'),
            {
                y: '101%',
                stagger: { amount: 1 * staggerMultiplier },
                ease: 'power2.in'
            },
            'sceneOut');

    return tl;
};

provideTransitions(props.largeVideoVisible != null ? 'break-analysts' : 'break-casters', null, { beforeEnter, enter, leave });
</script>

<style scoped lang="scss">
@use '../../../../styles/background';
@use 'sass:math';

.casters-wrapper {
    position: absolute;
    top: 225px;
}

.large-caster-video-wrapper {
    position: absolute;
    width: 1280px;
    aspect-ratio: 16 / 9;
    right: 140px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
    display: flex;
    align-items: center;
}

.large-caster-video {
    @include background.background();

    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    will-change: height, opacity;

    > * {
        width: 1280px;
        height: math.div(1280px, math.div(16, 9));
    }
}

.casters-layout {
    width: 1500px;
    height: 825px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-flow: row;
    grid-auto-rows: 1fr;
    align-items: center;

    &:deep(.caster-display-wrapper.small .caster-display) {
        transform: scale(0.5, 0.5);
    }

    &:deep(.caster-display-wrapper.small .caster-twitter) {
        opacity: 0;
        transform: translate(-100px, 0);
    }

    &:deep(.caster-display-wrapper.small:not(.resizing) .caster-twitter) {
        visibility: hidden;
    }

    &:deep(.caster-display-wrapper.small .caster-name) {
        transform: scale(1.6, 1.6);
    }

    &.alt-layout {
        grid-template-columns: 1fr;

        > * {
            flex-basis: 100%;

            &.span-two {
                grid-column: unset;
            }
        }
    }

    > * {
        flex-basis: 50%;
        overflow: hidden;

        &.span-two {
            grid-column: span 2;
        }
    }
}
</style>
