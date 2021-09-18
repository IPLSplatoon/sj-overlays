import { activeBreakScene, activeRound, predictionStore } from '../../helpers/replicants';
import { doOnDifference } from '../../helpers/object';
import { Prediction } from 'schemas';
import { colors } from '../../helpers/constants';
import { gsap } from 'gsap';
import { elementById } from '../../helpers/elem';
import { textOpacitySwap } from '../../helpers/anim';
import { hidePrediction, showPrediction } from './sceneSwitcher';

const predictionRevealTl = gsap.timeline();

NodeCG.waitForReplicants(predictionStore, activeRound, activeBreakScene).then(() => {
    predictionStore.on('change', (newValue, oldValue) => {
        const isActive = newValue.currentPrediction?.status === 'ACTIVE';

        if (oldValue && activeBreakScene.value === 'teams') {
            doOnDifference(newValue, oldValue, 'currentPrediction.status', () => {
                if (isActive) {
                    animPredictionStart();
                } else {
                    animPredictionEnd();
                }
            });
        }

        doOnDifference(newValue, oldValue, 'currentPrediction', (prediction?: Prediction) => {
            if (prediction) {
                const alphaOutcome = prediction.outcomes
                    .find(outcome => findOutcome(activeRound.value.teamA.name, outcome.title))
                    ?? prediction.outcomes[0];
                const bravoOutcome = prediction.outcomes
                    .find(outcome => findOutcome(activeRound.value.teamB.name, outcome.title))
                    ?? prediction.outcomes[1];

                const totalPointsUsed = alphaOutcome.pointsUsed + bravoOutcome.pointsUsed;
                const alphaPercentage = alphaOutcome.pointsUsed / totalPointsUsed * 100;
                const bravoPercentage = bravoOutcome.pointsUsed / totalPointsUsed * 100;

                const background = `linear-gradient(90deg, ${colors.red_a_20} 0%, ${colors.red_a_20} ${alphaPercentage}%, ${colors.green_a_40} ${alphaPercentage}%, ${colors.green_a_40} 100%)`;
                gsap.to('#prediction-background', { duration: 0.1, background });

                const numberFormat = new Intl.NumberFormat('en-US', { style: 'decimal' });
                elementById('prediction-point-count-a').innerText = `${numberFormat.format(alphaOutcome.pointsUsed)}p`;
                elementById('prediction-point-count-b').innerText = `${numberFormat.format(bravoOutcome.pointsUsed)}p`;

                elementById('prediction-percentage-a').innerText = `${Math.round(alphaPercentage)}%`;
                elementById('prediction-percentage-b').innerText = `${Math.round(bravoPercentage)}%`;
            }
        });

        doOnDifference(newValue, oldValue, 'currentPrediction.title', (title: string) => {
            const predictionTitle = elementById<FittedText>('prediction-title');
            if (isActive && oldValue) {
                textOpacitySwap(title, predictionTitle);
            } else {
                predictionTitle.text = title;
            }
        });
    });
});

function findOutcome(teamName: string, outcomeTitle: string): boolean {
    return teamName === outcomeTitle || new RegExp(teamName).test(outcomeTitle);
}

function animPredictionStart() {
    const teamsHeight = 470;
    const teamDisplayHeight = 525;
    const playersHeight = 330;
    const teamsPosTop = 250;

    predictionRevealTl.addLabel('anim').addLabel('show-container', '+=0.4');

    predictionRevealTl.add(gsap.to('.team-display', { duration: 0.5, height: teamDisplayHeight, ease: 'power2.inOut' }), 'anim');
    predictionRevealTl.add(gsap.to('.teams-wrapper .content .players', { duration: 0.5, height: playersHeight, ease: 'power2.inOut' }), 'anim');
    predictionRevealTl.add(gsap.to('.teams-wrapper', { duration: 0.5, top: teamsPosTop, ease: 'power2.inOut' }), 'anim');
    predictionRevealTl.add(gsap.to(['.teams-wrapper .content', '.team-display .background'], { duration: 0.5, height: teamsHeight, ease: 'power2.inOut' }), 'anim');
    showPrediction(predictionRevealTl, 'show-container');
}

function animPredictionEnd() {
    const teamsHeight = 583;
    const teamDisplayHeight = 638;
    const playersHeight = 443;
    const teamsPosTop = 275;

    predictionRevealTl.addLabel('hide-container').addLabel('anim', '+=0.6');

    hidePrediction(predictionRevealTl, 'hide-container');
    predictionRevealTl.add(gsap.to('.team-display', { duration: 0.5, height: teamDisplayHeight, ease: 'power2.inOut' }), 'anim');
    predictionRevealTl.add(gsap.to('.teams-wrapper .content .players', { duration: 0.5, height: playersHeight, ease: 'power2.inOut' }), 'anim');
    predictionRevealTl.add(gsap.to('.teams-wrapper', { duration: 0.5, top: teamsPosTop, ease: 'power2.inOut' }), 'anim');
    predictionRevealTl.add(gsap.to(['.teams-wrapper .content', '.team-display .background'], { duration: 0.5, height: teamsHeight, ease: 'power2.inOut' }), 'anim');
}
