<template>
    <div
        ref="wrapper"
        class="bracket-wrapper"
    />
    <icon-background :animate-on-entrance="false" />
</template>

<script setup lang="ts">
import { useBracketDataStore } from 'client-shared/store/bracketDataStore';
import { BracketRenderer } from '@tourneyview/renderer';
import { Match } from '@tourneyview/common';
import { onMounted, ref, watch } from 'vue';
import IconBackground from '../../components/IconBackground.vue';
import { SJBracketAnimator } from './SJBracketAnimator';
import * as d3 from 'd3';
import { BaseType, HierarchyNode } from 'd3';

function createCellBorders(selection: d3.Selection<BaseType, d3.HierarchyNode<Match>, HTMLDivElement, unknown>) {
    selection.each(function() {
        const nodeSize = {
            height: (this as HTMLElement).clientHeight,
            width: (this as HTMLElement).clientWidth
        };
        const padding = 10;
        const svgHeight = nodeSize.height + padding * 2;
        const svgWidth = nodeSize.width + padding * 2;
        const radius = 10;

        const cellBorderPath = d3.path();
        cellBorderPath.moveTo(svgWidth - padding, padding + radius);
        cellBorderPath.lineTo(svgWidth - padding, padding + radius);
        cellBorderPath.arc(svgWidth - padding - radius, svgHeight - padding - radius, radius, 0, Math.PI * 0.5);
        cellBorderPath.lineTo(padding + radius, svgHeight - padding);
        cellBorderPath.arc(padding + radius, svgHeight - padding - radius, radius, Math.PI * 0.5, Math.PI);
        cellBorderPath.lineTo(padding, padding + radius);
        cellBorderPath.arc(padding + radius, padding + radius, radius, Math.PI, Math.PI * 1.5);
        cellBorderPath.lineTo(svgWidth - padding - radius, padding);
        cellBorderPath.arc(svgWidth - padding - radius, padding + radius, radius, Math.PI * 1.5, 0);
        cellBorderPath.lineTo(svgWidth - padding, svgHeight - padding - radius);

        const addPath = (selection: d3.Selection<SVGSVGElement, null, null, null>, className: string) => {
            selection.append('path')
                .classed(className, true)
                .attr('fill', 'transparent')
                .attr('d', cellBorderPath.toString());
        };

        d3.select(this)
            .append('svg')
            .classed('sj-cell-border', true)
            .style('position', 'absolute')
            .style('top', '-10px')
            .style('left', '-10px')
            .attr('width', nodeSize.width + 20)
            .attr('height', nodeSize.height + 20)
            .attr('viewBox', [0, 0, nodeSize.width + 20, nodeSize.height + 20])
            .call(addPath, 'match-cell-accent-color')
            .call(addPath, 'match-cell-accent-white');
    });
}

const wrapper = ref<HTMLDivElement>();
const bracketDataStore = useBracketDataStore();
const renderer = new BracketRenderer({
    animator: new SJBracketAnimator(),
    swissOpts: {
        rowHeight: 70
    },
    eliminationOpts: {
        cellHeight: 75,
        onCellCreation(selection: d3.Selection<HTMLDivElement, HierarchyNode<Match>, HTMLDivElement, unknown>) {
            createCellBorders(selection);
        },
        onCellUpdate(selection: d3.Selection<BaseType, HierarchyNode<Match>, HTMLDivElement, unknown>) {
            selection.selectAll('.sj-cell-border').remove();
            createCellBorders(selection);
        }
    }
});

onMounted(async () => {
    wrapper.value.appendChild(renderer.element);

    await Promise.all([document.fonts.load('500 32px Nunito'), document.fonts.load('500 32px Kosugi Maru')]);

    watch(() => bracketDataStore.bracketData, newValue => {
        if (newValue != null) {
            renderer.setData(newValue);
        }
    }, { immediate: true });
});
</script>

<style lang="scss" scoped>
@import '../../styles/constants';
@import '../../styles/glow';
@import '../../styles/background';

$margin: 100px;

.bracket-wrapper {
    font-size: 0.6em;
    position: absolute;
    top: $margin;
    left: $margin;
}

.bracket-wrapper :deep(> div) {
    width: 1920px - $margin * 2;
    height: 1080px - $margin * 2;
    overflow: visible;

    .swiss-renderer__wrapper {
        padding: 5px 0;
    }

    .elimination-renderer {
        overflow: visible !important;

        .match-cell-wrapper {
            .match-cell-accent-color {
                filter: drop-shadow(0 0 3px $blue);
                stroke: $blue;
                stroke-width: 4px;
            }

            .match-cell-accent-white {
                stroke: #fff;
                stroke-width: 2px;
            }
        }

        .match-cell__third-place-match-label {
            box-sizing: border-box;
            padding-top: 5px;
            background-color: $violet-a-20;
            font-size: 14px;
        }

        .match-cell {
            @include background(10px);

            overflow: visible;

            .match-cell__score-wrapper {
                background-color: $violet-a-20;
                line-height: 1.7em;
                height: 100%;
            }

            .match-cell__score {
                font-weight: 800;
                font-family: 'Montserrat', sans-serif;

                &.is-disqualified {
                    font-size: 1em;
                }
            }

            .match-cell__top-team-name, .match-cell__top-score {
                margin-top: 5px;
            }

            .match-cell__bottom-team-name, .match-cell__bottom-score {
                margin-bottom: 5px;
            }
        }

        .bracket-link {
            stroke: #fff;
            stroke-width: 2px;
        }
    }

    .swiss-renderer {
        width: 60%;
        justify-items: center;

        .match-row-wrapper {
            @include glow-border($blue);
            @include background(8px);

            margin: 8px 0;
            width: 1000px;
            overflow: hidden;
            position: relative;
            display: flex;
            justify-content: center;
        }

        .match-row {
            background-color: transparent;
            width: 1000px;
            height: 100%;
            position: absolute;

            .match-row__team-name {
                font-size: 1.5em;
            }

            .match-row__scores {
                background-color: $violet-a-20;
                font-weight: 800;
                font-size: 1.1em;
                font-family: 'Montserrat', sans-serif;
                width: 100px;
                padding: 0 4px;
            }
        }
    }
}
</style>
