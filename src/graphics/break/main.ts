import './styles/break.scss';

import './scripts/infoBar';
import './scripts/music';
import './scripts/casters';
import './scripts/teams';
import './scripts/predictions';
import './scripts/sceneSwitcher';
import './scripts/stages';

import { gsap } from 'gsap';
import PixiPlugin from 'gsap/PixiPlugin';
import * as PIXI from '../helpers/pixi';
import { animBackgroundIn } from './scripts/background';
import { ObsEvent } from '../helpers/obs';
import { APP_HEIGHT, APP_WIDTH } from '../helpers/constants';
import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faMicrophoneAlt } from '@fortawesome/free-solid-svg-icons/faMicrophoneAlt';
import { faMusic } from '@fortawesome/free-solid-svg-icons/faMusic';
import 'fitted-text/dist/fitted-text';

library.add(faMusic, faMicrophoneAlt, faTwitter);
dom.watch();

if (window.obsstudio) {
    window.addEventListener('obsSourceActiveChanged', (e: ObsEvent) => {
        if (e.detail.active) {
            animBackgroundIn();
        }
    });
}

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

export const app = new PIXI.Application({
    width: APP_WIDTH,
    height: APP_HEIGHT,
    view: document.getElementById('background-canvas') as HTMLCanvasElement,
    backgroundColor: 0x470164
});

app.ticker.stop();
gsap.ticker.add((time) => {
    app.ticker.update(time);
});

PIXI.Loader.shared
    .add('bg-icons', 'assets/sj-bg-icons.json')
    .load(() => {
        animBackgroundIn();
    });
