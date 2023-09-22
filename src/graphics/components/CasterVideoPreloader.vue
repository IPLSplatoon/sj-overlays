<template>
    <div
        class="caster-video-preloader"
        style="display: none;"
    >
        <video-loader
            v-for="(caster, key) in castersWithVideo"
            :key="key"
            :src="caster.videoUrl"
        />
    </div>
</template>

<script setup lang="ts">
import { useCasterStore } from 'client-shared/store/casterStore';
import { computed } from 'vue';
import { isBlank } from '../helpers/string';
import VideoLoader from './VideoLoader.vue';

const casterStore = useCasterStore();
const castersWithVideo = computed(() =>
    Object.fromEntries(Object.entries(casterStore.casters).filter(([key, caster]) => !isBlank(caster.videoUrl))));
</script>
