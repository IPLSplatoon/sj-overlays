import './styles/common.scss';

import { createApp } from 'vue';
import MainGraphic from './pages/main/MainGraphic.vue';
import { gsap } from 'gsap';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import { createPinia } from 'pinia';

const app = createApp(MainGraphic);
app.use(createPinia());
app.mount('#app');

gsap.registerPlugin(DrawSVGPlugin);
