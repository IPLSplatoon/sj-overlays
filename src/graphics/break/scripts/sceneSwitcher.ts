import { activeBreakScene, predictionStore } from '../../helpers/replicants';
import { gsap } from 'gsap';
import { forceSetSlide } from './mainSlides';

const sceneChangeTl = gsap.timeline();

NodeCG.waitForReplicants(activeBreakScene, predictionStore).then(() => {
    activeBreakScene.on('change', (newValue, oldValue) => {
        if (oldValue) {
            switch (oldValue) {
                case 'teams':
                    hideTeams();
                    break;
                case 'stages':
                    hideStages();
                    break;
                case 'main':
                    hideMain();
                    break;
                default:
                    console.log('uhhhhhhh');
            }
        } else {
            hideStages();
        }

        switch (newValue) {
            case 'teams':
                showTeams();
                break;
            case 'stages':
                showStages();
                break;
            case 'main':
                forceSetSlide(0);
                showMain();
                hideInfoBar('sceneOut+=0.1');
                break;
            default:
                console.log('uhhhh');
        }

        if (newValue !== 'main') {
            showInfoBar('sceneIn+=0.1');
        }
    });
});

function showTeams(): void {
    const predictionActive = predictionStore.value.currentPrediction?.status === 'ACTIVE';
    const teamsHeight = predictionActive ? 470 : 583;
    const teamDisplayHeight = predictionActive ? 525 : 638;
    const playersHeight = predictionActive ? 330 : 443;
    const teamsPosTop = predictionActive ? 250 : 275;

    sceneChangeTl
        .addLabel('teamsIn')
        .addLabel('sceneIn')
        .addLabel('teamsLineIn', '+=0.35')
        .add('teamsTextIn', '+=0.45');

    sceneChangeTl.add(gsap.set('.team-display', { height: teamDisplayHeight }));
    sceneChangeTl.add(gsap.set('.teams-wrapper .content .players', { height: playersHeight }));
    sceneChangeTl.add(gsap.set('.teams-wrapper', { top: teamsPosTop }));

    if (predictionActive) showPrediction(sceneChangeTl, 'teamsIn');
    sceneChangeTl.add(gsap.to('.teams-wrapper .versus', { duration: 0.4, y: 0, ease: 'power1.out', delay: 0.15 }), 'teamsIn')
        .add(gsap.to(['.teams-wrapper .content', '.team-display .background'], { duration: 0.55, height: teamsHeight, ease: 'power2.out' }), 'teamsIn')
        .add(gsap.to(['.teams-wrapper .content', '.team-display .background'], { duration: 0.10, opacity: 1, ease: 'power2.out' }), 'teamsIn')
        .add(gsap.to('.teams-wrapper .line.top', { duration: 0.55, width: 375, opacity: 1, ease: 'power2.out' }), 'teamsLineIn')
        .add(gsap.to('.teams-wrapper .line.mid', { duration: 0.55, width: 600, opacity: 1, ease: 'power2.out' }), 'teamsLineIn')
        .add(gsap.to('.teams-wrapper .content .team-name fitted-text', { duration: 0.5, y: 0, ease: 'power2.out' }), 'teamsTextIn')
        .add(gsap.to('.teams-wrapper .content .team-b-player', { duration: 0.5, x: 0, ease: 'power2.out', stagger: 0.1, opacity: 1 }), 'teamsTextIn')
        .add(gsap.to('.teams-wrapper .content .team-a-player', { duration: 0.5, x: 0, ease: 'power2.out', stagger: 0.1, opacity: 1 }), 'teamsTextIn');

}

