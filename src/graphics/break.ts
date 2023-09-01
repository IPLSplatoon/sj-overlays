import './styles/common.scss';

import { createApp } from 'vue';
import BreakGraphic from './pages/break/BreakGraphic.vue';
import { gsap } from 'gsap';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import PixiPlugin from 'gsap/PixiPlugin';
import * as PIXI from './helpers/pixi';
import { createPinia } from 'pinia';
import { addDots, isBlank } from './helpers/string';
import { setUpReplicants } from './store/storeHelper';
import { activeRoundReps, useActiveRoundStore } from './store/activeRoundStore';
import { casterReps, useCasterStore } from './store/casterStore';
import { breakScreenReps, useBreakScreenStore } from './store/breakScreenStore';
import { musicReps, useMusicStore } from './store/musicStore';
import { nextRoundReps, useNextRoundStore } from './store/nextRoundStore';
import { predictionReps, usePredictionDataStore } from './store/predictionDataStore';
import { localeInfoReps, useLocaleInfoStore } from './store/localeInfoStore';
import { assetPathReps, useAssetPathStore } from './store/assetPathStore';

gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

(async () => {
    const app = createApp(BreakGraphic);
    app.use(createPinia());
    await setUpReplicants(activeRoundReps, useActiveRoundStore());
    await setUpReplicants(casterReps, useCasterStore());
    await setUpReplicants(breakScreenReps, useBreakScreenStore());
    await setUpReplicants(musicReps, useMusicStore());
    await setUpReplicants(nextRoundReps, useNextRoundStore());
    await setUpReplicants(predictionReps, usePredictionDataStore());
    await setUpReplicants(localeInfoReps, useLocaleInfoStore());
    await setUpReplicants(assetPathReps, useAssetPathStore());
    app.config.globalProperties.$helpers = {
        addDots,
        isBlank
    };
    app.mount('#app');
})();
