<template>
    <transition
        mode="out-in"
        @enter="scoreCounterEnter"
        @leave="scoreCounterLeave"
        @before-enter="beforeScoreCounterEnter"
    >
        <fitted-content
            :key="value"
            :max-width="maxWidth"
            align="center"
        >
            {{ value }}
        </fitted-content>
    </transition>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import gsap from 'gsap';
import FittedContent from './FittedContent.vue';

export default defineComponent({
    name: 'ScoreCounter',

    components: { FittedContent },

    props: {
        value: {
            type: Number,
            required: true
        },
        maxWidth: {
            type: Number,
            default: 40
        }
    },

    setup(props) {
        const oldValue = ref<number>(null);

        return {
            scoreCounterEnter: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem, { duration: 0.35, y: 0, ease: 'power2.out', onComplete: done });
            },
            beforeScoreCounterEnter: (elem: HTMLElement) => {
                gsap.set(elem, { y: props.value > oldValue.value ? -50 : 50 });
                oldValue.value = props.value;
            },
            scoreCounterLeave: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem, { duration: 0.35, y: props.value > oldValue.value ? 50 : -50, ease: 'power2.in', onComplete: done });
            }
        };
    }
});
</script>
