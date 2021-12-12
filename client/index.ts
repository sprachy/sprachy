import './app.sass'

// @ts-ignore
import App from './App.svelte'
// @ts-ignore
import ErrorPage from './ErrorPage.svelte'
import { GlobalErrorHandler } from './GlobalErrorHandler'

let app: App;

new GlobalErrorHandler({
  onError: (err: Error) => {
    // Since Svelte doesn't have component-level error handling, the
    // best we can do is nuke the current context and show an error page.
    try {
      app.$destroy()
    } catch (e) {
      document.body.innerHTML = ''
    }
    new ErrorPage({
      target: document.body,
      props: {
        error: err
      }
    })
  }
})

app = new App({
  target: document.body
})