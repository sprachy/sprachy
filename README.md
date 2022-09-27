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
npm run initdb
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
It will automatically create an isolated child database and spawn a svelte-kit
dev server connected to it, so tests should work out of the box so long as your
dev environment is configured correctly.

For writing tests, it's important to note that the server runs in a
separate process to the test code, so you can't share global variables
between them.

### Advanced: run FaunaDB locally with Docker

For faster development (and especially tests) you can run a local instance of FaunaDB
using Docker, and connect Sprachy to a database there.

First, download the docker image:

```sh
docker pull fauna/faunadb:latest
```

Start the node running in the background:

```sh
docker run -d --rm --name fauna -p 8443:8443 -p 8084:8084 -v devdb:/var/lib/fauna fauna/faunadb
```

Install `fauna-shell`, and use it to create a local dev database:

```sh
npm i -g fauna-shell
fauna add-endpoint http://localhost:8443/ --alias localhost --key secret
fauna create-database sprachy-dev --endpoint=localhost
fauna create-key sprachy-dev --endpoint=localhost
```

Copy the key from `fauna create-key` as FAUNA_ADMIN_KEY in your `.env`.

