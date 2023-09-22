<template>
    <transition
        name="slide"
        mode="out-in"
        :css="false"
        @enter="enter"
        @leave="leave"
        @before-enter="beforeEnter"
    >
        <slot />
    </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import gsap from 'gsap';

export default defineComponent({
    name: 'SlideTransition',

    setup() {
        return {
            beforeEnter: (elem: HTMLElement) => {
                gsap.set(elem, { x: -15, opacity: 0 });
            },
            enter: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem, { opacity: 1, x: 0, ease: 'power2.out', onComplete: done, duration: 0.35 });
            },
            leave: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem, { opacity: 0, x: 15, ease: 'power2.in', onComplete: done, duration: 0.35 });
            }
        };
    }
});
</script>
