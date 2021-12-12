<script lang="ts">
  import { Router, Link, Route } from "svelte-navigator"
  import sprachy from "./sprachy"
  import FAQPage from "./FAQPage.svelte"
  import FrontPage from "./FrontPage.svelte"
  import { globalErrorHandler } from "./globalErrorHandling"
  import HomePage from "./HomePage.svelte"
  import LearnPage from "./LearnPage.svelte"
  import ReviewPage from "./ReviewPage.svelte"
  import PatternPage from "./PatternPage.svelte"
  import PracticePage from "./PracticePage.svelte"
  import SettingsPage from "./SettingsPage.svelte"

  globalErrorHandler.init({
    sentryScoper: (scope) => {
      // const { user } = app.state
      // if (user) {
      //   const userDetails: Record<string, any> = {
      //     name: user.name,
      //     username: user.username,
      //     id: user.id.toString(),
      //     role: user.role,
      //   }
      //   if (user.email) userDetails.email = user.email
      //   scope.setUser(userDetails)
      // }
    },
  })

  try {
    const summary = JSON.parse(localStorage.getItem("summary")!)
    if (summary) {
      const app = sprachy.initApp(summary)
      app.refreshProgress()
    }
  } catch (err) {}
</script>

<Router>
  <Route path="/" component={FrontPage} />
  <Route path="/home" component={HomePage} />
  <Route path="/faq" component={FAQPage} />
  <Route path="/learn" component={LearnPage} />
  <Route path="/review" component={ReviewPage} />
  <Route path="/settings" component={SettingsPage} />
  <Route path="/pattern/:slug/practice" component={PracticePage} />
  <Route path="/pattern/:slug" component={PatternPage} />
</Router>

<style>
</style>
