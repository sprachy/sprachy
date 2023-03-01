<script setup lang="ts">
// import PatternIndex from "~/lib/PatternIndex.svelte"
import backgroundImg from "~/assets/sprachy-bg.webp"
import {
  faBook,
  faCircleNodes,
  faComments,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const currentUser = await getCurrentUser()
const router = useRouter()

if (currentUser) {
  router.replace("/learn")
} else {
  router.replace("/login")
}

const state = defineState({
  email: ""
})

async function gotoSignup() {
  const router = useRouter()
  router.push("/signup?email=" + encodeURIComponent(state.email))
}

const pageDesc =
  "Sprachy is a German learning web app with dorky characters, linguistic patterns, SRS, and extradimensional squirrels."

useHead({
  title: "Sprachy, a German learning application",
  meta: [{
    name: 'description',
    content: pageDesc
  }]
})
</script>

<template>
  <main>
    <section class="banner" :style="{ backgroundImage: `url(${backgroundImg})` }">
      <div class="container">
        <div class="row">
          <div class="signup">
            <h1>Learn German the clever and cute way</h1>
            <p>
              Sprachy combines detailed explanations of language patterns with
              memorable dialogue exercises. Also it involves extradimensional
              squirrels.
            </p>
            <form @submit.prevent="gotoSignup">
              <fieldset class="form-group">
                <label for="email">Email</label>
                <input v-model="state.email" name="email" id="email" type="email" class="form-control" placeholder="Email"
                  required />
              </fieldset>
              <button class="btn btn-sprachy btn-lg" type="submit">Sign up for Sprachy</button>
            </form>
          </div>
        </div>
      </div>
    </section>
    <section class="neat-parts">
      <div class="container py-5">
        <div class="d-flex justify-content-between">
          <div class="neat-parts-card">
            <FontAwesomeIcon size="3x" :icon="faCircleNodes" />
            <h5>Pattern-based</h5>
            <p>
              Sprachy teaches the <em>patterns</em> in German, like how some noun
              endings always imply a certain grammatical gender.
            </p>
          </div>

          <div class="neat-parts-card">
            <FontAwesomeIcon size="3x" :icon="faComments" />
            <h5>Comprehensible input</h5>
            <p>
              Learn patterns with dialogues between cute characters, to see how
              they're used in conversation.
            </p>
          </div>

          <div class="neat-parts-card">
            <FontAwesomeIcon size="3x" :icon="faBook" />
            <h5>Clear explanations</h5>
            <p>
              We don't just throw sentences at you: Sprachy tells you <em>why</em> each exercise has a given answer.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="patterns">
      <div class="container">
        <h2>All patterns</h2>
        <PatternIndex />
      </div>
    </section>
  </main>
</template>

<style scoped>
.container {
  position: relative;
}

section.banner {
  position: relative;
  background-size: cover;
  background-position: 50% 75%;
  height: calc(100vh - 100px);
  display: flex;
  align-items: center;
}

section.banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}

section.banner .signup {
  width: 50%;
  padding: 24px;
  background: white;
  box-shadow: 0px 3px 6px rgb(0 0 0 / 23%);
}

section.banner .signup h1 {
  margin-top: 10px;
  font-size: 2.8rem;
  margin-bottom: 1rem;
}

section.banner .signup p {
  font-size: 1.1rem;
}

section.banner .signup .form-group {
  margin-bottom: 1rem;
}

section.banner .signup button {
  width: 100%;
  padding: 1rem;
}

section.patterns {
  padding-top: 3rem;
}

section.neat-parts {
  background-color: #eee;
}

.neat-parts-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  background-color: #fafafa;
  border-radius: 10px;
  box-shadow: 0px 3px 6px rgb(0 0 0 / 23%);
  flex-basis: 30%;
  text-align: center;
}

.neat-parts-card :deep(svg) {
  margin: 1rem;
  color: var(--sprachy-primary);
}

.neat-parts-card p {
  color: #666;
}

@media only screen and (max-width: 992px) {
  .neat-parts .container>div {
    gap: 1rem;
    flex-wrap: wrap;
  }

  .neat-parts-card {
    flex-basis: 100%;
  }
}

@media only screen and (max-width: 768px) {
  section.banner {
    padding: 2rem 1rem;
  }

  section.banner .signup {
    width: 100%;
  }
}
</style>
