# Sprachy 🇩🇪🐿

Sprachy is a web app for learning German. It focuses on explaining the _patterns_ in the language: how new words get created, predicting grammatical gender for nouns you haven't seen before, the ordering of sentences, and so on.

We try to use some particularly dorky characters and examples, since humans are geared to remember surprising story-like things!

## Reuse

The code is licensed under MIT, while the content is CC-BY. If you want to make your own learny website about something else based on Sprachy code then feel free! However, we'd prefer if people didn't copy actual lesson content or custom assets. If you make use of the content, please link back to us to indicate where it came from.

## Developing Sprachy

Sprachy is built with [SvelteKit](https://kit.svelte.dev/docs/introduction) using [adapter-cloudflare-workers](https://github.com/sveltejs/kit/tree/master/packages/adapter-cloudflare-workers). The database is provided by [FaunaDB](https://fauna.com/). This architecture lets the site run fully serverless in production, independent from any particular geographic region. Note that some of these dependencies are still pretty new and they may break in odd ways!

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

### Setting up development database

Create or log in to a [Fauna](https://fauna.com/) account, and go to Create
Database. Give it a name like "sprachy-dev" and set the Region Group to
Classic.

Then go to the Security tab and create a new Admin key. Copy the secret key
from there into the `.env` file where it says `FAUNA_ADMIN_KEY=`.

Now we can populate the dev database with the schema:

```sh
npm run resetdb
```

### Running development server

```sh
npm run dev
```

And that's it! The dev server should now be available at `http://localhost:5999`.
