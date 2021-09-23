import './styles/break.scss';

import './scripts/infoBar';
import './scripts/music';
import './scripts/casters';
import './scripts/teams';
import './scripts/predictions';
import './scripts/sceneSwitcher';
import './scripts/stages';
import './scripts/mainSlides';
import './scripts/nextStageTimer';
import './scripts/nextRound';

import { gsap } from 'gsap';
import PixiPlugin from 'gsap/PixiPlugin';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import * as PIXI from '../helpers/pixi';
import { animBackgroundIn } from './scripts/background';
import { APP_HEIGHT, APP_WIDTH } from '../helpers/constants';
import 'fitted-text/dist/fitted-text';

import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faMicrophoneAlt } from '@fortawesome/free-solid-svg-icons/faMicrophoneAlt';
import { faMusic } from '@fortawesome/free-solid-svg-icons/faMusic';
import { faHourglassEnd } from '@fortawesome/free-solid-svg-icons/faHourglassEnd';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { faPatreon } from '@fortawesome/free-brands-svg-icons/faPatreon';
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord';

library.add(faMusic, faMicrophoneAlt, faTwitter, faHourglassEnd, faTwitter, faGlobe, faPatreon, faDiscord);
dom.watch();

gsap.registerPlugin(DrawSVGPlugin);
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