function hideTeams(): void {
    const predictionActive = predictionStore.value.currentPrediction?.status === 'ACTIVE';

    sceneChangeTl
        .addLabel('teamsTextOut')
        .addLabel('sceneOut')
        .addLabel('teamsLineOut', '+=0.1')
        .addLabel('teamsOut', '+=0.40');

    sceneChangeTl.add(gsap.to('.teams-wrapper .content .team-a-player', { duration: 0.5, x: -350, ease: 'power2.in', stagger: 0.1, opacity: 0 }), 'teamsTextOut')
        .add(gsap.to('.teams-wrapper .content .team-b-player', { duration: 0.5, x: -350, ease: 'power2.in', stagger: 0.1, opacity: 0 }), 'teamsTextOut')
        .add(gsap.to('.teams-wrapper .content .team-name fitted-text', { duration: 0.5, y: 100, ease: 'power2.in' }), 'teamsTextOut')
        .add(gsap.to(['.teams-wrapper .line.top', '.teams-wrapper .line.mid'], { duration: 0.55, width: 0, opacity: 0, ease: 'power2.in' }), 'teamsLineOut')
        .add(gsap.to('.teams-wrapper .versus', { duration: 0.40, y: 200, ease: 'power1.in', delay: 0.15 }), 'teamsOut')
        .add(gsap.to(['.teams-wrapper .content', '.team-display .background'], { duration: 0.55, height: 0, ease: 'power2.in' }), 'teamsOut')
        .add(gsap.to(['.teams-wrapper .content', '.team-display .background'], { duration: 0.10, opacity: 0, ease: 'power2.in', delay: 0.45 }), 'teamsOut');
    if (predictionActive) hidePrediction(sceneChangeTl, 'teamsOut');
}

export function showPrediction(tl: gsap.core.Timeline, label: string): void {
    tl.add(gsap.to('.prediction-box', { duration: 0.65, width: 1300, ease: 'power2.out' }), label)
        .add(gsap.to('.prediction-box', { duration: 0.1, opacity: 1, ease: 'power2.out' }), label)
        .add(gsap.to('#prediction-title', { duration: 0.5, opacity: 1, ease: 'power2.out' }), label);
}

export function hidePrediction(tl: gsap.core.Timeline, label: string): void {
    tl.add(gsap.to('.prediction-box', { duration: 0.65, width: 0, ease: 'power2.in' }), label)
        .add(gsap.to('.prediction-box', { duration: 0.10, opacity: 0, ease: 'power2.in', delay: 0.55 }), label)
        .add(gsap.to('#prediction-title', { duration: 0.5, opacity: 0, ease: 'power2.in' }), label);
}

function hideStages(): void {
    sceneChangeTl.addLabel('sceneOut');
    sceneChangeTl.add(gsap.to('.stages-wrapper', { opacity: 0, duration: 0.5 }));
}

function showStages(): void {
    sceneChangeTl.addLabel('sceneIn');
    sceneChangeTl.add(gsap.to('.stages-wrapper', { opacity: 1, duration: 0.5 }));
}

function hideInfoBar(label: string): void {
    sceneChangeTl.add(gsap.to('.info-bar', { duration: 0.65, width: 0, ease: 'power2.in' }), label)
        .add(gsap.to('.info-bar', { duration: 0.1, opacity: 0, delay: 0.55, ease: 'power2.in' }), label);
}

function showInfoBar(label: string): void {
    sceneChangeTl.add(gsap.to('.info-bar', { duration: 0.65, width: 1300, ease: 'power2.out' }), label)
        .add(gsap.to('.info-bar', { duration: 0.1, opacity: 1, ease: 'power2.out' }), label);
}

function showMain(): void {
    sceneChangeTl.addLabel('sceneIn');

    sceneChangeTl.add(gsap.to('.main-content-wrapper, .main-slides', { duration: 0.55, height: 700, ease: 'power2.out' }), 'sceneIn')
        .add(gsap.to('.main-content-wrapper, .main-slides', { duration: 0.1, opacity: 1, ease: 'power2.out' }), 'sceneIn')
        .add(gsap.to('.logo-wrapper', { opacity: 1, duration: 0.5, ease: 'power2.out' }), 'sceneIn');
}

function hideMain(): void {
    sceneChangeTl.addLabel('sceneOut');

    sceneChangeTl.add(gsap.to('.main-content-wrapper, .main-slides', { duration: 0.55, height: 0, ease: 'power2.in' }), 'sceneOut')
        .add(gsap.to('.main-content-wrapper, .main-slides', { duration: 0.1, opacity: 0, delay: 0.45, ease: 'power2.in' }), 'sceneOut')
        .add(gsap.to('.logo-wrapper', { opacity: 0, duration: 0.5, ease: 'power2.in' }), 'sceneOut');
}
