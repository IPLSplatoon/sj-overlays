import { activeBreakScene, predictionStore } from '../../helpers/replicants';
import { gsap } from 'gsap';
import { forceSetSlide } from './mainSlides';
import { ObsEvent } from '../../helpers/obs';
import { animBackgroundIn } from './background';
import { splitTeamAName, splitTeamBName } from './teams';

export const sceneChangeTl = gsap.timeline();

if (window.obsstudio) {
    window.addEventListener('obsSourceActiveChanged', (e: ObsEvent) => {
        if (e.detail.active) {
            animBackgroundIn();
            sceneChangeTl.clear(true);
            hideTeamsImmediate();
            hideStagesImmediate();
            hideMainImmediate();
            hideInfoBarImmediate();
            setTimeout(() => {
                switch (activeBreakScene.value) {
                    case 'main':
                        showMain();
                        break;
                    case 'teams':
                        showTeams();
                        showInfoBar('sceneIn+=0.1');
                        break;
                    case 'stages':
                        showStages();
                        showInfoBar('sceneIn+=0.1');
                }
            }, 2500);
        }
    });
}

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
        .add(gsap.to(splitTeamAName.words, { duration: 0.5, y: 0, ease: 'power2.out', stagger: { amount: 0.2 } }), 'teamsTextIn')
        .add(gsap.to(splitTeamBName.words, { duration: 0.5, y: 0, ease: 'power2.out', stagger: { amount: 0.2 } }), 'teamsTextIn')
        .add(gsap.to('.teams-wrapper .content .team-b-player', { duration: 0.5, x: 0, ease: 'power2.out', stagger: 0.1, opacity: 1 }), 'teamsTextIn')
        .add(gsap.to('.teams-wrapper .content .team-a-player', { duration: 0.5, x: 0, ease: 'power2.out', stagger: 0.1, opacity: 1 }), 'teamsTextIn');

}

function hideTeams(): void {
    const predictionActive = predictionStore.value.currentPrediction?.status === 'ACTIVE';

    sceneChangeTl
        .addLabel('teamsTextOut')
        .addLabel('sceneOut')
        .addLabel('teamsLineOut', '+=0.4')
        .addLabel('teamsOut', '+=0.6');

    sceneChangeTl.add(gsap.to('.teams-wrapper .content .team-a-player', { duration: 0.5, x: -350, ease: 'power2.in', stagger: 0.1, opacity: 0 }), 'teamsTextOut')
        .add(gsap.to('.teams-wrapper .content .team-b-player', { duration: 0.5, x: -350, ease: 'power2.in', stagger: 0.1, opacity: 0 }), 'teamsTextOut')
        .add(gsap.to(splitTeamAName.words, { duration: 0.5, y: 100, ease: 'power2.in', stagger: { amount: 0.2 } }), 'teamsTextOut')
        .add(gsap.to(splitTeamBName.words, { duration: 0.5, y: 100, ease: 'power2.in', stagger: { amount: 0.2 } }), 'teamsTextOut')
        .add(gsap.to(['.teams-wrapper .line.top', '.teams-wrapper .line.mid'], { duration: 0.55, width: 0, opacity: 0, ease: 'power2.in' }), 'teamsLineOut')
        .add(gsap.to('.teams-wrapper .versus', { duration: 0.40, y: 200, ease: 'power1.in', delay: 0.15 }), 'teamsOut')
        .add(gsap.to(['.teams-wrapper .content', '.team-display .background'], { duration: 0.55, height: 0, ease: 'power2.in' }), 'teamsOut')
        .add(gsap.to(['.teams-wrapper .content', '.team-display .background'], { duration: 0.10, opacity: 0, ease: 'power2.in', delay: 0.45 }), 'teamsOut');
    if (predictionActive) hidePrediction(sceneChangeTl, 'teamsOut');
}

