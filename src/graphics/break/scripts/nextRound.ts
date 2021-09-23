import { nextRound } from '../../helpers/replicants';
import { doOnDifference, doOnOneOrMoreDifference } from '../../helpers/object';
import { elementById } from '../../helpers/elem';
import escape from 'lodash/escape';
import { mapNameToImagePath } from '../../helpers/constants';
import { gsap } from 'gsap';
import { textSlideSwap } from '../../helpers/anim';

const nextRoundUpdateTl = gsap.timeline();
const nextTeamNamesElem = elementById<FittedText>('next-team-names');
const nextMatchesContainer = elementById('next-matches-container');
const roundSizeElem = elementById('round-size');

nextRound.on('change', (newValue, oldValue) => {
    doOnOneOrMoreDifference(newValue, oldValue, ['teamA.name', 'teamB.name'], () => {
        textSlideSwap(`<span class="team-name">${escape(newValue.teamA.name)}</span> vs <span class="team-name">${escape(newValue.teamB.name)}</span>`, nextTeamNamesElem);
    });

    doOnDifference(newValue, oldValue, 'games', () => {
        let gamesHtml = '';

        for (let i = 0; i < 3; i++) {
            const game = newValue.games[i];

            gamesHtml += `
                <div class="match" style="opacity: 0">
                    <div class="cover glow-border glow-blue"></div>
                    <div class="match-background" style="background-image: url('assets/stages/${mapNameToImagePath[game.stage]}')"></div>
                    <div class="match-text layout vertical">
                        <fitted-text class="mode-name" text="${game.mode}" max-width="250"></fitted-text>
                        <div class="stage-name">${game.stage}</div>
                    </div>
                </div>
            `;
        }

        if (nextMatchesContainer.innerHTML === '') {
            nextMatchesContainer.innerHTML = gamesHtml;
            nextRoundUpdateTl.add(gsap.to('.matches-container > .match', { duration: 0.35, opacity: 1 }));
        } else {
            nextRoundUpdateTl.add(gsap.to('.matches-container > .match', { opacity: 0, duration: 0.35, onComplete: () => {
                nextMatchesContainer.innerHTML = gamesHtml;
                nextRoundUpdateTl.add(gsap.to('.matches-container > .match', { opacity: 1, duration: 0.35 }));
            } }));
        }

        roundSizeElem.innerText = `${newValue.games.length} matches total`;
    });
});
