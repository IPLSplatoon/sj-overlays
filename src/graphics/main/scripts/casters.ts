import { casters } from '../../helpers/replicants';
import { elementById } from '../../helpers/elem';
import { gsap } from 'gsap';
import { Caster } from 'schemas';
import { DASHBOARD_BUNDLE_NAME } from '../../helpers/constants';

const casterContainer = elementById('casters');
const castersDisplayTl = gsap.timeline();
let castersShown = false;

casters.on('change', newValue => {
    let castersContent = '<div class="background casters-background"></div>';

    Object.values(newValue).forEach((caster: Caster) => {
        castersContent += `<div class="caster" style="opacity: 0">
            <fitted-text class="name" text="${caster.name}" max-width="323"></fitted-text>
            <fitted-text class="extra" text="${caster.twitter} <span class=&quot;pronoun&quot;>${caster.pronouns}</span>" use-inner-html max-width="323"></fitted-text>
        </div>`;
    });

    if (castersShown) {
        gsap.to('#casters > .caster', { duration: 0.35, opacity: 0, onComplete: () => {
            casterContainer.innerHTML = castersContent;
            gsap.to('#casters > .caster', { duration: 0.35, opacity: 1 });
        } });
    } else {
        casterContainer.innerHTML = castersContent;
        setInitialCastersStyle();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    setInitialCastersStyle();
});

function setInitialCastersStyle() {
    gsap.set('.casters-line', { drawSVG: '0% 0%' });
    gsap.set('#casters > .caster', { x: 100, opacity: 0 });
    gsap.set('.casters-wrapper .casters-background', { opacity: 0 });
    gsap.set('.casters-wrapper .title-background', { x: -100, opacity: 0 });
    gsap.set('.casters-wrapper > .title > .icon, .casters-wrapper > .title > .text', { x: 50, opacity: 0 });
}

nodecg.listenFor('mainShowCasters', DASHBOARD_BUNDLE_NAME, () => {
    castersShown = true;
    castersDisplayTl.addLabel('lineIn').addLabel('textIn', '+=0.45');

    castersDisplayTl.add(gsap.to('.casters-line', { duration: 1, drawSVG: true, ease: 'power1.inOut' }), 'lineIn')
        .add(gsap.to('.casters-wrapper .background', { duration: 0.6, opacity: 1, x: 0, ease: 'power2.out', delay: 0.8 }), 'lineIn')
        .add(gsap.to('#casters > .caster', { x: 0, opacity: 1, duration: 0.65, ease: 'power2.out', stagger: 0.1, delay: 0.25 }), 'textIn')
        .add(gsap.to('.casters-wrapper > .title > .icon, .casters-wrapper > .title > .text', { x: 0, opacity: 1, duration: 0.65, ease: 'power2.out', stagger: 0.1 }), 'textIn');

    castersDisplayTl.add(gsap.to({}, { duration: 5 }));

    castersDisplayTl.addLabel('textOut').addLabel('lineOut', '+=0.35');

    castersDisplayTl.add(gsap.to('.casters-line', { duration: 1, drawSVG: '0% 0%', ease: 'power1.inOut', onComplete: () => { castersShown = false; setInitialCastersStyle(); } }), 'lineOut')
        .add(gsap.to('.casters-wrapper .casters-background', { duration: 0.6, opacity: 0, ease: 'power2.in' }), 'textOut')
        .add(gsap.to('.casters-wrapper .title-background', { duration: 0.6, opacity: 0, x: -100, ease: 'power2.in' }), 'textOut')
        .add(gsap.to('#casters > .caster', { x: 100, opacity: 0, duration: 0.65, ease: 'power2.in', stagger: 0.1 }), 'textOut')
        .add(gsap.to('.casters-wrapper > .title > .icon, .casters-wrapper > .title > .text', { x: 50, opacity: 0, duration: 0.65, ease: 'power2.in', stagger: -0.1 }), 'textOut');
});
