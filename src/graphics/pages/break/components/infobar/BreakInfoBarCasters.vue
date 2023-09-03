<template>
    <opacity-swap-transition>
        <div
            :key="key"
            class="info-row layout c-horiz c-vert"
        >
            <font-awesome-icon
                icon="microphone"
                class="icon"
            />
            <fitted-content
                :key="key"
                :max-width="950"
            >
                <span
                    v-for="(caster, id, index) in casters"
                    :key="id"
                >
                    <span
                        class="caster-name"
                        :style="{ marginRight: '10px' }"
                    >
                        {{ caster.name }}
                    </span>
                    <badge class="caster-pronouns">
                        {{ caster.pronouns }}
                    </badge>
                    <span
                        v-if="index !== casterCount - 1"
                    >
                        {{ index === casterCount - 2 ? ' & ' : ', ' }}
                    </span>
                </span>
            </fitted-content>
        </div>
    </opacity-swap-transition>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons/faMicrophone';
import { library } from '@fortawesome/fontawesome-svg-core';
import Badge from '../../../../components/Badge.vue';
import FittedContent from '../../../../components/FittedContent.vue';
import OpacitySwapTransition from '../../../../components/OpacitySwapTransition.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useCasterStore } from 'client-shared/store/casterStore';

library.add(faMicrophone);

export default defineComponent({
    name: 'BreakInfoBarCasters',

    components: { Badge, FittedContent, OpacitySwapTransition, FontAwesomeIcon },

    setup() {
        const casterStore = useCasterStore();

        return {
            key: computed(() =>
                Object.values(casterStore.casters)
                    .map(caster => `${caster.name}_${caster.pronouns}`)
                    .join('_')),
            casterCount: computed(() => Object.keys(casterStore.casters).length),
            casters: computed(() => casterStore.casters)
        };
    }
});
</script>
