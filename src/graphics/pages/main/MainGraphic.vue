<template>
    <scoreboard />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Scoreboard from './components/Scoreboard.vue';

export default defineComponent({
    name: 'MainGraphic',

    components: { Scoreboard }
});
</script>
