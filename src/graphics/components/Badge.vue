<template>
    <span class="badge">
        <slot />
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Badge'
});
</script>

<style lang="scss">
@use '../styles/constants';

span.badge {
    font-weight: 600;
    background-color: constants.$salmon;
    color: #222;
    font-size: 20px;
    padding: 0 5px;
    border-radius: 5px;
    filter: drop-shadow(0 0 3px constants.$salmon);
    display: inline-block;
    transform: translateY(-5px);
}
</style>
