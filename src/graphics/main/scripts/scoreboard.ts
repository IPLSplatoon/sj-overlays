import { activeRound, scoreboardData } from '../../helpers/replicants';
import { doOnDifference } from '../../helpers/object';
import { textOpacitySwap } from '../../helpers/anim';
import { elementById } from '../../helpers/elem';
import { gsap } from 'gsap';

const scoreboardDisplayTl = gsap.timeline();
const scoreUpdateTls: Record<'a' | 'b', gsap.core.Timeline> = {
    a: gsap.timeline(),
    b: gsap.timeline()
};

activeRound.on('change', (newValue, oldValue) => {
    doOnDifference(newValue, oldValue, 'teamA.score',
        (value: number, oldValue: number) => animUpdateScore(value, oldValue, 'a'));
    doOnDifference(newValue, oldValue, 'teamB.score',
        (value: number, oldValue: number) => animUpdateScore(value, oldValue, 'b'));

    doOnDifference(newValue, oldValue, 'teamA.name',
        (value: string) => textOpacitySwap(value, elementById('team-a-name')));
    doOnDifference(newValue, oldValue, 'teamB.name',
        (value: string) => textOpacitySwap(value, elementById('team-b-name')));

    gsap.to('#team-a-color', {
        backgroundColor: newValue.teamA.color,
        duration: 0.35
    });

    gsap.to('#team-b-color', {
        backgroundColor: newValue.teamB.color,
        duration: 0.35
    });
});

function animUpdateScore(newScore: number, oldScore: number, team: 'a' | 'b') {
    const scoreElem = elementById<FittedText>(`team-${team}-score`);
    const posYTo = newScore > oldScore ? 50 : -50;
    const posYFrom = newScore > oldScore ? -50 : 50;
    const timeline = scoreUpdateTls[team];

    timeline.add(gsap.to(scoreElem, { duration: 0.35, y: posYTo, ease: 'power2.in', onComplete: () => {
        gsap.set(scoreElem, { y: posYFrom });
        scoreElem.text = newScore.toString();
    } }));
    timeline.add(gsap.to(scoreElem, { duration: 0.35, y: 0, ease: 'power2.out' }));
}

scoreboardData.on('change', (newValue, oldValue) => {
    doOnDifference(newValue, oldValue, 'flavorText', (flavorText: string) => {
        textOpacitySwap(flavorText, elementById('scoreboard-flavor-text'));
    });

    if (newValue.isVisible) {
        showScoreboard();
    } else {
        hideScoreboard();
    }
});

function showScoreboard(): void {
    scoreboardDisplayTl.addLabel('lineIn').addLabel('textIn', '+=0.45');

    scoreboardDisplayTl.add(gsap.to('.scoreboard-line', { duration: 1, drawSVG: true, ease: 'power1.inOut' }), 'lineIn')
        .add(gsap.to('.scoreboard-wrapper .background', { duration: 0.6, opacity: 1, x: 0, ease: 'power2.out', delay: 0.7 }), 'lineIn')
        .add(gsap.to('.score-separator', { duration: 0.6, width: 295, ease: 'power2.out', delay: 0.3 }), 'lineIn')
        .add(gsap.to('.score-separator', { duration: 0.25, opacity: 1, ease: 'power2.out', delay: 0.2 }), 'lineIn')
        .add(gsap.to('.team-name', { x: 0, duration: 0.65, ease: 'power2.out', stagger: 0.1 }), 'textIn')
        .add(gsap.to('#team-a-score', { y: 0, duration: 0.35, ease: 'power2.out' }), 'textIn')
        .add(gsap.to('#team-b-score', { y: 0, duration: 0.35, ease: 'power2.out' }), 'textIn')
        .add(gsap.to('.team-color', { x: 0, duration: 0.35, ease: 'power2.out', delay: 0.4 }), 'textIn')
        .add(gsap.to('.scoreboard-icon, #scoreboard-flavor-text', { x: 0, opacity: 1, duration: 0.5, stagger: -0.1, ease: 'power2.out' }), 'textIn');
}

function hideScoreboard(): void {
    scoreboardDisplayTl.addLabel('textOut').addLabel('lineOut', '+=0.35');

    scoreboardDisplayTl.add(gsap.to('.scoreboard-line', { duration: 1, drawSVG: '100% 100%', ease: 'power1.inOut' }), 'lineOut')
        .add(gsap.to('.flavor-text-background', { duration: 0.6, opacity: 0, x: 100, ease: 'power2.in' }), 'textOut')
        .add(gsap.to('.teams-background', { duration: 0.6, opacity: 0, x: -100, ease: 'power2.in' }), 'textOut')
        .add(gsap.to('.score-separator', { duration: 0.6, width: 0, ease: 'power2.in' }), 'lineOut')
        .add(gsap.to('.score-separator', { duration: 0.25, opacity: 0, ease: 'power2.out', delay: 0.55 }), 'lineOut')
        .add(gsap.to('.team-name', { x: -250, duration: 0.45, ease: 'power2.in', stagger: 0.1 }), 'textOut')
        .add(gsap.to('#team-a-score', { y: 50, duration: 0.35, ease: 'power2.in' }), 'textOut')
        .add(gsap.to('#team-b-score', { y: -50, duration: 0.35, ease: 'power2.in' }), 'textOut')
        .add(gsap.to('.team-color', { x: 50, duration: 0.35, ease: 'power2.in' }), 'textOut')
        .add(gsap.to('.scoreboard-icon, #scoreboard-flavor-text', { x: -50, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.in' }), 'textOut');
}
