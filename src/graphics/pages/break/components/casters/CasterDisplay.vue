<template>
    <div
        class="caster-display-wrapper layout vertical c-horiz"
        :class="`caster-count-${casterCount}`"
    >
        <div
            class="caster-display"
            :style="{ width: `${width}px` }"
        >
            <svg
                class="caster-line"
                :width="width + linePathPadding * 2"
                height="1000"
                :viewBox="`0 -${linePathPadding} ${width} 1000`"
            >
                <path
                    fill="transparent"
                    class="caster-line-color"
                    :d="casterLinePath"
                />
                <path
                    fill="transparent"
                    class="caster-line-white"
                    :d="casterLinePath"
                />
            </svg>
            <div
                class="caster-visual-wrapper"
                :style="{ height: `${visualHeight}px` }"
            >
                <div class="caster-visual layout c-horiz c-vert">
                    <image-loader
                        v-if="isBlank(caster.videoUrl)"
                        class="caster-image"
                        :src="caster.imageUrl"
                        default-src="/bundles/sj-overlays/assets/caster-image-placeholder.webp"
                    />
                    <video-loader
                        v-else
                        :src="caster.videoUrl"
                        class="caster-video"
                    />
                </div>
            </div>
            <div class="caster-details">
                <div class="background" />
                <opacity-swap-transition>
                    <div
                        :key="`${caster.name}_${caster.pronouns}`"
                        class="caster-name"
                    >
                        {{ caster.name }} <badge>{{ caster.pronouns }}</badge>
                    </div>
                </opacity-swap-transition>
                <opacity-swap-transition>
                    <div
                        :key="caster.twitter"
                        class="caster-twitter"
                    >
                        {{ caster.twitter }}
                    </div>
                </opacity-swap-transition>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Caster } from 'schemas';
import { computed } from 'vue';
import { useCasterStore } from 'client-shared/store/casterStore';
import { isBlank } from '../../../../helpers/string';
import ImageLoader from '../../../../components/ImageLoader.vue';
import VideoLoader from '../../../../components/VideoLoader.vue';
import Badge from '../../../../components/Badge.vue';
import OpacitySwapTransition from '../../../../components/OpacitySwapTransition.vue';
import * as d3 from 'd3';

const casterStore = useCasterStore();
const casterCount = computed(() => Object.keys(casterStore.casters).length);

const props = defineProps<{
    caster: Caster
    width: number
}>();

const visualHeight = computed(() => props.width * (9 / 16));
const linePathPadding = 10;
const linePathRadius = 10;
const casterLinePath = computed(() => {
    const path = d3.path();
    path.moveTo(0, 0);
    path.lineTo(props.width - linePathRadius, 0);
    path.arc(props.width - linePathRadius, linePathRadius, linePathRadius,Math.PI * 1.5, 0);
    path.lineTo(props.width, visualHeight.value - linePathRadius);
    path.arc(props.width - linePathRadius, visualHeight.value - linePathRadius, linePathRadius, 0, Math.PI * 0.5);
    path.lineTo(linePathRadius, visualHeight.value);
    path.arc(linePathRadius, visualHeight.value + linePathRadius, linePathRadius, Math.PI * 1.5, Math.PI, true);
    path.lineTo(0, visualHeight.value + 100);

    return path.toString();
});

</script>

<style scoped lang="scss">
@use 'sass:color';
@use '../../../../styles/constants';
@use '../../../../styles/background';

.caster-display-wrapper {
    padding: 16px;
    box-sizing: border-box;
}

.caster-display {
    position: relative;
}

.caster-details {
    padding: 10px 16px 0 20px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;

    > .background {
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        background: radial-gradient(ellipse 100% 120% at 25px 25px, color.change(constants.$background, $alpha: 0.8) 50%, transparent 100%);
    }
}

.caster-name {
    font-weight: 700;
    font-style: italic;
    font-size: 40px;
}

.caster-twitter {
    font-weight: 300;
    margin-top: -6px;
}

.caster-line {
    position: absolute;
    top: -10px;
    left: -10px;
    z-index: 2;

    .caster-line-color {
        filter: drop-shadow(0 0 3px constants.$blue) drop-shadow(0 0 5px constants.$blue);
        stroke: constants.$blue;
        stroke-width: 5px;
        stroke-linecap: round;
    }

    .caster-line-white {
        stroke: #fff;
        stroke-width: 3px;
        stroke-linecap: round;
    }
}

.caster-visual-wrapper {
    overflow: hidden;
}

.caster-visual {
    @include background.background(0px);

    height: 100%;
    width: 100%;

    .caster-image {
        width: 175px;
        height: 175px;
        border-radius: 9999px;
        overflow: hidden;
        filter: drop-shadow(0 0 5px constants.$blue);
    }

    .caster-video {
        width: 100%;
        height: 100%;
    }
}
</style>
