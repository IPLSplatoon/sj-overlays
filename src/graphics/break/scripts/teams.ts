import { activeBreakScene, activeRound } from '../../helpers/replicants';
import { doOnDifference } from '../../helpers/object';
import { elementById } from '../../helpers/elem';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import escape from 'lodash/escape';
import isEmpty from 'lodash/isEmpty';

interface Player {
    name: string;
    pronouns?: string;
}

const teamATimeline = gsap.timeline();
const teamBTimeline = gsap.timeline();

const teamANameElem = elementById<FittedText>('team-a-name');
const teamBNameElem = elementById<FittedText>('team-b-name');

const teamTimelines = {
    a: teamATimeline,
    b: teamBTimeline
};

export let splitTeamAName = new SplitText('#team-a-name > div', { type: 'words' });
export let splitTeamBName = new SplitText('#team-b-name > div', { type: 'words' });

activeRound.on('change', (newValue, oldValue) => {
    if (!oldValue) {
        addPlayerElems(newValue.teamA.players, 'a');
        addPlayerElems(newValue.teamB.players, 'b');
    } else {
        doOnDifference(newValue,  oldValue, 'teamA.players', (players: Player[]) => {
            animatePlayers(players, 'a');
        });

        doOnDifference(newValue,  oldValue, 'teamB.players', (players: Player[]) => {
            animatePlayers(players, 'b');
        });
    }

    doOnDifference(newValue, oldValue, 'teamA.name', (name: string) => {
        gsap.to(splitTeamAName.words, { y: 100, duration: 0.5, stagger: { amount: 0.1 }, ease: 'power2.in', onComplete: () => {
            teamANameElem.text = name;
            splitTeamAName = new SplitText('#team-a-name > div', { type: 'words' });
            gsap.set(splitTeamAName.words, { y: 100 });
            if (activeBreakScene.value === 'teams') {
                gsap.to(splitTeamAName.words, { y: 0, duration: 0.5, stagger: { amount: 0.1 }, ease: 'power2.out' });
            }
        } });
    });

    doOnDifference(newValue, oldValue, 'teamB.name', (name: string) => {
        gsap.to(splitTeamBName.words, { y: 100, duration: 0.5, stagger: { amount: 0.1 }, ease: 'power2.in', onComplete: () => {
            teamBNameElem.text = name;
            splitTeamBName = new SplitText('#team-b-name > div', { type: 'words' });
            gsap.set(splitTeamBName.words, { y: 100 });
            if (activeBreakScene.value === 'teams') {
                gsap.to(splitTeamBName.words, { y: 0, duration: 0.5, stagger: { amount: 0.1 }, ease: 'power2.out' });
            }
        } });
    });
});

function animatePlayers(players: Player[], team: 'a' | 'b') {
    const timeline = teamTimelines[team];
    timeline.add(gsap.to(`.team-${team}-player`, { duration: 0.35, opacity: 0, onComplete: () => {
        addPlayerElems(players, team);

        if (activeBreakScene.value === 'teams') {
            timeline.addLabel('teamsIn');
            timeline.add(gsap.to(`.team-${team}-player`, { duration: 0.5, x: 0, opacity: 1, stagger: 0.05 }), 'teamsIn');
        }
    } }));
}

function addPlayerElems(players: Player[], team: 'a' | 'b') {
    const playerContainer = elementById(`team-${team}-players`);
    playerContainer.innerHTML = '';

    players.forEach(player => {
        const playerElem = document.createElement('fitted-text') as FittedText;
        playerElem.classList.add(`team-${team}-player`);
        playerElem.maxWidth = 450;
        if (!isEmpty(player.pronouns)) {
            playerElem.text = `${escape(player.name)} <span class="pronoun">${player.pronouns}</span>`;
        } else {
            playerElem.text = escape(player.name);
        }
        playerContainer.appendChild(playerElem);
        playerElem.useInnerHTML = true;
        playerElem.style.opacity = '0.0';
    });
}
