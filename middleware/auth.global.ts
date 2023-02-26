// This "auth" middleware doesn't do anything security-wise
//
// It's just for the UX of which pages the user should be able
// to access without errors. Actual security is handled by the
// server middleware which gates the API endpoints.

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser()

  if (!user && to.meta.needsUser) {
    if (!user) {
      navigateTo('/login')
    }
  }

  if (!user?.isAdmin && to.path.split('/')[1] === 'admin') {
    navigateTo('/login')
  }

  if (user && process.client) {
    await initSPA(user)
  }
})