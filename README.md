# Sprachy 🇩🇪🐿

Sprachy is a web app for learning German. It focuses on explaining the _patterns_ in the language: how new words get created, predicting grammatical gender for nouns you haven't seen before, the ordering of sentences, and so on.

We try to use some particularly dorky characters and examples, since humans are geared to remember surprising story-like things!

## Reuse

The code is licensed under MIT, while the content is CC-BY. If you want to make your own learny website about something else based on Sprachy code then feel free! However, we'd prefer if people didn't copy actual lesson content or custom assets. If you make use of the content, please link back to us to indicate where it came from.

## Developing Sprachy

Sprachy is built with [Nuxt 3](https://nuxt.com/docs/getting-started/introduction) using the [cloudflare_pages](https://nitro.unjs.io/deploy/providers/cloudflare#cloudflare-pages) Nitro preset for deployment. The database is provided by the SQLite variant [Cloudflare D1](https://developers.cloudflare.com/d1/). This architecture lets the site run fully serverless in production, independent from any particular geographic region. Note that some of these dependencies are still pretty new and they may break in odd ways!

### Installing dependencies

You will need [node](https://nodejs.org/en/) and [@antfu/ni](https://github.com/antfu/ni).

Inside the repo, use ni to install dependencies.

```sh
ni
```

### Local env config

Local settings for development instances of sprachy are stored in a `.env` 
file, which isn't tracked by git. You need to create this file by copying the
example one.

```sh
cp .env.example .env
```

### Setting up development database

In development, the database is just a local file at `db/dev.db`. Run migrations to generate it:

`nr migrate`


### Running development server

```sh
nr dev
```

And that's it! The dev server should now be available at `http://localhost:5999`.

### Running tests

```sh
nr test
```

This uses [vitest](https://vitest.dev/) to run tests under the `test` directory.
It will automatically create an isolated child database and spawn a nuxt
dev server connected to it, so tests should work out of the box so long as your
dev environment is configured correctly.

For writing tests, it's important to note that the server runs in a
separate process to the test code, so you can't share global variables
between them.

### Adding images

First install the cwebp tool to optimize images in webp format.

```sh
brew install webp
```

Then you can add images with the little script.

`scripts/add-image.sh <path-to-input-image> <output-image-name>`

