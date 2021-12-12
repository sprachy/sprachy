import * as Sentry from '@sentry/browser'
// import { SENTRY_DSN_URL } from "~/settings"
import axios, { AxiosError, AxiosResponse } from 'axios'

const SENTRY_DSN_URL = ''

export type GlobalErrorHandlerOpts = {
  sentryScoper?: (scope: Sentry.Scope) => void
  onError?: (error: Error) => void
}

/** Used for SPA 404s when no actual request is involved */
export class NotFoundError extends Error {
  constructor() {
    super("Not found")
  }
}

/**
 * Global error handling when all else fails. Our last stand against the darkness.
 * This is designed to be reusable in different application contexts, so it shouldn't
 * directly access stuff like user info etc.
 */
export class GlobalErrorHandler {
  constructor(readonly opts: GlobalErrorHandlerOpts = {}) {
    if (SENTRY_DSN_URL) {
      Sentry.init({
        dsn: SENTRY_DSN_URL
      })
    }

    // Track unhandled errors so we can notify the user
    window.addEventListener("error", ev => {
      this.receiveUnhandledError(ev.error)
      ev.preventDefault()
    })
    window.addEventListener('unhandledrejection', ev => {
      // There's not much point showing weird undefined rejections to the user
      if (!ev.reason) {
        console.warn(ev)
        return
      }

      this.receiveUnhandledError(ev.reason)
      ev.preventDefault()
    })
    // Note that we do need this as well as the global handlers
    // as by default vue will trap some errors
    // Vue.config.errorHandler = (err, vm, info) => {
    //   if (this.receiveUnhandledError(err, { hideConsole: false })) {
    //     const util = (Vue as any).util
    //     util.warn(`Error in ${info}: "${err.toString()}"`, vm)
    //   }
    // }
  }

  /**
   * Returns false if we decided to ignore this error.
  */
  receiveUnhandledError(err: Error, opts: { hideConsole: boolean } = { hideConsole: false }): boolean {
    if (err instanceof axios.Cancel) {
      // if (err.message.includes("vue-component")) {
      //   // Warn if it's the default cancellation behavior-- might be good to give it an explicit key
      //   console.warn(err)
      // }
      return false
    }

    if (!opts.hideConsole) {
      console.error(err)
    }

    if (SENTRY_DSN_URL) {
      if (this.opts.sentryScoper)
        Sentry.configureScope(this.opts.sentryScoper)

      const axiosErr = err as AxiosError
      const { response } = axiosErr
      if (response) {
        // If it's an axios error, we can tweak the message to be more informative

        // Don't report 404s to Sentry, they're a bit noisy
        if (response.status !== 404) {
          const detailedErr = new Error(`${response.status} ${response.statusText} from ${axiosErr.config.url}`)
          detailedErr.stack = axiosErr.stack
          Sentry.captureException(detailedErr)
        }
      } else {
        Sentry.captureException(err)
      }

    }

    if (this.opts.onError)
      this.opts.onError(err)

    return true
  }
}