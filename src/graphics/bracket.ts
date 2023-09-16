import './styles/common.scss';
import '@tourneyview/renderer/css/base.css';

import BracketGraphic from './pages/bracket/BracketGraphic.vue';
import { createApp } from 'vue';
import { gsap } from 'gsap';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import PixiPlugin from 'gsap/PixiPlugin';
import { createPinia } from 'pinia';
import { initBracketDataStore } from 'client-shared/store/bracketDataStore';
import * as PIXI from './helpers/pixi';

gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

(async () => {
    const app = createApp(BracketGraphic);
    app.use(createPinia());
    await initBracketDataStore();

    app.mount('#app');
})();
