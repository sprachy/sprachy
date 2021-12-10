<script lang="ts">
  import { Router, Link, Route } from "svelte-navigator";
  import FrontPage from "./FrontPage.svelte";
  import HomePage from "./HomePage.svelte";
</script>

<Router>
  <Route path="/" component={FrontPage} />
  <Route path="/home" component={HomePage} />
</Router>

<style>
</style>
