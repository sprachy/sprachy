<script setup lang="ts">
const vueApp = getCurrentInstance()!.appContext.app
const origErrorHandler = vueApp.config.errorHandler

const state = defineState({
  error: null as Error | null,
})

function receiveUnhandledError(err: unknown) {
  try {
    if (err instanceof Error) {
      state.error = err
    } else {
      state.error = new Error((err as any).toString())
    }
    return true
  } catch (extraScaryError) {
    console.error("Error while handling error!", extraScaryError)
    return true
  }
}

function onUnhandledError(ev: ErrorEvent) {
  receiveUnhandledError(ev.error)
  ev.preventDefault()
}

function onUnhandledRejection(ev: PromiseRejectionEvent) {
  // There's not much point showing weird undefined rejections to the user
  if (!ev.reason) {
    console.warn(ev)
    return
  }

  receiveUnhandledError(ev.reason)
  ev.preventDefault()
}

function onVueError(err: unknown) {
  receiveUnhandledError(err)
}

onBeforeMount(() => {
  window.addEventListener('error', onUnhandledError)
  window.addEventListener('unhandledrejection', onUnhandledRejection)

  // Vue traps errors when NODE_ENV is production! So we only
  // see unhandledrejections from components in dev.
  // https://github.com/vuejs/core/blob/ae4b0783d78670b6e942ae2a4e3ec6efbbffa158/packages/runtime-core/src/errorHandling.ts#L163
  vueApp.config.errorHandler = onVueError
})

onBeforeUnmount(() => {
  window.removeEventListener('error', onUnhandledError)
  window.removeEventListener('unhandledrejection', onUnhandledRejection)
  vueApp.config.errorHandler = origErrorHandler
})
</script>

<template>
  <ErrorModal v-if="state.error" :error="state.error" @hidden="state.error = null" />
  <slot v-else />
</template>