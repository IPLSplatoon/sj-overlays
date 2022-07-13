import './styles/common.scss';

import { createApp } from 'vue';
import BreakGraphic from './pages/break/BreakGraphic.vue';
import { gsap } from 'gsap';
import PixiPlugin from 'gsap/PixiPlugin';
import * as PIXI from './helpers/pixi';
import { createPinia } from 'pinia';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const app = createApp(BreakGraphic);
app.use(createPinia());
app.mount('#app');
