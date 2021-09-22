import './styles/main.scss';

import 'fitted-text/dist/fitted-text';
import { gsap } from 'gsap';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons/faMicrophone';

import './scripts/scoreboard';
import './scripts/casters';

library.add(faMicrophone);
dom.watch();

gsap.registerPlugin(DrawSVGPlugin);
