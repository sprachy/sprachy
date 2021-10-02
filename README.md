# Vokabon

Vokabon runs on Cloudflare Workers and FaunaDB, a combination of services that allows it to be globally distributed and infinitely scalable.

1. You will need [node](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/getting-started/install).

2. Inside the repo, run yarn to install dependencies.

    ```sh
    yarn
    ```

4. Run the webpack development server to build client assets.

    ```sh
    yarn client
    ```

3. Concurrently (e.g. in another terminal) run the backend http server.

    ```sh
    yarn server
    ```

That's it! The dev server should now be available at `http://localhost:5999`.