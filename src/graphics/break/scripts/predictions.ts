import { activeBreakScene, activeRound, predictionStore } from '../../helpers/replicants';
import { doOnDifference } from '../../helpers/object';
import { Prediction } from 'schemas';
import { colors } from '../../helpers/constants';
import { gsap } from 'gsap';
import { elementById } from '../../helpers/elem';
import { textOpacitySwap } from '../../helpers/anim';
import { hidePrediction, showPrediction } from './sceneSwitcher';

interface PredictionValues {
    countA: number;
    countB: number;
    percentA: number;
    percentB: number;
}

const predictionRevealTl = gsap.timeline();
export const predictionTextChangeTl = gsap.timeline();
const predictionNumberFormat = new Intl.NumberFormat('en-US', { style: 'decimal' });
const pointCountElemA = elementById('prediction-point-count-a');
const pointCountElemB = elementById('prediction-point-count-b');
const predictionPercentElemA = elementById('prediction-percentage-a');
const predictionPercentElemB = elementById('prediction-percentage-b');

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

        doOnDifference(newValue, oldValue, 'currentPrediction', (prediction?: Prediction, oldPrediction?: Prediction) => {
            if (prediction) {
                const values = getPredictionValues(prediction);
                const oldValues = getPredictionValues(oldPrediction);

                const background = (values.percentA === 0 && values.percentB === 0) ? 'unset' : `linear-gradient(90deg, ${colors.red_a_20} 0%, ${colors.red_a_20} ${values.percentA}%, ${colors.green_a_40} ${values.percentA}%, ${colors.green_a_40} 100%)`;
                gsap.to('#prediction-background', { duration: 0.25, background });

                predictionTextChangeTl.add(gsap.fromTo(values, {
                    ...oldValues
                }, {
                    ...values,
                    ease: 'power2.inOut',
                    duration: 0.25,
                    immediateRender: false,
                    onUpdate: () => {
                        updatePredictionCountDisplays(values);
                    }
                }));
                updatePredictionCountDisplays(values);
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

export function getPredictionValues(prediction: Prediction): PredictionValues {
    if (!prediction) {
        return {
            countA: 0,
            countB: 0,
            percentA: 0,
            percentB: 0
        };
    }

    const alphaOutcome = prediction.outcomes
        .find(outcome => findOutcome(activeRound.value.teamA.name, outcome.title))
        ?? prediction.outcomes[0];
    const bravoOutcome = prediction.outcomes
        .find(outcome => findOutcome(activeRound.value.teamB.name, outcome.title))
        ?? prediction.outcomes[1];

    const totalPointsUsed = alphaOutcome.pointsUsed + bravoOutcome.pointsUsed;
    const alphaPercentage = totalPointsUsed === 0 ? 0 : alphaOutcome.pointsUsed / totalPointsUsed * 100;
    const bravoPercentage = totalPointsUsed === 0 ? 0 : bravoOutcome.pointsUsed / totalPointsUsed * 100;

    return {
        countA: alphaOutcome.pointsUsed,
        countB: bravoOutcome.pointsUsed,
        percentA: alphaPercentage,
        percentB: bravoPercentage
    };
}

export function updatePredictionCountDisplays(values: PredictionValues): void {
    predictionPercentElemA.innerText = `${Math.round(values.percentA)}%`;
    predictionPercentElemB.innerText = `${Math.round(values.percentB)}%`;
    pointCountElemA.innerText = `${predictionNumberFormat.format(Math.round(values.countA))}p`;
    pointCountElemB.innerText = `${predictionNumberFormat.format(Math.round(values.countB))}p`;
}

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
    showPrediction(predictionRevealTl, 'show-container', false);
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
