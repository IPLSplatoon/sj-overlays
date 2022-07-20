export function easeOutCirc(x: number): number {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
}

export function distanceBetween(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export interface Coordinates {
    x: number
    y: number
}

export function* poissonDiscSampler(
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
