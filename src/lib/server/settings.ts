import _ from "lodash"

// Will be configured by hooks.ts when the env comes in
export const _settings: Partial<App.SprachyEnvironment> = {}

export function expectSettings(): App.SprachyEnvironment {
  if (_.isEmpty(_settings)) {
    throw new Error("Expected settings to already be present")
  }

  return _settings as App.SprachyEnvironment
}

export function prepareSettings(env: any) {
  // Double check some environment variables
  const { FRONTEND_BASE_URL, STORE, FAUNA_ADMIN_KEY, MAILGUN_SECRET, DISCORD_SIGNUP_WEBHOOK } = env

  if (!FRONTEND_BASE_URL) {
    throw new Error("No FRONTEND_BASE_URL set; Sprachy doesn't know how to make links")
  }

  // if (!prerendering && !STORE) {
  //   throw new Error("Couldn't access KV STORE; can't store sessions")
  // }

  // if (!prerendering && !FAUNA_ADMIN_KEY) {
  //   throw new Error("No FAUNA_ADMIN_KEY set; can't connect to db")
  // }

  // Put the environment variables into globally accessible settings
  const filledSettings: App.SprachyEnvironment = {
    STORE,
    FAUNA_ADMIN_KEY,
    FRONTEND_BASE_URL,
    MAILGUN_SECRET,
    DISCORD_SIGNUP_WEBHOOK
  }
  Object.assign(_settings, filledSettings)

}