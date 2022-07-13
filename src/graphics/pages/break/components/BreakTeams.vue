<template>
    <div>team</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import gsap from 'gsap';

export default defineComponent({
    name: 'BreakTeams',

    setup() {
        return {
            beforeEnter: (elem: HTMLElement) => {
                gsap.set(elem, { opacity: 0 });
            },
            enter: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem, { opacity: 1, onComplete: done, duration: 0.35 });
            },
            leave: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem, { opacity: 0, onComplete: done, duration: 0.35 });
            }
        };
    }
});
</script>
