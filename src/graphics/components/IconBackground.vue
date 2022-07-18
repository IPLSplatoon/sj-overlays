<template>
    <canvas
        ref="iconBackgroundCanvas"
        class="icon-background-canvas"
    />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import gsap from 'gsap';
import * as PIXI from '../helpers/pixi';
import { APP_HEIGHT, APP_WIDTH } from '../helpers/constants';
import { distanceBetween, easeOutCirc, poissonDiscSampler } from '../helpers/math';
import random from 'lodash/random';
import min from 'lodash/min';
import maxBy from 'lodash/maxBy';
import sample from 'lodash/sample';
import { addToObjectOfArrays } from '../helpers/object';
import { bindEntranceToFunction } from '../helpers/obs';

function createApplication(canvas: HTMLCanvasElement): PIXI.Application {
    const app = new PIXI.Application({
        width: APP_WIDTH,
        height: APP_HEIGHT,
        view: canvas,
        backgroundColor: 0x3d1a4b
    });

    app.ticker.stop();
    gsap.ticker.add((time) => {
        app.ticker.update(time);
    });

    return app;
}

const CONTAINER_SIZE = 2115;
function createIconContainer(): PIXI.Container {
    const container = new PIXI.Container();
    container.width = CONTAINER_SIZE;
    container.height = CONTAINER_SIZE;
    container.pivot.set(CONTAINER_SIZE / 2, CONTAINER_SIZE / 2);
    container.x = APP_WIDTH / 2;
    container.y = APP_HEIGHT / 2;

    return container;
}

function initBackground(container: PIXI.Container): void {
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
        addToObjectOfArrays(spritesByColor, color, sprite);
        container.addChild(sprite);
    }
}

export default defineComponent({
    name: 'IconBackground',

    setup() {
        const iconBackgroundCanvas = ref<HTMLCanvasElement>();

        onMounted(() => {
            const app = createApplication(iconBackgroundCanvas.value);

            const container = createIconContainer();
            app.stage.addChild(container);
            const bgSpinTween = gsap.to(container, {
                duration: 8,
                pixi: { angle: 360 },
                repeat: -1,
                ease: 'none'
            });

            const backgroundAnimTimeline = gsap.timeline();
            const animInDelay = window.obsstudio ? 1.75 : 0.25;

            function animBackgroundIn(): void {
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

                initBackground(container);

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

            PIXI.Loader.shared
                .add('bg-icons', '/bundles/sj-overlays/assets/sj-bg-icons.json')
                .load(() => {
                    animBackgroundIn();
                });

            bindEntranceToFunction((event) => {
                if (event.detail.active || event.detail.visible) {
                    animBackgroundIn();
                }
            });
        });

        return {
            iconBackgroundCanvas
        };
    }
});
</script>

<style>
.icon-background-canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -999;
}
</style>
