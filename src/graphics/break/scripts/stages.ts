import { activeBreakScene, activeRound } from '../../helpers/replicants';
import { doOnDifference, doOnNoDifference, doOnOneOrMoreDifference } from '../../helpers/object';
import { elementById } from '../../helpers/elem';
import { colors, getIconFromMode, mapNameToImagePath } from '../../helpers/constants';
import { hexToRgb, Solver } from '../../helpers/color';
import { textOpacitySwap } from '../../helpers/anim';
import { gsap } from 'gsap';
import { ActiveRound } from 'schemas';
import { loadImage } from '../../helpers/image';
import { hideStageElems, sceneChangeTl, showStageElems } from './sceneSwitcher';

type GameWinner = 'none' | 'alpha' | 'bravo';

const stageGrid = elementById('stage-grid');

const scoreUpdateTls: Record<'a' | 'b', gsap.core.Timeline> = {
    a: gsap.timeline(),
    b: gsap.timeline()
};

const stageUpdateTls: Record<string, gsap.core.Timeline> = {
    all: gsap.timeline(),
    '0': gsap.timeline(),
    '1': gsap.timeline(),
    '2': gsap.timeline(),
    '3': gsap.timeline(),
    '4': gsap.timeline(),
    '5': gsap.timeline(),
    '6': gsap.timeline(),
};

NodeCG.waitForReplicants(activeBreakScene, activeRound).then(() => {
    activeRound.on('change', async (newValue, oldValue) => {
        let teamANameDiffers = false;
        let teamBNameDiffers = false;

        doOnDifference(newValue, oldValue, 'teamA.name', (name: string) => {
            teamANameDiffers = true;
            textOpacitySwap(name, elementById('stages-scoreboard__team-a-name'));
        });

        doOnDifference(newValue, oldValue, 'teamB.name', (name: string) => {
            teamBNameDiffers = true;
            textOpacitySwap(name, elementById('stages-scoreboard__team-b-name'));
        });

        doOnDifference(newValue, oldValue, 'teamA.score', (newScore: number, oldScore: number) => {
            animUpdateScore(newScore, oldScore, 'a');
        });

        doOnDifference(newValue, oldValue, 'teamB.score', (newScore: number, oldScore: number) => {
            animUpdateScore(newScore, oldScore, 'b');
        });

        const isNewRound = newValue.match.id !== oldValue?.match.id;
        if (isNewRound) {
            await animNewRound(newValue);
        }

        for (let i = 0; i < newValue.games.length; i++) {
            doOnDifference(newValue, oldValue, `games[${i}].winner`, (winner: GameWinner, oldWinner: GameWinner) => {
                setWinner(i, winner, oldWinner);
            });

            doOnNoDifference(newValue, oldValue, `games[${i}].winner`, (winner: GameWinner) => {
                if ((teamANameDiffers && winner === 'alpha') || (teamBNameDiffers && winner === 'bravo')) {
                    setWinner(i, winner, winner);
                }
            });

            if (!isNewRound) {
                doOnOneOrMoreDifference(newValue, oldValue, [ `games[${i}].stage`, `games[${i}].mode` ], () => {
                    setGameData(i, newValue.games[i]);
                });
            }
        }
    });
});

const stageStyles: Record<string, { width: number, gap: number, stageWidth: number }> = {
    '3': {
        width: 1100,
        gap: 60,
        stageWidth: 326
    },
    '5': {
        width: 1400,
        gap: 30,
        stageWidth: 256
    },
    '7': {
        width: 1750,
        gap: 30,
        stageWidth: 224
    }
};

function animUpdateScore(newScore: number, oldScore: number, team: 'a' | 'b') {
    const scoreElem = elementById<FittedText>(`stages-scoreboard__team-${team}-score`);
    const posYTo = newScore > oldScore ? 75 : -75;
    const posYFrom = newScore > oldScore ? -75 : 75;
    const timeline = scoreUpdateTls[team];

    timeline.add(gsap.to(scoreElem, { duration: 0.35, y: posYTo, ease: 'power2.in', onComplete: () => {
        gsap.set(scoreElem, { y: posYFrom });
        scoreElem.text = newScore.toString();
    } }));
    timeline.add(gsap.to(scoreElem, { duration: 0.35, y: 0, ease: 'power2.out' }));
}

