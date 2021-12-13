import './app.sass'

// @ts-ignore
import App from './App.svelte'
// @ts-ignore
import ErrorPage from './ErrorPage.svelte'
// @ts-ignore
import NotFoundPage from './NotFoundPage.svelte'
import { GlobalErrorHandler, LoginRequiredError, NotFoundError } from './GlobalErrorHandler'

let app: App;

new GlobalErrorHandler({
  onError: (err: any) => {
    // Since Svelte doesn't have component-level error handling, the
    // best we can do is nuke the current context and show an error page.
    try {
      app.$destroy()
    } catch (e) {
      document.body.innerHTML = ''
    }
    if (err instanceof LoginRequiredError || err.response?.status === 401) {
      // Go to login
      localStorage.removeItem("summary")
      window.location.replace("/")
    } else if (err instanceof NotFoundError || err.response?.status === 404) {
      new NotFoundPage({
        target: document.body
      })
    } else {
      new ErrorPage({
        target: document.body,
        props: {
          error: err
        }
      })  
    }
  }
})

app = new App({
  target: document.body
})