# Sprachy

Sprachy runs on Cloudflare Workers and FaunaDB, a combination of services that allows it to be globally distributed and infinitely scalable.

## Installing dependencies

You will need [node](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/getting-started/install).

Inside the repo, run yarn to install dependencies.

```sh
yarn
```

## Environment setup

Local settings for each instance of sprachy are stored in a `.env` file.

```sh
cp .env.example .env
```

FAUNA_ADMIN_KEY will initially be empty, and automatically populated later.

## Setting up development database

You will need [Docker](https://www.docker.com/products/docker-desktop). Then:

```
docker pull fauna/faunadb:latest
```

## Running development server

```sh
yarn dev
```

After this starts up the Fauna instance, populate the database schema:

```sh
./manage.ts resetdb
```

And that's it! The dev server should now be available at `http://localhost:5999`.

Underneath, `yarn dev` concurrently runs four processes: the Fauna dev docker,
a webpack server for building the client assets, a webpack watch to build the worker,
and miniflare for the dev worker process.

## Optional: configure fauna-shell

You may also want to set up fauna-shell to work with the local database by default.

```
npm install -g fauna-shell
fauna add-endpoint http://localhost:8443/ --alias localhost --key secret
fauna default-endpoint localhost
```