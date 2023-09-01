<template>
    <transition
        @enter="castersEnter"
        @leave="castersLeave"
        @before-enter="beforeCastersEnter"
    >
        <div
            v-if="castersVisible"
            class="casters-wrapper"
        >
            <svg
                width="397"
                height="228"
                viewBox="0 0 397 228"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="element-line-svg"
            >
                <path
                    class="casters-line"
                    d="M403.5 0.999939H5C2.79086 0.999939 1 2.7908 1 4.99994V40.6984C1 42.9076 2.79086 44.6984 5 44.6984H354.5C356.709 44.6984 358.5 46.4893 358.5 48.6984V223C358.5 225.209 356.709 227 354.5 227H5C2.79086 227 1 225.209 1 223V63.4029"
                    stroke-linecap="round"
                    style="fill:none;stroke:#5FBFF9;stroke-width:4px;"
                />
                <path
                    class="casters-line"
                    d="M403.5 0.999939H5C2.79086 0.999939 1 2.7908 1 4.99994V40.6984C1 42.9076 2.79086 44.6984 5 44.6984H354.5C356.709 44.6984 358.5 46.4893 358.5 48.6984V223C358.5 225.209 356.709 227 354.5 227H5C2.79086 227 1 225.209 1 223V63.4029"
                    stroke-linecap="round"
                    style="fill:none;stroke:#fff;stroke-width:2px;"
                />
            </svg>
            <div class="title layout horiz c-vert">
                <font-awesome-icon
                    icon="microphone"
                    class="icon"
                /><span class="text">Commentators</span>
                <div class="background title-background" />
            </div>
            <div class="content layout vertical c-vert">
                <div class="background casters-background" />
                <div
                    v-for="(caster, key) in casters"
                    :key="key"
                    class="caster"
                >
                    <fitted-content
                        class="name"
                        :max-width="323"
                    >
                        {{ caster.name }}
                    </fitted-content>
                    <fitted-content
                        :max-width="323"
                        class="extra"
                    >
                        {{ caster.twitter }}
                        <badge>{{ caster.pronouns }}</badge>
                    </fitted-content>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import gsap from 'gsap';
import { DASHBOARD_BUNDLE_NAME } from '../../../helpers/constants';
import FittedContent from '../../../components/FittedContent.vue';
import Badge from '../../../components/Badge.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons/faMicrophone';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useCasterStore } from '../../../store/casterStore';

library.add(faMicrophone);

export default defineComponent({
    name: 'Casters',

    components: { Badge, FittedContent, FontAwesomeIcon },

    setup() {
        const casterStore = useCasterStore();
        const castersVisible = ref(false);

        nodecg.listenFor('mainShowCasters', DASHBOARD_BUNDLE_NAME, () => {
            if (!castersVisible.value) {
                castersVisible.value = true;

                setTimeout(() => {
                    castersVisible.value = false;
                }, 15 * 1000);
            }
        });

        return {
            casters: computed(() => casterStore.casters),
            castersVisible,

            castersEnter: (elem: HTMLElement, done: gsap.Callback) => {
                const tl = gsap.timeline({ onComplete: done });
                tl.addLabel('lineIn').addLabel('textIn', '+=0.45');

                tl
                    .to(elem.querySelectorAll('.casters-line'),
                        { duration: 1, drawSVG: true, ease: 'power1.inOut' },
                        'lineIn')
                    .to(elem.querySelectorAll('.background'),
                        { duration: 0.6, opacity: 1, x: 0, ease: 'power2.out', delay: 0.8 },
                        'lineIn')
                    .to(elem.querySelectorAll('.caster'),
                        { x: 0, opacity: 1, duration: 0.65, ease: 'power2.out', stagger: 0.1, delay: 0.25 },
                        'textIn')
                    .to(elem.querySelectorAll('.title > .icon, .title > .text'),
                        { x: 0, opacity: 1, duration: 0.65, ease: 'power2.out', stagger: 0.1, delay: 0.25 },
                        'textIn');
            },
            beforeCastersEnter: (elem: HTMLElement) => {
                gsap.set(elem.querySelectorAll('.casters-line'), { drawSVG: '0% 0%' });
                gsap.set(elem.querySelectorAll('.caster'), { x: 100, opacity: 0 });
                gsap.set(elem.querySelector('.casters-background'), { opacity: 0 });
                gsap.set(elem.querySelector('.title-background'), { opacity: 0, x: -100 });
                gsap.set(elem.querySelectorAll('.title > .icon, .title > .text'), { opacity: 0, x: 50 });
            },
            castersLeave: (elem: HTMLElement, done: gsap.Callback) => {
                const tl = gsap.timeline({ onComplete: done });
                tl.addLabel('textOut').addLabel('lineOut', '+=0.35');

                tl
                    .to(elem.querySelectorAll('.casters-line'),
                        { duration: 1, drawSVG: '0% 0%', ease: 'power1.inOut' },
                        'lineOut')
                    .to(elem.querySelector('.casters-background'),
                        { duration: 0.6, opacity: 0, ease: 'power2.in' },
                        'textOut')
                    .to(elem.querySelector('.title-background'),
                        { duration: 0.6, opacity: 0, x: -100, ease: 'power2.in' },
                        'textOut')
                    .to(elem.querySelectorAll('.caster'),
                        { x: 100, opacity: 0, duration: 0.65, ease: 'power2.in', stagger: 0.1 },
                        'textOut')
                    .to(elem.querySelectorAll('.title > .icon, .title > .text'),
                        { x: 50, opacity: 0, duration: 0.65, ease: 'power2.in', stagger: -0.1 },
                        'textOut');
            }
        };
    }
});
</script>

<style lang="scss">
@import '../../../styles/constants';
@import '../../../styles/glow';

.casters-wrapper {
    position: absolute;
    right: 0;
    bottom: 75px;
    width: 397px;
    height: 228px;

    > svg {
        @include svg-glow();
        z-index: 10;
        position: absolute;
    }

    .title {
        padding-left: 12px;
        height: 42px;
        margin-top: 2px;
        position: relative;
        overflow: hidden;

        .text {
            font-size: 27px;
            z-index: 5;
            margin-left: 7px;
        }

        .icon {
            filter: drop-shadow(0 0 4px $salmon);
            margin: 0 5px;
            z-index: 5;
        }

        .background {
            position: absolute;
            width: 90%;
            height: 100%;
            left: 0;
            z-index: 4;
            background: linear-gradient(90deg, rgba(63, 20, 80, 0.8) 80.62%, rgba(63, 20, 80, 0) 100%);
        }
    }

    .content {
        height: 182px;
        margin: 0 3px;
        width: 353px;
        position: relative;
        overflow: hidden;

        .background {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            background: linear-gradient(291.44deg, rgba(63, 20, 80, 0.8) 85.01%, rgba(63, 20, 80, 0.36) 93.62%, rgba(63, 20, 80, 0) 99.15%);
        }

        .caster {
            margin: 8px 15px 0;

            .name {
                font-size: 34px;
                font-weight: 800;
                line-height: 28px;
            }

            .extra {
                font-size: 26px;
                font-weight: 500;
            }
        }
    }
}
</style>
