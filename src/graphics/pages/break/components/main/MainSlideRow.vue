<template>
    <transition
        mode="out-in"
        :css="false"
        @enter="enter"
        @leave="leave"
        @before-enter="beforeEnter"
    >
        <div
            v-if="isVisible"
            class="main-slide-row layout horiz c-vert"
            :class="{ 'has-second-row': !!secondRow }"
        >
            <i
                v-if="isCustomIcon"
                :class="['icon', icon]"
            />
            <font-awesome-icon
                v-else
                :icon="icon"
                class="icon"
            />
            <div class="layout vertical">
                <slide-transition>
                    <fitted-content
                        :key="firstRow"
                        :max-width="830"
                    >
                        <slot>
                            {{ firstRow }}
                        </slot>
                    </fitted-content>
                </slide-transition>
                <slide-transition>
                    <fitted-content
                        v-if="secondRow"
                        :key="secondRow"
                        :max-width="830"
                    >
                        <slot name="second-row">
                            {{ secondRow }}
                        </slot>
                    </fitted-content>
                </slide-transition>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import FittedContent from '../../../../components/FittedContent.vue';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import SlideTransition from '../../../../components/SlideTransition.vue';

export default defineComponent({
    name: 'MainSlideRow',

    components: { SlideTransition, FittedContent, FontAwesomeIcon },

    props: {
        icon: {
            type: [String, Array] as PropType<string | string[]>,
            required: true
        },
        isCustomIcon: {
            type: Boolean,
            default: false
        },
        firstRow: {
            type: String,
            default: null
        },
        secondRow: {
            type: [String, Boolean] as PropType<string | boolean>,
            default: false
        },
        isVisible: {
            type: Boolean,
            default: true
        }
    },

    setup(props) {
        return {
            beforeEnter: (elem: HTMLElement) => {
                gsap.set(elem, { opacity: 0, height: 0, margin: '0 0' });
            },
            enter: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem, {
                    duration: 0.5,
                    opacity: 1,
                    height: props.secondRow ? 90 : 54,
                    margin: '8px 0',
                    ease: 'power2.inOut',
                    onComplete: done
                });
            },
            leave: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem, {
                    duration: 0.5,
                    opacity: 0,
                    height: 0,
                    margin: '0 0',
                    ease: 'power2.inOut',
                    onComplete: done
                });
            }
        };
    }
});
</script>

<style lang="scss">
.main-slide-row {
    margin: 8px 0;
    overflow: hidden;
    height: 54px;

    .icon {
        margin-right: 15px;
        font-size: 45px;
        filter: drop-shadow(0 0 3px white);
        width: 55px;
        text-align: center;
    }

    .fitted-content-wrapper, div {
        font-size: 40px;
        font-weight: 400;
    }

    &.has-second-row {
        height: 96px;

        .fitted-content-wrapper {
            height: 48px;
        }
    }
}
</style>
