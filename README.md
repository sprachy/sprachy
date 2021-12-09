# Sprachy 🇩🇪🐿

Sprachy is a web app for learning German. It focuses on explaining the _patterns_ in the language: how new words get created, predicting grammatical gender for nouns you haven't seen before, the ordering of sentences, and so on.

We try to use some particularly dorky characters and examples, since humans are geared to remember surprising story-like things!

## Reuse

The code is licensed under MIT, while the content is CC-BY. If you want to make your own learny website about something else based on Sprachy code then feel free! However, we'd prefer if people didn't copy actual lesson content or custom assets. If you make use of the content, please link back to us to indicate where it came from.

## Setting up for development

Sprachy runs on Cloudflare Workers and FaunaDB, a nice combination of "serverless" services that allows it to be globally distributed and infinitely scalable.

### Installing dependencies

You will need [node](https://nodejs.org/en/).

Inside the repo, use npm to install dependencies.

```sh
npm i
```

### Environment setup

Local settings for each instance of sprachy are stored in a `.env` file.

```sh
cp .env.example .env
```

FAUNA_ADMIN_KEY will initially be empty, and automatically populated later.

### Setting up development database

You will need [Docker](https://www.docker.com/products/docker-desktop). Then:

```
docker pull fauna/faunadb:latest
```

### Running development server

```sh
npm run dev
```

After this starts up the Fauna instance, populate the database schema:

```sh
./manage.ts resetdb
```

And that's it! The dev server should now be available at `http://localhost:5999`.

Underneath, `npm run dev` concurrently runs four processes: the Fauna dev docker,
a webpack server for building the client assets, a webpack watch to build the worker,
and miniflare for the dev worker process.

### Optional: configure fauna-shell

You may also want to set up fauna-shell to work with the local database by default.

```
npm install -g fauna-shell
fauna add-endpoint http://localhost:8443/ --alias localhost --key secret
fauna default-endpoint localhost
```
