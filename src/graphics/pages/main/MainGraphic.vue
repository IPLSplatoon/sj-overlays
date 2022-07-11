<template>
    <scoreboard />
    <casters />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Scoreboard from './components/Scoreboard.vue';
import Casters from './components/Casters.vue';

export default defineComponent({
    name: 'MainGraphic',

    components: { Casters, Scoreboard }
});
</script>
