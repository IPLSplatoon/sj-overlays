<template>
    <div class="info-bar-wrapper w-max layout c-horiz">
        <div class="info-bar layout horiz c-horiz glow-border glow-blue">
            <div class="bar-content">
                <div class="icon-wrapper layout horiz c-vert c-horiz">
                    <img
                        src="/bundles/sj-overlays/assets/SJ_Eyes.png"
                        class="icon eyes-icon"
                    >
                </div>
                <div class="text-wrapper">
                    <div
                        id="info-rows"
                        class="info-rows"
                    >
                        <div class="info-row layout c-horiz c-vert">
                            <div>Welcome to <span class="logo-font">SuperJump!</span></div>
                        </div>
                    </div>
                </div>
                <div class="icon-wrapper mode-icon layout horiz c-vert c-horiz">
                    <img
                        id="mode-icon"
                        src="/bundles/sj-overlays/assets/SJ_RM-Glow.png"
                        class="icon mode-icon"
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BreakInfoBar'
});
</script>

<style lang="scss">
@import '../../../../styles/constants';
@import '../../../../styles/background';
@import '../../../../styles/glow';

.info-bar-wrapper {
    position: absolute;
    width: $pageWidth;
    top: 100px;

    .info-bar {
        @include background();

        position: absolute;
        overflow: hidden;
        height: 86px;
        width: 1300px;

        .bar-content {
            $sideContentWidth: 125px;

            position: absolute;
            top: 0;
            width: 1300px;
            height: 100%;

            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: $sideContentWidth auto $sideContentWidth;
            align-items: center;
            justify-items: center;

            font-size: 38px;
            font-style: italic;

            .text-wrapper {
                position: relative;
                width: 100%; height: 100%;

                .info-row {
                    position: absolute;
                    width: 100%; height: 100%;

                    svg {
                        filter: drop-shadow(0 0 3px white);
                        margin-right: 15px;
                    }

                    &.info-row-commentators > .commentators {
                        width: 100%; height: 100%;
                        position: absolute;
                    }
                }
            }

            .icon-wrapper {
                height: 100%;
                width: 100px;
                overflow: hidden;

                .icon {
                    filter: drop-shadow(0 0 4px $salmon);

                    &.eyes-icon {
                        transform: scale(0.6);
                    }

                    &.mode-icon {
                        transform: scale(0.5);
                    }
                }
            }
        }
    }
}
</style>
