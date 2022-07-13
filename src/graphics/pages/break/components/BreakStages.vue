<template>
    <div id="stages-scene">stage</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import gsap from 'gsap';

export default defineComponent({
    name: 'BreakStages',

    setup() {
        return {
            beforeEnter: (elem: HTMLElement) => {
                gsap.set(elem, { y: -10, opacity: 0 });
            },
            enter: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem, { y: 0, opacity: 1, onComplete: done, duration: 0.35 });
            },
            leave: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem, { y: 10, opacity: 0, onComplete: done, duration: 0.35 });
            }
        };
    }
});
</script>
