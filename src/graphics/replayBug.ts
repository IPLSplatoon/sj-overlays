import './styles/common.scss';

import { createApp } from 'vue';
import { gsap } from 'gsap';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import { installCommonHelpers } from './helpers/installCommonHelpers';
import ReplayBugGraphic from './pages/replayBug/ReplayBugGraphic.vue';
import { createPinia } from 'pinia';

gsap.registerPlugin(DrawSVGPlugin);

(async () => {
    const app = createApp(ReplayBugGraphic);
    app.use(createPinia());
    installCommonHelpers(app);
    app.mount('#app');
})();
