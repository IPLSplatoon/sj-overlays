<template>
    <div class="slide support layout vertical c-vert">
        <div class="title">Support us!</div>
        <div class="separator" />
        <main-slide-row
            :icon="['fab', 'twitter']"
            first-row="@IPLSplatoon"
        />
        <main-slide-row
            :icon="['fab', 'discord']"
            first-row="iplabs.ink/discord"
        />
        <main-slide-row
            icon="globe"
            first-row="iplabs.ink"
        />
        <main-slide-row
            icon="dollar-sign"
            first-row="iplabs.ink/donate"
        />
        <main-slide-row
            :icon="['fab', 'patreon']"
            first-row="patreon.com/IPLSplatoon"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faPatreon } from '@fortawesome/free-brands-svg-icons/faPatreon';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons/faDollarSign';
import MainSlideRow from './MainSlideRow.vue';

library.add(faTwitter, faPatreon, faGlobe, faDiscord, faDollarSign);

export default defineComponent({
    name: 'MainSlideSupport',

    components: { MainSlideRow }
});
</script>
