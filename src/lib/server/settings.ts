import _ from "lodash"

// Will be configured by hooks.ts when the env comes in
export const _settings: Partial<App.SprachyEnvironment> = {}

export function expectSettings(): App.SprachyEnvironment {
  if (_.isEmpty(_settings)) {
    throw new Error("Expected settings to already be present")
  }

  return _settings as App.SprachyEnvironment
}