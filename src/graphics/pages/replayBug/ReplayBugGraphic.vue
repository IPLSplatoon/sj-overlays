<template>
    <div
        ref="wrapper"
        class="replay-bug-wrapper"
    >
        <div
            class="replay-bug"
            :style="{ width: `${width}px`, height: `${height}px` }"
        >
            <svg
                class="replay-bug-line"
                :width="width + linePathPadding * 2"
                height="1000"
                :viewBox="`0 -${linePathPadding} ${width} 1000`"
            >
                <path
                    fill="transparent"
                    class="line-color"
                    :d="replayBugLinePath"
                />
                <path
                    fill="transparent"
                    class="line-white"
                    :d="replayBugLinePath"
                />
            </svg>
            <div class="background" />
            <div class="content">
                <div class="text">Replay</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import * as d3 from 'd3';
import gsap from 'gsap';
import { bindEntranceToTimeline } from '../../helpers/obs';

const width = 325;
const height = 125;
const linePathPadding = 10;
const linePathRadius = 10;
const wrapper = ref<HTMLDivElement>(null);

const replayBugLinePath = computed(() => {
    const path = d3.path();
    path.moveTo(0, 0);
    path.lineTo(width - linePathRadius, 0);
    path.arc(width - linePathRadius, linePathRadius, linePathRadius, Math.PI * 1.5, 0);
    path.lineTo(width, height - linePathRadius - 25);
    path.arc(width - linePathRadius, height - 25, linePathRadius, 0, Math.PI * 0.5);
    path.lineTo(35, (height + linePathRadius) - 25);
    path.arc(35, height - 5, linePathRadius,Math.PI * 1.5, Math.PI, true);
    path.lineTo(25, height + 10);

    return path.toString();
});

onMounted(() => {
    const revealTl = gsap.timeline();
    revealTl
        .fromTo(
            wrapper.value?.querySelectorAll('.line-color, .line-white'),
            { drawSVG: '0%' },
            { drawSVG: '100%', duration: 1, ease: 'power1.inOut' }, 'reveal')
        .fromTo(
            wrapper.value?.querySelector('.background'),
            { opacity: 0 },
            { opacity: 1, duration: 0.55, ease: 'none' }, 'reveal+=0.5')
        .fromTo(
            wrapper.value?.querySelector('.text'),
            { y: 65, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' }, 'reveal+=0.75');

    bindEntranceToTimeline(revealTl);
});

</script>

<style scoped lang="scss">
@use 'sass:color';
@use '../../styles/constants';
@use '../../styles/background';

.replay-bug-wrapper {
    position: absolute;
    bottom: 25px;
    left: 0;
}

.replay-bug {
    position: relative;

    > .background {
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 105px;
        background: radial-gradient(ellipse 100% 120% at 260px 45px, color.change(constants.$background, $alpha: 0.8) 85%, transparent 100%);
    }

    > .content {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 105px;
        overflow: hidden;
    }

    .text {
        font-weight: 700;
        font-size: 48px;
    }
}

.replay-bug-line {
    position: absolute;
    top: -10px;
    left: -10px;
    z-index: 2;

    .line-color {
        filter: drop-shadow(0 0 3px constants.$blue) drop-shadow(0 0 5px constants.$blue);
        stroke: constants.$blue;
        stroke-width: 5px;
        stroke-linecap: round;
    }

    .line-white {
        stroke: #fff;
        stroke-width: 3px;
        stroke-linecap: round;
    }
}
</style>
