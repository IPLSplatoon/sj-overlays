import { activeRound, predictionStore } from '../../helpers/replicants';
import { doOnDifference } from '../../helpers/object';
import { Prediction } from 'schemas';
import { colors } from '../../helpers/constants';
import { gsap } from 'gsap';
import { elementById } from '../../helpers/elem';
import { textOpacitySwap } from '../../helpers/anim';

NodeCG.waitForReplicants(predictionStore, activeRound).then(() => {
    predictionStore.on('change', (newValue, oldValue) => {
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
            textOpacitySwap(title, elementById('prediction-title'));
        });
    });
});

function findOutcome(teamName: string, outcomeTitle: string): boolean {
    return teamName === outcomeTitle || new RegExp(teamName).test(outcomeTitle);
}
