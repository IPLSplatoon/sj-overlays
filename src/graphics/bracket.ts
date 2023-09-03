import './styles/common.scss';

import BracketGraphic from './pages/bracket/BracketGraphic.vue';
import { createApp } from 'vue';
import { gsap } from 'gsap';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import { createPinia } from 'pinia';

gsap.registerPlugin(DrawSVGPlugin);

(async () => {
    const app = createApp(BracketGraphic);
    app.use(createPinia());

    app.mount('#app');
})();
