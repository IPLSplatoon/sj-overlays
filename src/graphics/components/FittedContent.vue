<template>
    <div
        ref="wrapper"
        class="fitted-content-wrapper"
        :style="{ justifyContent, maxWidth: `${maxWidth}px` }"
    >
        <div
            ref="content"
            :style="{ transform: `scaleX(${scaleX})`, transformOrigin }"
        >
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { computed, onMounted, onUnmounted, PropType, ref } from 'vue';

export default defineComponent({
    name: 'FittedContent',

    props: {
        maxWidth: {
            type: Number,
            default: null
        },
        align: {
            type: String as PropType<'left' | 'center' | 'right'>,
            default: 'left'
        }
    },

    setup(props) {
        const contentWidth = ref(1);
        const wrapperWidth = ref(1);
        const scaleX = computed(() => Math.min(1, (props.maxWidth ?? wrapperWidth.value) / contentWidth.value));

        const wrapperResizeObserver = new ResizeObserver(entries => {
            wrapperWidth.value = entries[0].contentRect.width;
        });
        const contentResizeObserver = new ResizeObserver(entries => {
            contentWidth.value = entries[0].contentRect.width;
        });
        const content = ref<HTMLDivElement>();
        const wrapper = ref<HTMLDivElement>();
        onMounted(() => {
            contentResizeObserver.observe(content.value!);
            wrapperResizeObserver.observe(wrapper.value!);
        });
        onUnmounted(() => {
            contentResizeObserver.disconnect();
            wrapperResizeObserver.disconnect();
        });

        const justifyContent = computed(() => {
            switch (props.align) {
                case 'center':
                    return 'center';
                case 'right':
                    return 'flex-end';
                default:
                    return 'unset';
            }
        });
        const transformOrigin = computed(() => {
            switch (props.align) {
                case 'center':
                    return 'center';
                case 'right':
                    return 'center right';
                default:
                    return 'center left';
            }
        });

        return {
            content,
            wrapper,
            justifyContent,
            transformOrigin,
            scaleX
        };
    }
});
</script>

<style lang="scss">
.fitted-content-wrapper {
    display: flex;
    position: relative;
    white-space: nowrap;
    overflow: hidden;

    & > div {
        width: max-content;
    }
}
</style>
