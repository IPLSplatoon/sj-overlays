import './styles/common.scss';

import { createApp } from 'vue';
import MainGraphic from './pages/main/MainGraphic.vue';
import { gsap } from 'gsap';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';

const app = createApp(MainGraphic);
app.mount('#app');

gsap.registerPlugin(DrawSVGPlugin);
