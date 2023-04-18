# Sprachy 🇩🇪🐿

Sprachy is an experimental web app for learning German using visual [comprehensible input](https://en.wikipedia.org/wiki/Input_hypothesis) exercises. We aim to connect language concepts directly to the underlying ideas, the way native speakers learn, instead of relying too much on translation as a teaching tool.

## Reuse

The code is licensed under MIT, while the content is CC-BY. If you want to make your own learny website about something else based on Sprachy code then feel free! However, we'd prefer if people didn't copy actual lesson content or custom assets. If you make use of the content, please link back to us to indicate where it came from.

## Developing Sprachy

Sprachy is built with [Nuxt 3](https://nuxt.com/) and deployed to [Cloudflare Workers](https://workers.cloudflare.com/). We use [TypeScript](https://www.typescriptlang.org/) on both the frontend and backend. Note that edge workers don't run in a node execution context, so backend code will look a little different if you're used to node.js.

### Installing dependencies

You will need [node](https://nodejs.org/en/).

Inside the repo, use npm to install dependencies.

```sh
npm i
```

### Local env config

Local settings for development instances of sprachy are stored in a `.env` 
file, which isn't tracked by git. You need to create this file by copying the
example one.

```sh
cp .env.example .env
```

### Running development server

```sh
npm run dev
```

And that's it! The dev server should now be available at `http://localhost:5999`.

### Running tests

```sh
npm run test
```

This uses [vitest](https://vitest.dev/) to run tests under the `test` directory.

For writing tests, it's important to note that the server runs in a
separate process to the test code, so you can't share global variables
between them.


### Sqlite diffs

The dev sqlite db at `prisma/dev.db` is committed to the git repo and contains
the canonical definitions for all exercises. The relevant data is uploaded from
the dev db to the live db on deployment.

This is a binary file, but you can get `git diff` to show changes to it by adding
the following in your `.git/config`:

```gitconfig
[diff "sqlite3"]
    binary = true
    textconv = "echo .dump | sqlite3"
```

### Adding images

First install the cwebp tool to optimize images in webp format.

```sh
brew install webp
```

Then you can add images with the little script.

`scripts/add-image.sh <path-to-input-image> <output-image-name>`
