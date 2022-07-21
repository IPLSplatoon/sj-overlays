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
import { provideTransitions } from '../helpers/transition';

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
        },
        transitionKey: {
            type: String,
            default: null
        },
        transitionSelector: {
            type: String,
            default: null
        }
    },

    setup(props) {
        const splitText = ref<SplitText>();

        function createSplitText(elem: HTMLElement): void {
            splitText.value = new SplitText(elem, { type: 'words' });
        }

        const beforeEnter = (elem: HTMLElement) => {
            if (!props.value) return;
            createSplitText(elem);
            return gsap.set(splitText.value.words, { y: 100 });
        };

        const enter = (elem: HTMLElement, done: gsap.Callback) => {
            if (!props.value || !splitText.value) return;

            const tl = gsap.timeline({ onComplete: done });
            tl.to(splitText.value.words, { y: 0, duration: 0.5, stagger: { amount: 0.1 }, ease: 'power2.out' });
            return tl;
        };

        const leave = (elem: HTMLElement, done: gsap.Callback) => {
            createSplitText(elem);

            const tl = gsap.timeline({ onComplete: done });
            tl.to(splitText.value.words, { y: 100, duration: 0.5, stagger: { amount: 0.1 }, ease: 'power2.in' });
            return tl;
        };

        if (props.transitionKey != null && props.transitionSelector != null) {
            provideTransitions(props.transitionKey, `${props.transitionSelector} div`, { beforeEnter, enter, leave });
        }

        return {
            beforeEnter,
            enter,
            leave
        };
    }
});
</script>