function createStages(games: { winner: GameWinner, mode: string, stage: string }[]): void {
    const style = stageStyles[games.length.toString()];
    const w = style.stageWidth;
    stageGrid.style.width = `${style.width}px`;
    stageGrid.style.gridTemplateColumns = `repeat(${games.length}, 1fr)`;
    stageGrid.style.gap = `${style.gap}px`;

    let stagesHtml = '';

    games.forEach((game, index) => {
        const stageImageFilter = getStageImageFilter(game.winner);

        stagesHtml += `
            <div class="stage layout vertical c-horiz" id="stage_${index}">
                <div class="background" style="width: 0"></div>
                <svg viewBox="0 0 ${style.stageWidth + 20} 620">
                    <path class="stage-border stage-border-color stage-border_${index}"
                          d="M${(w + 4) / 2},2
                             L28,2
                             C13.471,2 2,15.542 2,32.222
                             L2,572
                             C2,588.458 13.471,602 27.6,602
                             L${w - 24},602
                             C${w - 10}.529,602 ${w + 2},588.458 ${w + 2},571.778
                             L${w + 2},32
                             C${w + 2},15.542 ${w - 10}.529,2 ${w - 24}.4,2
                             L${(w + 4) / 2},2"
                          style="fill:none;stroke:${colors.blue};stroke-width:4px;"/>
                    <path class="stage-border stage-border-white stage-border_${index}"
                          d="M${(w + 4) / 2},2
                             L28,2
                             C13.471,2 2,15.542 2,32.222
                             L2,572
                             C2,588.458 13.471,602 27.6,602
                             L${w - 24},602
                             C${w - 10}.529,602 ${w + 2},588.458 ${w + 2},571.778
                             L${w + 2},32
                             C${w + 2},15.542 ${w - 10}.529,2 ${w - 24}.4,2
                             L${(w + 4) / 2},2"
                          style="fill:none;stroke:#fff;stroke-width:2px;"/>
                </svg>
                <div class="stage-content-wrapper">
                    <div class="stage-info-wrapper" style="transform: translate(-100%, 0px); opacity: 0;">
                        <div class="background"></div>
                        <div id="stage-image_${index}" class="stage-image" style="background-image: url('/bundles/sj-overlays/assets/stages/${mapNameToImagePath[game.stage]}'); filter: ${stageImageFilter}"></div>
                        <div id="stage-winner-wrapper_${index}" class="stage-winner-wrapper layout horiz" style="opacity: ${game.winner === 'none' ? '0' : '1'}">
                            <div class="winner-name">${getWinnerName(game.winner)}</div>
                        </div>
                        <div class="stage-line"></div>
                        <div class="stage-info layout vertical c-horiz">
                            <div class="mode-icon layout horiz c-horiz c-vert">
                                <img src="${getIconFromMode(game.mode)}">
                            </div>
                            <fitted-text class="mode-name" text="${game.mode}" max-width="${style.stageWidth - 30}"></fitted-text>
                            <div class="stage-name-wrapper layout horiz c-vert">
                                <div class="stage-name">${game.stage}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    });

    stageGrid.innerHTML = stagesHtml;
    gsap.set('.stage-border', { drawSVG: '50% 50%' });
    games.forEach((game, index) => {
        setWinner(index, game.winner, undefined);
    });
}

function getWinnerName(winner: GameWinner) {
    if (winner === 'alpha') {
        return activeRound.value.teamA.name;
    } else if (winner === 'bravo') {
        return activeRound.value.teamB.name;
    } else {
        return '';
    }
}

function getStageImageFilter(winner: GameWinner) {
    return winner === 'none' ? 'blur(0px) saturate(1)' : 'blur(2px) saturate(0.5)';
}

function setWinner(index: number, winner: GameWinner, oldWinner: GameWinner) {
    const winnerWrapper = elementById(`stage-winner-wrapper_${index}`);
    if (!winnerWrapper) return;
    const stageImageFilter = getStageImageFilter(winner);
    const winnerOpacity = winner === 'none' ? '0' : '1';
    const stageImage = elementById(`stage-image_${index}`);
    const winnerText = winnerWrapper.querySelector('.winner-name') as HTMLElement;
    const timeline = stageUpdateTls[index];
    const winnerName = getWinnerName(winner);

    timeline.addLabel('add').addLabel('setColor');

    if (oldWinner === 'none' || !oldWinner) {
        winnerText.innerText = winnerName;
    }

    if (oldWinner === 'none' || winner === 'none') {
        timeline.add(gsap.to(stageImage, { filter: stageImageFilter, duration: 0.5 }), 'add')
            .add(gsap.to(winnerWrapper, { opacity: winnerOpacity, duration: 0.5 }), 'add');
    } else {
        timeline.add(gsap.to(winnerText, { duration: 0.35, opacity: 0, onComplete: () => {
            winnerText.innerText = winnerName;
        } }))
            .add(gsap.to(winnerText, { duration: 0.35, opacity: 1 }));
    }

    if (winner === 'none') {
        setStageBorderColor(index, colors.blue);
    } else {
        setStageBorderColor(index, winner === 'alpha' ? colors.red : colors.green);
    }
}

function setStageBorderColor(index: number, color: string): void {
    const elemId = `#stage_${index}`;
    const timeline = stageUpdateTls[index];
    const dropShadowFilter = `drop-shadow(0 0 3px ${color}) drop-shadow(0 0 5px ${color})`;
    const colorFilter = new Solver(hexToRgb(color)).solve().filter;

    timeline.add(gsap.to(`${elemId} .stage-border-color`, { stroke: color, duration: 0.5 }), 'setColor')
        .add(gsap.to(`${elemId} svg`, { filter: dropShadowFilter, duration: 0.5 }), 'setColor')
        .add(gsap.to(`${elemId} .stage-line`, { border: `1px solid ${color}`, filter: dropShadowFilter, duration: 0.5 }), 'setColor')
        .add(gsap.to(`${elemId} .mode-icon`, { duration: 0.5, filter: colorFilter }), 'setColor');
}

async function animNewRound(activeRound: ActiveRound): Promise<void> {
    const imageLoads: Promise<void>[] = [];
    activeRound.games.forEach(game => {
        imageLoads.push(loadImage(`/bundles/sj-overlays/assets/stages/${mapNameToImagePath[game.stage]}`));
    });

    await Promise.all(imageLoads);

    sceneChangeTl.addLabel('sceneOut');
    hideStageElems(() => {
        createStages(activeRound.games);
        if (activeBreakScene.value === 'stages') {
            sceneChangeTl.addLabel('sceneIn');
            showStageElems();
        }
    });
}

async function setGameData(index: number, game: { mode: string, stage: string }): Promise<void> {
    const tl = stageUpdateTls[index];
    const stageElem = elementById(`stage_${index}`);
    const stageNameElem = stageElem.querySelector('.stage-name') as HTMLElement;
    const stageModeElem = stageElem.querySelector('.mode-name') as FittedText;
    const stageModeIconElem = stageElem.querySelector('.mode-icon img') as HTMLImageElement;
    const stageImageElem = stageElem.querySelector('.stage-image') as HTMLElement;
    const stageLine = stageElem.querySelector('.stage-line');
    const stageData = stageElem.querySelector('.stage-info');
    const winnerWrapper = stageElem.querySelector('.stage-winner-wrapper');
    const background = stageElem.querySelector('.background') as HTMLElement;
    const iconUrl = getIconFromMode(game.mode);
    const stageUrl = `/bundles/sj-overlays/assets/stages/${mapNameToImagePath[game.stage]}`;

    await loadImage(stageUrl);
    if (iconUrl !== '') {
        await loadImage(iconUrl);
    }

    tl.addLabel('stageOut').addLabel('stageIn', '+=0.5');

    background.style.alignSelf = 'flex-start';
    tl.add(gsap.to([stageImageElem, stageLine, stageData, winnerWrapper], { duration: 0.35, x: '-100%', ease: 'power2.in' }), 'stageOut')
        .add(gsap.to(background, { duration: 0.35, width: 0, ease: 'power2.in', onComplete: () => {
            stageNameElem.innerText = game.stage;
            stageModeElem.text = game.mode;
            stageModeIconElem.src = iconUrl;
            stageImageElem.style.backgroundImage = `url('${stageUrl}')`;
            background.style.alignSelf = 'flex-end';
            gsap.set([stageImageElem, stageLine, stageData, winnerWrapper], { x: '100%' });
        } }), 'stageOut')
        .add(gsap.to([stageImageElem, stageLine, stageData, winnerWrapper], { duration: 0.35, x: 0, ease: 'power2.out' }), 'stageIn');
    if (activeBreakScene.value === 'stages') {
        tl.add(gsap.to(background, { duration: 0.35, width: '100%', ease: 'power2.out' }), 'stageIn');
    }
}
