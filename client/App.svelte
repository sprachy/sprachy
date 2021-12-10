<script lang="ts">
  import { Router, Link, Route } from "svelte-navigator"
  import { initApp } from "./context"
  import FrontPage from "./FrontPage.svelte"
  import { globalErrorHandler } from "./globalErrorHandling"
  import HomePage from "./HomePage.svelte"
  import PatternPage from "./PatternPage.svelte"

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
      const app = initApp(summary)
      app.refreshProgress()
    }
  } catch (err) {}
</script>

<Router>
  <Route path="/" component={FrontPage} />
  <Route path="/home" component={HomePage} />
  <Route path="/pattern/:slug" component={PatternPage} />
</Router>

<style>
</style>
