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
    doOnDifference(newValue, oldValue, 'teamA.name', (name: string) => {
        textOpacitySwap(name, elementById('team-a-name'));
    });

    doOnDifference(newValue, oldValue, 'teamB.name', (name: string) => {
        textOpacitySwap(name, elementById('team-b-name'));
    });

    doOnDifference(newValue,  oldValue, 'teamA.players', (players: Player[]) => {
        animatePlayers(players, 'a');
    });

    doOnDifference(newValue,  oldValue, 'teamB.players', (players: Player[]) => {
        animatePlayers(players, 'b');
    });
});

function animatePlayers(players: Player[], team: 'a' | 'b') {
    const timeline = teamTimelines[team];
    timeline.add(gsap.to(`.team-${team}-player`, { duration: 0.35, opacity: 0, onComplete: () => {
        const playerContainer = elementById(`team-${team}-players`);
        playerContainer.innerHTML = '';

        players.forEach(player => {
            const playerElem = document.createElement('fitted-text') as FittedText;
            playerElem.classList.add(`team-${team}-player`);
            playerElem.maxWidth = 475;
            playerElem.text = player.name;
            playerContainer.appendChild(playerElem);
            playerElem.style.opacity = '0.0';
        });

        timeline.addLabel('teamsIn');
        timeline.add(gsap.from(`.team-${team}-player`, { duration: 0.5, x: -350, stagger: 0.05, ease: 'power3.out' }), 'teamsIn');
        timeline.add(gsap.to(`.team-${team}-player`, { duration: 0.5, opacity: 1, stagger: 0.05 }), 'teamsIn');
    } }));
}
