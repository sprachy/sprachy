import { combineProgress } from "~/lib/progress"

export class AuthStatus {
  user: null | User = null

  constructor() {
    $debug.authStatus = this

    watch(() => this.user, (user) => {
      clientStorage.setJSON('user', user)
    })
  }

  loadLocalUser() {
    this.user = clientStorage.getJSON('user') as User
  }

  async refresh() {
    const whoami = await api.whoami()
    if (whoami.status === 'guest') {
      this.user = null
    } else {
      this.user = whoami.user
      progressStore.progressItems = combineProgress(progressStore.progressItems, whoami.progressItems)
      progressStore.saveLocalProgress()
      progressStore.updateCurrentLearnable()
    }
  }
}

export const authStatus = defineState(new AuthStatus())