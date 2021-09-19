import { gsap } from 'gsap';
import { activeRound, musicShown } from '../../helpers/replicants';
import last from 'lodash/last';
import { elementById } from '../../helpers/elem';
import { getGlowIconFromMode } from '../../helpers/constants';
import { loadImage } from '../../helpers/image';

const topBarInfoRows = document.querySelectorAll('.info-rows > .info-row');
let topInfoTl: gsap.core.Timeline;

function setTopBarAnim() {
    const switchDelay = 10;

    if (topInfoTl) {
        topInfoTl.kill();
    }
    topInfoTl = gsap.timeline({ repeat: -1 });

    for (let i = 0; i < topBarInfoRows.length; i++) {
        const elem = topBarInfoRows[i];

        if (!musicShown.value && elem.classList.contains('info-row-music')) {
            gsap.set(elem, { opacity: 0 });
            continue;
        }

        topInfoTl.add(gsap.fromTo(elem, { opacity: 0, y: -25 }, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
            force3D: false
        }));

        if (elem.classList.contains('info-row-commentators')) {
            const commentatorElems = elem.querySelectorAll('.commentators');

            for (let i = 0; i < commentatorElems.length; i++) {
                const elem = commentatorElems[i];

                topInfoTl.add(gsap.fromTo(elem, { opacity: 0 }, { opacity: 1, duration: 0.3 }), '-=0.3');
                topInfoTl.add(gsap.to({}, { duration: switchDelay / 2 }));
                if (i !== commentatorElems.length - 1) {
                    topInfoTl.add(gsap.to(elem, { opacity: 0, duration: 0.3 }), '+=0.3');
                }
            }
        } else {
            topInfoTl.add(gsap.to({}, { duration: switchDelay }));
        }

        topInfoTl.add(gsap.to(elem, { opacity: 0, y: 25, duration: 0.3, ease: 'power2.in', force3D: false }));
    }
}

musicShown.on('change', () => {
    setTopBarAnim();
});

activeRound.on('change', newValue => {
    const firstUnfinishedRound = newValue.games.find(round => round.winner === 'none') ?? last(newValue.games);

    const modeIcon = elementById<HTMLImageElement>('mode-icon');
    gsap.to(modeIcon, { duration: 0.35, opacity: 0, onComplete: async () => {
        const mode = firstUnfinishedRound.mode;
        const scale = ['Turf War', 'Unknown Mode'].includes(mode) ? '0.6' : '0.5';

        const image = getGlowIconFromMode(mode);
        await loadImage(image);
        modeIcon.style.transform = `scale(${scale})`;
        modeIcon.src = image;

        gsap.to(modeIcon, { duration: 0.35, opacity: 1 });
    } });
});

document.addEventListener('DOMContentLoaded', () => {
    setTopBarAnim();
});
