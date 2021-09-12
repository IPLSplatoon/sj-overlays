# sj-overlays

Broadcast overlays for SuperJump, a Splatoon tournament by Inkling Performance Labs.

## Setup

- Set up `ipl-overlay-controls` using the [install guide.](https://github.com/inkfarer/ipl-overlay-controls#readme)
- Ensure you have access to the private GSAP registry: [Guide](https://greensock.com/docs/v3/Installation#private)

### Pre-built version (For production use)

- Clone the `build` branch of this repository to `[nodecg]/bundles/sj-overlays`
- Install dependencies: `npm i --production`

### Build manually

- Clone this repository to `[nodecg]/bundles/sj-overlays`
- Install dependencies: `npm i`
- Run build: `npm run build`

#### Other npm commands

- `build`: Create a production-ready build.
- `devbuild`: Create a development build with better debugging options.
- `clean`: Removes built files.
- `cleanbuild`: Combines `build` and `clean` tasks.
- `start`: Starts NodeCG.
- `watch`: Runs a build and rebuilds when changes are found.
- `lint`: Checks for linter errors
- `fix`: Automatically fixes some linter errors
