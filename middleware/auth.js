import { authStore } from '@/store/auth'
export default defineNuxtRouteMiddleware((to, from) => {
  const authUser = authStore()
  const user = authUser.user

      if  (user) {
        console.log('mid-auth done ')
      } else {
        console.log('mid-auth done login')
        return navigateTo('/login')
      }

})

