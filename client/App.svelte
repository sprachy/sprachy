<script lang="ts">
  import { Router, Route } from "svelte-navigator"
  import sprachy from "./sprachy"
  import FAQPage from "./FAQPage.svelte"
  import FrontPage from "./FrontPage.svelte"
  import LoginPage from "./LoginPage.svelte"
  import SignupPage from "./SignupPage.svelte"
  import ResetPasswordPage from "./ResetPasswordPage.svelte"
  import ConfirmResetPasswordPage from "./ConfirmResetPasswordPage.svelte"
  import HomePage from "./HomePage.svelte"
  import LearnPage from "./LearnPage.svelte"
  import PatternPage from "./PatternPage.svelte"
  import PatternPracticePage from "./PatternPracticePage.svelte"
  import SettingsPage from "./SettingsPage.svelte"
  import AdminUsersPage from "./AdminUsersPage.svelte"
  import NProgress from "accessible-nprogress"
  import { tryParseInt } from "./utils"
  import PracticePage from "./PracticePage.svelte"
  NProgress.configure({ showSpinner: false })

  sprachy.api.http.onRequest = (req) => {
    NProgress.promise(req)
  }

  try {
    const summary = JSON.parse(localStorage.getItem("summary")!)
    if (summary) {
      sprachy.initApp(summary)
    }
  } catch (err) {}

  if (sprachy._app) {
    sprachy._app.refreshProgress()
  }
</script>

<div class="app">
  <Router>
    <Route path="/"><FrontPage /></Route>
    <Route path="/login"><LoginPage /></Route>
    <Route path="/signup"><SignupPage /></Route>
    <Route path="/reset-password/:token" let:params>
      <ConfirmResetPasswordPage token={params.token} />
    </Route>
    <Route path="/reset-password"><ResetPasswordPage /></Route>
    <Route path="/home"><HomePage /></Route>
    <Route path="/faq"><FAQPage /></Route>
    <Route path="/learn"><LearnPage /></Route>
    <Route path="/practice"><PracticePage /></Route>
    <Route path="/settings"><SettingsPage /></Route>
    <Route path="/admin"><AdminUsersPage /></Route>
    <Route primary={false} path="/pattern/:slug/practice/level/:level" let:params>
      <PatternPracticePage slug={params.slug} level={tryParseInt(params.level, 1)} />
    </Route>
    <Route primary={false} path="/pattern/:slug/practice" let:params>
      <PatternPracticePage slug={params.slug} />
    </Route>
    <Route path="/pattern/:slug" let:params>
      <PatternPage slug={params.slug} />
    </Route>
  </Router>
</div>
