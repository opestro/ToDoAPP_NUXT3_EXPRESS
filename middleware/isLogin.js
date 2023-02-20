import { authStore } from '@/store/auth'
export default defineNuxtRouteMiddleware((to, from) => {
  const authUser = authStore()
  const user = authUser.user
  
  if (process.client) {
    const token = localStorage.getItem('token')
    if (token) {
      authUser.isLogin(token)
      console.log('md-auth done ')
      //return navigateTo('/')
    } 
    console.log('md-auth err ')

  }

})
