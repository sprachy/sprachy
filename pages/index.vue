<script setup lang="ts">
definePageMeta({
  layout: false
})

const currentUser = await getCurrentUser()
const router = useRouter()

if (currentUser) {
  router.replace("/learn")
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
    <div>
      <div class="title">
        <SprachyLogo />
        <h1>Sprachy</h1>
        <span class="alpha">alpha</span>
      </div>
      <p>An experimental web app for learning German</p>
      <ul>
        <li>Image-based comprehensible input</li>
        <li>~15 hours of free exercises</li>
        <li>Made by a native speaker and his German-learning boyfriend 🥰</li>
      </ul>
      <div>
        <NuxtLink class="btn btn-success login" to="/login">Login</NuxtLink>
        <NuxtLink class="btn btn-primary signup" to="/signup">Sign up</NuxtLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 1rem;
}

.title {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.title img {
  margin-right: 0.5rem;
}

.title h1 {
  margin: 0;
  margin-right: 0.2rem;
}

.alpha {
  color: green;
}

a.login {
  margin-right: 0.25rem;
}
</style>
