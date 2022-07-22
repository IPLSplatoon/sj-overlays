<template>
    <div class="no-relay-message-wrapper layout c-horiz c-vert">
        <div class="glow-border glow-blue">
            No data from Relay is present.<br>This graphic needs Relay to function.
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'NoRelayMessage'
});
</script>

<style lang="scss">
.no-relay-message-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(34, 34, 34, 0.8);
    backdrop-filter: blur(8px);

    > div {
        width: 550px;
        text-align: center;
        padding: 16px 8px;
        background-color: rgba(61, 26, 75, 0.8);
    }
}
</style>
