import './styles/common.scss';

import { createApp } from 'vue';
import BreakGraphic from './pages/break/BreakGraphic.vue';
import { gsap } from 'gsap';
import PixiPlugin from 'gsap/PixiPlugin';
import * as PIXI from './helpers/pixi';
import { createPinia } from 'pinia';
import { addDots, isBlank } from './helpers/string';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const app = createApp(BreakGraphic);
app.use(createPinia());
app.config.globalProperties.$helpers = {
    addDots,
    isBlank
};
app.mount('#app');
