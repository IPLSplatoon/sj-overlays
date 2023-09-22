import './styles/common.scss';

import { createApp } from 'vue';
import { gsap } from 'gsap';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import PixiPlugin from 'gsap/PixiPlugin';
import * as PIXI from './helpers/pixi';
import { createPinia } from 'pinia';
import { addDots, isBlank } from './helpers/string';
import StatsGraphic from './pages/stats/StatsGraphic.vue';
import { setUpReplicants } from 'client-shared/store/storeHelper';
import { relayDataReps, useRelayDataStore } from 'client-shared/store/relayDataStore';
import { activeRoundReps, useActiveRoundStore } from 'client-shared/store/activeRoundStore';
import { formatDuration } from './helpers/timer';

gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

(async () => {
    const app = createApp(StatsGraphic);
    app.use(createPinia());
    await setUpReplicants(relayDataReps, useRelayDataStore());
    await setUpReplicants(activeRoundReps, useActiveRoundStore());
    app.config.globalProperties.$helpers = {
        addDots,
        isBlank,
        formatDuration
    };
    app.mount('#app');
})();
