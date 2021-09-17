import { gsap } from 'gsap';
import { musicShown } from '../../helpers/replicants';

const topBarInfoRows = document.querySelectorAll('.info-rows > .info-row');
let topInfoTl: gsap.core.Timeline;

function setTopBarAnim() {
    const switchDelay = 2;

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

document.addEventListener('DOMContentLoaded', () => {
    setTopBarAnim();
});
