<script lang="ts">
  import { Router, Route } from "svelte-navigator"
  import sprachy from "./sprachy"
  import FAQPage from "./FAQPage.svelte"
  import FrontPage from "./FrontPage.svelte"
  import HomePage from "./HomePage.svelte"
  import LearnPage from "./LearnPage.svelte"
  import PatternPage from "./PatternPage.svelte"
  import FreePracticePage from "./FreePracticePage.svelte"
  import PatternPracticePage from "./PatternPracticePage.svelte"
  import SettingsPage from "./SettingsPage.svelte"
  import AdminUsersPage from "./AdminUsersPage.svelte"
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
    <Route path="/"><FrontPage /></Route>
    <Route path="/home"><HomePage /></Route>
    <Route path="/faq"><FAQPage /></Route>
    <Route path="/learn"><LearnPage /></Route>
    <Route path="/practice"><FreePracticePage /></Route>
    <Route path="/settings"><SettingsPage /></Route>
    <Route path="/admin"><AdminUsersPage /></Route>
    <Route primary={false} path="/pattern/:slug/practice" let:params>
      <PatternPracticePage slug={params.slug} />
    </Route>
    <Route path="/pattern/:slug" let:params>
      <PatternPage slug={params.slug} />
    </Route>
  </Router>
</div>
