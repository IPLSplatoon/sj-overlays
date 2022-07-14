<template>
    <transition
        mode="out-in"
        :css="false"
        @enter="enter"
        @leave="leave"
        @before-enter="beforeEnter"
    >
        <break-stages v-if="activeBreakScene.data === 'stages'" />
        <break-teams v-else-if="activeBreakScene.data === 'teams'" />
        <break-main v-else-if="activeBreakScene.data === 'main'" />
    </transition>
    <icon-background />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconBackground from '../../components/IconBackground.vue';
import { useReplicant } from 'nodecg-vue-composable';
import { DASHBOARD_BUNDLE_NAME } from '../../helpers/constants';
import { ActiveBreakScene } from 'schemas';
import BreakStages from './components/BreakStages.vue';
import BreakTeams from './components/teams/BreakTeams.vue';
import BreakMain from './components/main/BreakMain.vue';
import gsap from 'gsap';

interface AnimatedSceneComponent extends HTMLElement {
    __vueParentComponent: InternalAnimatedSceneComponentInstance
}

interface InternalAnimatedSceneComponentInstance {
    ctx: {
        beforeEnter: (elem: HTMLElement) => void
        enter: (elem: HTMLElement, done: gsap.Callback) => void
        leave: (elem: HTMLElement, done: gsap.Callback) => void
    }
}

export default defineComponent({
    name: 'BreakGraphic',

    components: { BreakMain, BreakTeams, BreakStages, IconBackground },

    setup() {
        const activeBreakScene = useReplicant<ActiveBreakScene>('activeBreakScene', DASHBOARD_BUNDLE_NAME);

        return {
            activeBreakScene,
            // Accesses the internal Vue instance of the components and runs the appropriate animation methods.
            // This means that child components in this transition MUST contain 'beforeEnter', 'enter', and 'leave' methods.
            // There's likely a better way to do this, but it works...
            beforeEnter: (elem: AnimatedSceneComponent) => {
                (elem.__vueParentComponent as InternalAnimatedSceneComponentInstance).ctx.beforeEnter(elem);
            },
            enter: (elem: AnimatedSceneComponent, done: gsap.Callback) => {
                (elem.__vueParentComponent as InternalAnimatedSceneComponentInstance).ctx.enter(elem, done);
            },
            leave: (elem: AnimatedSceneComponent, done: gsap.Callback) => {
                (elem.__vueParentComponent as InternalAnimatedSceneComponentInstance).ctx.leave(elem, done);
            }
        };
    }
});
</script>
