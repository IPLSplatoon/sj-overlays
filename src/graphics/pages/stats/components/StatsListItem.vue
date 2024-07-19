<template>
    <div class="line-item">
        <opacity-swap-transition>
            <span :key="value.label">{{ value.label }}</span>
        </opacity-swap-transition>
        <opacity-swap-transition>
            <span :key="useDecimals ? 1 : 0">{{ tweenValue ? tweenedValue : formatValue(value.value) }}</span>
        </opacity-swap-transition>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { DataCellValue } from '../../../types/relay';
import { useTweenedNumber } from '../../../helpers/useTweenedNumber';
import OpacitySwapTransition from '../../../components/OpacitySwapTransition.vue';

export default defineComponent({
    name: 'StatsListItem',
    components: { OpacitySwapTransition },
    props: {
        value: {
            type: Object as PropType<DataCellValue>,
            required: true
        },
        useDecimals: {
            type: Boolean,
            required: true
        },
        tweenValue: {
            type: Boolean,
            required: true
        }
    },

    setup(props) {
        const tweenedValue = useTweenedNumber(
            computed(() => props.value.value),
            computed(() => props.useDecimals ? 2 : 0));

        return {
            tweenedValue,
            formatValue(value: unknown) {
                if (typeof value === 'number') {
                    return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
                } else {
                    return value;
                }
            }
        };
    }
});
</script>

<style lang="scss">
.line-item {
    font-size: 35px;
    line-height: 42px;
    margin-top: 2px;
    height: 47px;

    > span:last-child {
        float: right;
        font-weight: bold;
        font-size: 40px;
    }
}
</style>
