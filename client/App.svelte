<script lang="ts">
  import { Router, Link, Route } from "svelte-navigator"
  import sprachy from "./sprachy"
  import FAQPage from "./FAQPage.svelte"
  import FrontPage from "./FrontPage.svelte"
  import LoginPage from "./LoginPage.svelte"
  import HomePage from "./HomePage.svelte"
  import LearnPage from "./LearnPage.svelte"
  import ReviewPage from "./ReviewPage.svelte"
  import PatternPage from "./PatternPage.svelte"
  import PracticePage from "./PracticePage.svelte"
  import SettingsPage from "./SettingsPage.svelte"
  import NProgress from "accessible-nprogress"
  NProgress.configure({ showSpinner: false })

  sprachy.api.http.onRequest = (req) => {
    NProgress.promise(req)
  }

  try {
    const summary = JSON.parse(localStorage.getItem("summary")!)
    if (summary) {
      const app = sprachy.initApp(summary)
      app.refreshProgress()
    }
  } catch (err) {}
</script>

<div class="app">
  <Router>
    <Route path="/" component={FrontPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/home" component={HomePage} />
    <Route path="/faq" component={FAQPage} />
    <Route path="/learn" component={LearnPage} />
    <Route path="/review" component={ReviewPage} />
    <Route path="/settings" component={SettingsPage} />
    <Route path="/pattern/:slug/practice" component={PracticePage} />
    <Route path="/pattern/:slug" component={PatternPage} />
  </Router>
</div>
