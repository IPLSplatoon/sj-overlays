<template>
    <div class="slide support layout vertical c-vert">
        <div class="title">{{ strings.break.main.support.title }}</div>
        <div class="separator" />
        <main-slide-row
            v-for="(item, index) in strings.break.main.support.items"
            :key="`support-item_${index}`"
            :is-custom-icon="item.isCustomIcon ?? false"
            :icon="item.icon"
            :first-row="item.text"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faPatreon } from '@fortawesome/free-brands-svg-icons/faPatreon';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons/faDollarSign';
import MainSlideRow from './MainSlideRow.vue';
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube';
import { faTwitch } from '@fortawesome/free-brands-svg-icons/faTwitch';
import { useLocaleInfoStore } from '../../../../store/localeInfoStore';

library.add(faTwitter, faPatreon, faGlobe, faDiscord, faDollarSign, faYoutube, faTwitch);

export default defineComponent({
    name: 'MainSlideSupport',

    components: { MainSlideRow },

    setup() {
        const localeInfoStore = useLocaleInfoStore();
        const { strings } = toRefs(localeInfoStore);

        return {
            strings
        };
    }
});
</script>
