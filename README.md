# sj-overlays

Broadcast overlays for SuperJump, a Splatoon tournament by Inkling Performance Labs.

## Setup

- Set up `ipl-overlay-controls` using the [installation guide.](https://github.com/inkfarer/ipl-overlay-controls#readme)
- To properly see blur effects in older versions of OBS (before 27.2), add `--enable-experimental-web-platform-features` to your OBS launch parameters.
  On Windows, create a new shortcut to the OBS executable and add the parameter to the "Target" field of the shortcut: [Image example](https://i.imgur.com/ZrWHMV3.png)
- To properly see blur effects in older versions of Chrome (Particularly ones not supporting [backdrop-filter](https://caniuse.com/css-backdrop-filter)), enable "Experimental Web Platform features" in `chrome://flags/`

### Pre-built version (For production use)

- Clone the `build` branch of this repository to `[nodecg]/bundles/sj-overlays`
- All done!

### Build manually

- Ensure you have access to the private GSAP registry ('Shockingly' tier at minimum): [Guide](https://greensock.com/docs/v3/Installation#private)
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
