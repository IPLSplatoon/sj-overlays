import './styles/common.scss';

import { createApp } from 'vue';
import MainGraphic from './pages/main/MainGraphic.vue';
import { gsap } from 'gsap';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import { createPinia } from 'pinia';
import { setUpReplicants } from 'client-shared/store/storeHelper';
import { scoreboardReps, useScoreboardStore } from 'client-shared/store/scoreboardStore';
import { activeRoundReps, useActiveRoundStore } from 'client-shared/store/activeRoundStore';
import { casterReps, useCasterStore } from 'client-shared/store/casterStore';

gsap.registerPlugin(DrawSVGPlugin);

(async () => {
    const app = createApp(MainGraphic);
    app.use(createPinia());
    await setUpReplicants(scoreboardReps, useScoreboardStore());
    await setUpReplicants(activeRoundReps, useActiveRoundStore());
    await setUpReplicants(casterReps, useCasterStore());
    app.mount('#app');
})();
