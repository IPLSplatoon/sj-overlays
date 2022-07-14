<template>
    <div style="display: contents">
        <transition
            mode="out-in"
            :css="false"
            @enter="enter"
            @leave="leave"
            @before-enter="beforeEnter"
        >
            <fitted-content
                :key="value"
                :max-width="maxWidth"
            >
                {{ value }}
            </fitted-content>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import FittedContent from './FittedContent.vue';

export default defineComponent({
    name: 'SplitTextTransition',

    components: { FittedContent },

    props: {
        value: {
            type: String,
            default: null
        },
        maxWidth: {
            type: Number,
            required: true
        }
    },

    setup(props) {
        const splitText = ref<SplitText>();

        function createSplitText(elem: HTMLElement): void {
            splitText.value = new SplitText(elem, { type: 'words' });
        }

        return {
            beforeEnter: (elem: HTMLElement) => {
                if (!props.value) return;
                createSplitText(elem);
                return gsap.set(splitText.value.words, { y: 100 });
            },
            enter: (elem: HTMLElement, done: gsap.Callback) => {
                if (!props.value) return;
                return gsap.to(splitText.value.words, { y: 0, duration: 0.5, stagger: { amount: 0.1 }, ease: 'power2.out', onComplete: done });
            },
            leave: (elem: HTMLElement, done: gsap.Callback) => {
                createSplitText(elem);
                return gsap.to(splitText.value.words, { y: 100, duration: 0.5, stagger: { amount: 0.1 }, ease: 'power2.in', onComplete: done });
            }
        };
    }
});
</script>
