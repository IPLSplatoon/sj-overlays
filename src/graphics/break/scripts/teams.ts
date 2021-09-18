import { activeRound } from '../../helpers/replicants';
import { doOnDifference } from '../../helpers/object';
import { textOpacitySwap } from '../../helpers/anim';
import { elementById } from '../../helpers/elem';
import { gsap } from 'gsap';

interface Player {
    name: string;
}

const teamATimeline = gsap.timeline();
const teamBTimeline = gsap.timeline();

const teamTimelines = {
    a: teamATimeline,
    b: teamBTimeline
};

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
        textOpacitySwap(name, elementById('team-a-name'));
    });

    doOnDifference(newValue, oldValue, 'teamB.name', (name: string) => {
        textOpacitySwap(name, elementById('team-b-name'));
    });
});

function animatePlayers(players: Player[], team: 'a' | 'b') {
    const timeline = teamTimelines[team];
    timeline.add(gsap.to(`.team-${team}-player`, { duration: 0.35, opacity: 0, onComplete: () => {
        addPlayerElems(players, team);

        timeline.addLabel('teamsIn');
        timeline.add(gsap.to(`.team-${team}-player`, { duration: 0.5, x: 0, opacity: 1, stagger: 0.05 }), 'teamsIn');
    } }));
}

function addPlayerElems(players: Player[], team: 'a' | 'b') {
    const playerContainer = elementById(`team-${team}-players`);
    playerContainer.innerHTML = '';

    players.forEach(player => {
        const playerElem = document.createElement('fitted-text') as FittedText;
        playerElem.classList.add(`team-${team}-player`);
        playerElem.maxWidth = 450;
        playerElem.text = player.name;
        playerContainer.appendChild(playerElem);
        playerElem.style.opacity = '0.0';
    });
}
