import { activeBreakScene } from '../../helpers/replicants';
import { gsap } from 'gsap';

const sceneChangeTl = gsap.timeline();

activeBreakScene.on('change', (newValue, oldValue) => {
    if (oldValue) {
        switch (oldValue) {
            case 'teams':
                hideTeams();
                break;
            default:
                console.log('uhhhhhhh');
        }
    }

    switch (newValue) {
        case 'teams':
            showTeams();
            break;
        default:
            console.log('uhhhh');
    }
});

function showTeams(): void {
    sceneChangeTl.addLabel('teamsIn').addLabel('teamsLineIn', '+=0.35').add('teamsTextIn', '+=0.45');

    sceneChangeTl.add(gsap.to('.teams-wrapper .versus', { duration: 0.4, y: 0, ease: 'power1.out', delay: 0.15 }), 'teamsIn');
    sceneChangeTl.add(gsap.to(['.teams-wrapper .content', '.team-display .background'], { duration: 0.55, height: 470, ease: 'power2.out' }), 'teamsIn');
    sceneChangeTl.add(gsap.to(['.teams-wrapper .content', '.team-display .background'], { duration: 0.10, opacity: 1, ease: 'power2.out' }), 'teamsIn');
    sceneChangeTl.add(gsap.to('.prediction-box', { duration: 0.65, width: 1300, ease: 'power2.out' }), 'teamsIn');
    sceneChangeTl.add(gsap.to('.prediction-box', { duration: 0.1, opacity: 1, ease: 'power2.out' }), 'teamsIn');
    sceneChangeTl.add(gsap.to('#prediction-title', { duration: 0.5, opacity: 1, ease: 'power2.out' }), 'teamsIn');
    sceneChangeTl.add(gsap.to('.teams-wrapper .line.top', { duration: 0.55, width: 375, opacity: 1, ease: 'power2.out' }), 'teamsLineIn');
    sceneChangeTl.add(gsap.to('.teams-wrapper .line.mid', { duration: 0.55, width: 600, opacity: 1, ease: 'power2.out' }), 'teamsLineIn');
    sceneChangeTl.add(gsap.to('.teams-wrapper .content .team-name fitted-text', { duration: 0.5, y: 0, ease: 'power2.out' }), 'teamsTextIn');
    sceneChangeTl.add(gsap.to('.teams-wrapper .content .team-b-player', { duration: 0.5, x: 0, ease: 'power2.out', stagger: 0.1, opacity: 1 }), 'teamsTextIn');
    sceneChangeTl.add(gsap.to('.teams-wrapper .content .team-a-player', { duration: 0.5, x: 0, ease: 'power2.out', stagger: 0.1, opacity: 1 }), 'teamsTextIn');
}

function hideTeams(): void {
    sceneChangeTl.addLabel('teamsTextOut').addLabel('teamsLineOut', '+=0.1').addLabel('teamsOut', '+=0.40');

    sceneChangeTl.add(gsap.to('.teams-wrapper .content .team-a-player', { duration: 0.5, x: -350, ease: 'power2.in', stagger: 0.1, opacity: 0 }), 'teamsTextOut');
    sceneChangeTl.add(gsap.to('.teams-wrapper .content .team-b-player', { duration: 0.5, x: -350, ease: 'power2.in', stagger: 0.1, opacity: 0 }), 'teamsTextOut');
    sceneChangeTl.add(gsap.to('.teams-wrapper .content .team-name fitted-text', { duration: 0.5, y: 100, ease: 'power2.in' }), 'teamsTextOut');
    sceneChangeTl.add(gsap.to(['.teams-wrapper .line.top', '.teams-wrapper .line.mid'], { duration: 0.55, width: 0, opacity: 0, ease: 'power2.in' }), 'teamsLineOut');
    sceneChangeTl.add(gsap.to('.teams-wrapper .versus', { duration: 0.40, y: 200, ease: 'power1.in', delay: 0.15 }), 'teamsOut');
    sceneChangeTl.add(gsap.to(['.teams-wrapper .content', '.team-display .background'], { duration: 0.55, height: 0, ease: 'power2.in' }), 'teamsOut');
    sceneChangeTl.add(gsap.to(['.teams-wrapper .content', '.team-display .background'], { duration: 0.10, opacity: 0, ease: 'power2.in', delay: 0.45 }), 'teamsOut');
    sceneChangeTl.add(gsap.to('.prediction-box', { duration: 0.65, width: 0, ease: 'power2.in' }), 'teamsOut');
    sceneChangeTl.add(gsap.to('.prediction-box', { duration: 0.10, opacity: 0, ease: 'power2.in', delay: 0.55 }), 'teamsOut');
    sceneChangeTl.add(gsap.to('#prediction-title', { duration: 0.5, opacity: 0, ease: 'power2.in' }), 'teamsOut');
}
