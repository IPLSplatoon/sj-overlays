import * as PIXI from '../../helpers/pixi';
import { app } from '../main';
import sample from 'lodash/sample';
import min from 'lodash/min';
import maxBy from 'lodash/maxBy';
import random from 'lodash/random';
import { gsap } from 'gsap';
import '../../types/obs';
import { APP_HEIGHT, APP_WIDTH } from '../../helpers/constants';
import { distanceBetween, easeOutCirc } from '../../helpers/math';

interface Coordinates {
    x: number
    y: number
}

const CONTAINER_SIZE = 2115;
const container = new PIXI.Container();
container.width = CONTAINER_SIZE;
container.height = CONTAINER_SIZE;
container.pivot.set(CONTAINER_SIZE / 2, CONTAINER_SIZE / 2);
container.x = APP_WIDTH / 2;
container.y = APP_HEIGHT / 2;
const backgroundAnimTimeline = gsap.timeline({ id: 'bganim' });
const animInDelay = window.obsstudio ? 1.75 : 0.25;

let bgSpinTween: gsap.core.Tween;

window.addEventListener('DOMContentLoaded', () => {
    bgSpinTween = gsap.to(container, {
        duration: 8,
        pixi: { angle: 360 },
        repeat: -1,
        ease: 'none'
    });
});

export function initBackground(): void {
    const colors = [ 0xE03E81, 0x72E98A, 0xAD70EB, 0x5FBFF9, 0xF88D4F ];
    const sampler = poissonDiscSampler(2110, 2110, 125);
    const spritesByColor: { [key: number]: PIXI.Sprite[] } = {};

    let position = sampler.next().value;
    while (position != null) {
        position = sampler.next().value;
        if (!position) break;

        // Pick out the least used colors
        const colorCounts = colors.reduce((obj: { [key: number]: number }, color) => {
            obj[color] = spritesByColor[color]?.length ?? 0;
            return obj;
        }, {});
        const lowestColorCount = min(Object.values(colorCounts));
        const colorCandidates = Object.entries(colorCounts)
            .filter(count => count[1] === lowestColorCount)
            .map(entry => entry[0]);

        // Pick out the color that is furthest from the given point or one of the least used colors
        const color = Number(maxBy(Object.entries(colorCandidates.reduce((obj: { [key: number]: number }, color) => {
            const clrNum = Number(color);
            obj[clrNum] = min(spritesByColor[clrNum]?.map(sprite => {
                return distanceBetween(position.x, position.y, sprite.x, sprite.y);
            }));
            return obj;
        }, {})), (entry) => entry[1] ?? 0)?.[0] ?? sample(colorCandidates));

        const sprite = new PIXI.Sprite(sample(PIXI.Loader.shared.resources['bg-icons'].spritesheet.textures));
        sprite.tint = color;
        sprite.scale.set(random(0.3, 0.5));
        sprite.x = position.x + 10;
        sprite.y = position.y + 25;
        sprite.anchor.set(0.5);
        sprite.alpha = 0;
        sprite.angle = Math.random() * 360;
        addToObjectArray(spritesByColor, color, sprite);
        container.addChild(sprite);
    }
    app.stage.addChild(container);
}

export function animBackgroundIn(): void {
    backgroundAnimTimeline.clear(true);

    backgroundAnimTimeline
        .addLabel('out')
        .addLabel('in', `+=${animInDelay}`);

    container.children.forEach(child => {
        backgroundAnimTimeline.to(child, {
            pixi: {
                alpha: 0
            },
            duration: 0.15,
            onComplete: () => {
                container.removeChild(child);
            }
        }, 'out');
    });

    initBackground();

    backgroundAnimTimeline.call(() => bgSpinTween.timeScale(1), null, 'in');

    backgroundAnimTimeline.to(bgSpinTween, { timeScale: 8 / 300, duration: 3, ease: 'power3.out' }, 'in');

    container.children.forEach(child => {
        const distanceFromCenter = distanceBetween(CONTAINER_SIZE / 2, CONTAINER_SIZE / 2, child.x, child.y);
        const distanceMultiplier = 1 / (1101 / distanceFromCenter);
        const angleFromCenter = Math.atan2(CONTAINER_SIZE / 2 - child.y, CONTAINER_SIZE / 2 - child.x);
        const newX = child.x + Math.cos(angleFromCenter) * 350 * easeOutCirc(distanceMultiplier);
        const newY = child.y + Math.sin(angleFromCenter) * 350 * easeOutCirc(distanceMultiplier);

        backgroundAnimTimeline.fromTo(child, {
            pixi: {
                x: newX,
                y: newY,
                scale: child.scale.y - 0.5,
                angle: child.angle + random(-90, 90)
            }
        }, {
            duration: 1.5,
            pixi: {
                x: child.x,
                y: child.y,
                scale: child.scale.y,
                alpha: 1,
                angle: child.angle
            },
            ease: 'power3.out',
            delay: distanceMultiplier * 0.9 * random(0.9, 1.1),
            immediateRender: false
        }, 'in');
    });
}

function addToObjectArray<T>(obj: { [key: (string | number)]: T[] }, key: (string | number), newItem: T) {
    if (!obj[key]) {
        obj[key] = [ newItem ];
    } else {
        obj[key].push(newItem);
    }
}

// https://observablehq.com/@techsparx/an-improvement-on-bridsons-algorithm-for-poisson-disc-samp/2
function* poissonDiscSampler(
    width: number,
    height: number,
    radius: number
): Generator<Coordinates> {
    const k = 4;
    const radius2 = radius * radius;
    const cellSize = radius * Math.SQRT1_2;
    const gridWidth = Math.ceil(width / cellSize);
    const gridHeight = Math.ceil(height / cellSize);
    const grid = new Array(gridWidth * gridHeight);
    const queue: Coordinates[] = [];

    // Pick the first sample.
    yield sample(width / 2, height / 2);

    // Pick a random existing sample from the queue.
    pick: while (queue.length) {
        const i = Math.random() * queue.length | 0;
        const parent = queue[i];
        const seed = Math.random();
        const epsilon = 0.0000001;

        // Make a new candidate.
        for (let j = 0; j < k; ++j) {
            const a = 2 * Math.PI * (seed + j / k);
            const r = radius + epsilon;
            const x = parent.x + r * Math.cos(a);
            const y = parent.y + r * Math.sin(a);

            // Accept candidates that are inside the allowed extent
            // and farther than 2 * radius to all existing samples.
            if (0 <= x && x < width && 0 <= y && y < height && far(x, y)) {
                yield sample(x, y);
                continue pick;
            }
        }

        // If none of k candidates were accepted, remove it from the queue.
        const r = queue.pop();
        if (i < queue.length) queue[i] = r;
    }

    function far(x: number, y: number): boolean {
        const i = x / cellSize | 0;
        const j = y / cellSize | 0;
        const i0 = Math.max(i - 2, 0);
        const j0 = Math.max(j - 2, 0);
        const i1 = Math.min(i + 3, gridWidth);
        const j1 = Math.min(j + 3, gridHeight);
        for (let j = j0; j < j1; ++j) {
            const o = j * gridWidth;
            for (let i = i0; i < i1; ++i) {
                const s = grid[o + i];
                if (s) {
                    const dx = s[0] - x;
                    const dy = s[1] - y;
                    if (dx * dx + dy * dy < radius2) return false;
                }
            }
        }
        return true;
    }

    function sample(x: number, y: number): Coordinates {
        grid[gridWidth * (y / cellSize | 0) + (x / cellSize | 0)] = [ x, y ];
        const coordObj = { x, y };
        queue.push(coordObj);
        return coordObj;
    }
}
