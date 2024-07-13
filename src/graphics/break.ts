import './styles/common.scss';

import { createApp } from 'vue';
import BreakGraphic from './pages/break/BreakGraphic.vue';
import { gsap } from 'gsap';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import PixiPlugin from 'gsap/PixiPlugin';
import * as PIXI from './helpers/pixi';
import { createPinia } from 'pinia';
import { setUpReplicants } from 'client-shared/store/storeHelper';
import { activeRoundReps, useActiveRoundStore } from 'client-shared/store/activeRoundStore';
import { casterReps, useCasterStore } from 'client-shared/store/casterStore';
import { breakScreenReps, useBreakScreenStore } from 'client-shared/store/breakScreenStore';
import { musicReps, useMusicStore } from 'client-shared/store/musicStore';
import { nextRoundReps, useNextRoundStore } from 'client-shared/store/nextRoundStore';
import { predictionReps, usePredictionDataStore } from 'client-shared/store/predictionDataStore';
import { localeInfoReps, useLocaleInfoStore } from 'client-shared/store/localeInfoStore';
import { assetPathReps, useAssetPathStore } from 'client-shared/store/assetPathStore';
import { installCommonHelpers } from './helpers/installCommonHelpers';
import { centralDataReps, useCentralDataStore } from 'client-shared/store/centralDataStore';

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
    await setUpReplicants(centralDataReps, useCentralDataStore());
    installCommonHelpers(app);
    app.mount('#app');
})();