function hideTeamsImmediate(): void {
    const predictionActive = predictionStore.value.currentPrediction?.status === 'ACTIVE';

    sceneChangeTl.add(gsap.set(['.teams-wrapper .content .team-a-player', '.teams-wrapper .content .team-b-player'], { x: -350, opacity: 0 }))
        .add(gsap.set([splitTeamAName.words, splitTeamBName.words], { y: 100 }))
        .add(gsap.set(['.teams-wrapper .line.top', '.teams-wrapper .line.mid'], { width: 0, opacity: 0 }))
        .add(gsap.set('.teams-wrapper .versus', { y: 200 }))
        .add(gsap.set(['.teams-wrapper .content', '.team-display .background'], { height: 0, opacity: 0 }));
    if (predictionActive) hidePredictionImmediate(sceneChangeTl);
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

function hidePredictionImmediate(tl: gsap.core.Timeline): void {
    tl.add(gsap.set('.prediction-box', { width: 0 }))
        .add(gsap.set('.prediction-box', { opacity: 0 }))
        .add(gsap.set('#prediction-title', { opacity: 0 }));
}

function hideStages(): void {
    sceneChangeTl.addLabel('sceneOut');

    sceneChangeTl.add(gsap.set('.stage > .background', { alignSelf: 'flex-end' }));

    hideStageElems();
    sceneChangeTl.add(gsap.to('.stages-scoreboard', { duration: 0.5, width: 0, ease: 'power2.in' }), 'borderOut')
        .add(gsap.to('.stages-scoreboard', { duration: 0.1, opacity: 0, delay: 0.4, ease: 'power2.in' }), 'borderOut');
}

function hideStagesImmediate(): void {
    sceneChangeTl.add(gsap.set('.stage-info-wrapper', { x: '100%' }))
        .add(gsap.set('.stage-info-wrapper', { opacity: 0 }))
        .add(gsap.set('.stage > .background', { width: 0 }))
        .add(gsap.set('.stage-border', { drawSVG: '50% 50%' }))
        .add(gsap.set('.stages-scoreboard', { width: 0, opacity: 0 }));
}

export function hideStageElems(callback?: gsap.Callback): void {
    const stageCount = document.querySelectorAll('.stage').length;
    sceneChangeTl.addLabel('borderOut', `+=${stageCount * 0.1 - 0.2}`);

    sceneChangeTl.add(gsap.to('.stage-info-wrapper', { x: '100%', duration: 0.35, ease: 'power2.in', stagger: 0.1 }), 'sceneOut')
        .add(gsap.to('.stage-info-wrapper', { opacity: 0, duration: 0.1, ease: 'power2.in', stagger: 0.1, delay: 0.3 }), 'sceneOut')
        .add(gsap.to('.stage > .background', { width: 0, duration: 0.35, ease: 'power2.in', stagger: 0.1 }), 'sceneOut')
        .add(gsap.to('.stage-border-white', { duration: 0.75, drawSVG: '50% 50%', ease: 'power2.inOut', stagger: 0.1 }), 'borderOut')
        .add(gsap.to('.stage-border-color', { duration: 0.75, drawSVG: '50% 50%', ease: 'power2.inOut', stagger: 0.1, onComplete: callback }), 'borderOut');
}

function showStages(): void {
    sceneChangeTl.addLabel('sceneIn');

    sceneChangeTl.add(gsap.set('.stage > .background', { alignSelf: 'flex-start', width: 0 }))
        .add(gsap.set('.stage-info-wrapper', { x: '-100%' }));

    sceneChangeTl.add(gsap.to('.stages-scoreboard', { duration: 0.5, width: 1000, ease: 'power2.out' }), 'sceneIn')
        .add(gsap.to('.stages-scoreboard', { duration: 0.1, opacity: 1, ease: 'power2.out' }), 'sceneIn');
    showStageElems();
}

export function showStageElems(): void {
    const stageCount = document.querySelectorAll('.stage').length;
    sceneChangeTl.addLabel('stagesIn', `+=${stageCount * 0.1 - 0.2}`);

    sceneChangeTl.add(gsap.to('.stage-border-white', { duration: 0.75, drawSVG: true, ease: 'power2.inOut', stagger: 0.1 }), 'sceneIn')
        .add(gsap.to('.stage-border-color', { duration: 0.75, drawSVG: true, ease: 'power2.inOut', stagger: 0.1 }), 'sceneIn')
        .add(gsap.to('.stage-info-wrapper', { x: 0, duration: 0.35, ease: 'power2.out', stagger: 0.1 }), 'stagesIn')
        .add(gsap.to('.stage-info-wrapper', { opacity: 1, duration: 0.1, ease: 'power2.out', stagger: 0.1 }), 'stagesIn')
        .add(gsap.to('.stage > .background', { width: '100%', duration: 0.35, ease: 'power2.out', stagger: 0.1 }), 'stagesIn');
}

function hideInfoBar(label: string): void {
    sceneChangeTl.add(gsap.to('.info-bar', { duration: 0.65, width: 0, ease: 'power2.in' }), label)
        .add(gsap.to('.info-bar', { duration: 0.1, opacity: 0, delay: 0.55, ease: 'power2.in' }), label);
}

function hideInfoBarImmediate(): void {
    sceneChangeTl.add(gsap.set('.info-bar', { width: 0, opacity: 0 }));
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

function hideMainImmediate(): void {
    sceneChangeTl.add(gsap.set('.main-content-wrapper, .main-slides', { height: 0, opacity: 0 }))
        .add(gsap.set('.logo-wrapper', { opacity: 0 }));
}
