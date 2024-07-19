<template>
    <div class="stats-cell glow-border glow-blue">
        <div class="header layout vertical c-horiz">
            <split-text-transition
                :max-width="540"
                :value="cell.title"
                class="title"
            />
            <div class="separator" />
            <transition
                mode="out-in"
                :css="false"
                @enter="subtitleEnter"
                @leave="subtitleLeave"
                @before-enter="beforeSubtitleEnter"
            >
                <div
                    v-if="cell.subtitle"
                    class="subtitle-wrapper layout vertical c-horiz"
                >
                    <fitted-content
                        class="subtitle"
                        :max-width="540"
                        align="center"
                    >
                        {{ cell.subtitle }}
                    </fitted-content>
                    <div class="subtitle-separator" />
                </div>
            </transition>
            <opacity-swap-transition>
                <stats-list
                    v-if="cell.displayType === 'SINGLE_STAT_LIST' || cell.displayType === 'MULTI_STAT_LIST'"
                    :cell="cell"
                />
                <stats-bar-chart
                    v-else-if="cell.displayType === 'SINGLE_STAT_BAR_CHART'"
                    :cell="cell"
                />
            </opacity-swap-transition>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { DataCell } from 'relay-nodecg-connector';
import FittedContent from '../../../components/FittedContent.vue';
import StatsList from './StatsList.vue';
import StatsBarChart from './StatsBarChart.vue';
import OpacitySwapTransition from '../../../components/OpacitySwapTransition.vue';
import SplitTextTransition from '../../../components/SplitTextTransition.vue';
import gsap from 'gsap';

export default defineComponent({
    name: 'StatsCell',

    components: { OpacitySwapTransition, StatsBarChart, StatsList, FittedContent, SplitTextTransition },

    props: {
        cell: {
            type: Object as PropType<DataCell>,
            required: true
        }
    },

    setup() {
        return {
            beforeSubtitleEnter: (elem: HTMLElement) => {
                gsap.set(elem, { height: 0 });
            },
            subtitleEnter: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem, { height: 54, ease: 'power2.inOut', onComplete: done });
            },
            subtitleLeave: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem, { height: 0, ease: 'power2.inOut', onComplete: done });
            }
        };
    }
});
</script>

<style lang="scss">
@use '../../../styles/background';
@use '../../../styles/constants';
@use '../../../styles/glow';

.stats-cell {
    @include background.background();

    $padding: 10px;
    width: calc(100% - $padding * 2);
    height: calc(100% - $padding * 2);
    padding: $padding;
    overflow: hidden;

    .header {
        .title {
            width: 100%;
            margin: 8px 0;
            font-size: 40px;
            font-weight: bold;
            font-style: italic;
        }

        .separator {
            @include glow.line-glow(constants.$blue);
            width: 90%;
            height: 2px;
            margin-bottom: 8px;
        }

        .subtitle-wrapper {
            overflow: hidden;

            .subtitle {
                padding: 0 8px;
                text-align: center;
                width: 100%;
                font-size: 35px;
                font-style: italic;
                margin-bottom: 4px;
            }

            .subtitle-separator {
                @include glow.line-glow(constants.$orange);
                width: 100%;
                height: 1px;
                margin-bottom: 8px;
            }
        }
    }
}
</style>
