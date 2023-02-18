import { authStore } from '@/store/auth'
export default defineNuxtRouteMiddleware  ((to, from)=> {
    const authUser = authStore()
    const user = authUser.user
    console.log(from.fullPath)

    if (!user && from.fullPath !== '/login') {
        // If not, redirect them to the login page
        return navigateTo('/login')
      } 
})

