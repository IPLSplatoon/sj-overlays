<template>
    <div class="casters-wrapper w-max layout horiz c-horiz">
        <div class="casters-layout">
            <caster-display
                v-for="(caster, id) in casterStore.casters"
                :key="id"
                :caster="caster"
                :width="casterWidth"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { provideTransitions } from '../../../../helpers/transition';
import { useCasterStore } from 'client-shared/store/casterStore';
import CasterDisplay from './CasterDisplay.vue';
import { computed } from 'vue';

const casterStore = useCasterStore();
const casterWidth = computed(() => {
    switch (Object.keys(casterStore.casters).length) {
        case 1:
            return 1000;
        case 2:
            return 700;
        default:
            return 500;
    }
});

const beforeEnter = (elem: HTMLElement) => {
    gsap.set(elem.querySelectorAll('.caster-line-color, .caster-line-white'), { drawSVG: '0%' });
    gsap.set(elem.querySelectorAll('.caster-name, .caster-twitter'), { opacity: 0, x: -100 });
    gsap.set(elem.querySelectorAll('.caster-details > .background'), { opacity: 0 });
    gsap.set(elem.querySelectorAll('.caster-visual'), { y: '-100%' });
};

const enter = (elem: HTMLElement, done: gsap.Callback) => {
    const tl = gsap.timeline({ onComplete: done });

    tl.addLabel('sceneIn');
    tl
        .to(
            elem.querySelectorAll('.caster-line-color, .caster-line-white'),
            {
                drawSVG: '100%',
                duration: 1,
                stagger: index => Math.floor(index / 2) * 0.5,
                ease: 'power2.inOut'
            },
            'sceneIn')
        .to(
            elem.querySelectorAll('.caster-details > .background'),
            {
                opacity: 1,
                stagger: 0.5
            },
            'sceneIn')
        .to(
            elem.querySelectorAll('.caster-name, .caster-twitter'),
            {
                opacity: 1,
                x: 0,
                duration: 0.65,
                delay: (index, target) => target.classList.contains('caster-name') ? 0.9 : 1.1,
                stagger: index => Math.floor(index / 2) * 0.5,
                ease: 'power2.out'
            },
            'sceneIn')
        .to(
            elem.querySelectorAll('.caster-visual'),
            {
                y: 0,
                delay: 0.5,
                stagger: 0.5,
                ease: 'power2.out'
            },
            'sceneIn');

    return tl;
};

const leave = (elem: HTMLElement, done: gsap.Callback) => {
    const tl = gsap.timeline({ onComplete: done });

    tl.addLabel('sceneOut');
    tl
        .to(
            elem.querySelectorAll('.caster-line-color, .caster-line-white'),
            {
                drawSVG: '0%',
                duration: 1,
                stagger: index => Math.floor(index / 2) * 0.5,
                delay: 0.5,
                ease: 'power2.inOut'
            },
            'sceneOut')
        .to(
            elem.querySelectorAll('.caster-details > .background'),
            {
                opacity: 0,
                stagger: 0.5,
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
                stagger: index => Math.floor(index / 2) * 0.5,
                ease: 'power2.in'
            },
            'sceneOut')
        .to(
            elem.querySelectorAll('.caster-visual'),
            {
                y: '100%',
                stagger: 0.5,
                ease: 'power2.in'
            },
            'sceneOut');

    return tl;
};

provideTransitions('break', null, { beforeEnter, enter, leave });
</script>

<style scoped lang="scss">
.casters-wrapper {
    position: absolute;
    top: 225px;
}

.casters-layout {
    width: 1500px;
    height: 825px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    > * {
        flex-basis: 50%;
    }
}
</style>
