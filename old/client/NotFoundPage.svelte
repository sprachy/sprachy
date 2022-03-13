<script lang="ts">
  window.addEventListener("popstate", () => {
    window.location.reload()
  })

  // In development, force a full refresh on code
  // change
  ;(module as any).hot.addStatusHandler(() => {
    window.location.reload()
  })
</script>

<template>
  <main>
    <div class="card">
      <h1>Page Not Found</h1>
      <p>
        Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
      </p>
      <a href="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <path
            fill="#007bff"
            d="M11.9998836,4.09370803 L8.55809517,7.43294953 C8.23531459,7.74611298 8.23531459,8.25388736 8.55809517,8.56693769 L12,11.9062921 L9.84187871,14 L4.24208544,8.56693751 C3.91930485,8.25388719 3.91930485,7.74611281 4.24208544,7.43294936 L9.84199531,2 L11.9998836,4.09370803 Z"
          />
        </svg>
        Back to Sprachy
      </a>
    </div>
  </main>
</template>

<style lang="sass">
main
  background: rgb(14, 30, 37)
  position: fixed
  left: 0
  top: 0
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  height: 100vh
  width: 100vw

.card
  position: relative
  display: flex
  flex-direction: column
  width: 75%
  max-width: 364px
  padding: 24px
  background: white
  color: rgb(14, 30, 37)
  border-radius: 8px
  box-shadow: 0 2px 4px 0 rgba(14, 30, 37, .16)

a
  margin: 0
  text-decoration: none
  font-weight: 600
  line-height: 24px

a svg
  position: relative
  top: -1px

a:hover svg path
  fill: #0056b3
</style>
