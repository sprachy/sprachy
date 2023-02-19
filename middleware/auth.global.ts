// This "auth" middleware doesn't do anything security-wise
//
// It's just for the UX of which pages the user should be able
// to access without errors. Actual security is handled by the
// server middleware which gates the API endpoints.

export default defineNuxtRouteMiddleware(async (to, from) => {
  // const user = await getCurrentUser()

  // console.log(user)
  // 
  // if (to.params.id === '1') {
  //   return abortNavigation()
  // }
  // return navigateTo('/')
})