<template>
    <svg
        class="stats-bar-chart"
        viewBox="0 0 500 420"
        v-html="node"
    />
</template>

<script lang="ts">
import type { DataCell } from 'relay-nodecg-connector';
import { computed, defineComponent, PropType } from 'vue';
import { map, max, InternSet, range } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { create } from 'd3';
import { colors } from '../../../helpers/constants';
import type { DataCellValue } from '../../../types/relay';

export default defineComponent({
    name: 'StatsBarChart',

    props: {
        cell: {
            type: Object as PropType<DataCell>,
            required: true
        }
    },

    setup(props) {
        const width = 480;
        const height = 400;
        const margin = { top: 10, bottom: 10, right: 10, left: 25 };
        const normalizedWidth = width - margin.left - margin.right;

        const node = computed(() => {
            const data = props.cell.values ?? [];

            const X = map(data, (val: DataCellValue) => val.label);
            const Y = map(data, (val: DataCellValue) => Number(val.value));

            const xDomain = new InternSet(X);
            const yDomain = [0, max(Y) ?? 0];

            const I = range(X.length).filter(i => xDomain.has(X[i]));

            const xScale = scaleBand(xDomain, [margin.left, normalizedWidth]).padding(0.1);
            const yScale = scaleLinear(yDomain, [height, margin.bottom]);
            const xAxis = axisBottom(xScale).tickSize(0);
            const yAxis = axisLeft(yScale).ticks(Math.min(10, Math.max(2, (max(Y) ?? 0) / 2))).tickSize(normalizedWidth);

            const svg = create('svg');

            svg.append('g')
                .attr('transform', `translate(${width}, ${margin.top})`)
                .call(yAxis)
                .call(g => g.select('.domain').remove())
                .selectAll('line')
                .attr('stroke-opacity', 0.5);

            svg.append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)
                .selectAll('rect')
                .data(I)
                .join('rect')
                .attr('fill', i => data[i].team === 'alpha' ? colors.red : colors.green)
                .attr('x', i => xScale(X[i]) ?? 0)
                .attr('y', i => yScale(Y[i]))
                .attr('height', i => yScale(0) - yScale(Y[i]))
                .attr('width', xScale.bandwidth());

            svg.append('g')
                .attr('class', 'x-axis')
                .attr('transform', `translate(${margin.left}, ${height})`)
                .call(xAxis)
                .call(g => g.select('.domain').remove())
                .selectAll('text')
                .style('text-anchor', 'start')
                .attr('dx', '0em')
                .attr('dy', '0.3em')
                .attr('transform', 'rotate(-90)')
                .attr('fill', (text, i) => data[i].team === 'alpha' ? colors.red : colors.green);

            return svg.node()?.innerHTML;
        });

        return {
            node
        };
    }
});
</script>

<style lang="scss">
.stats-bar-chart {
    .tick text {
        font-size: 20px;
    }

    .x-axis text {
        font-size: 25px;
        mix-blend-mode: difference;
    }
}
</style>
