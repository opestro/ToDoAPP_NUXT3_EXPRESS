import { authStore } from '@/store/auth'
export default defineNuxtRouteMiddleware  ( (to, from)=> {
    const authUser = authStore()
     if (process.client)  {
       authUser.isLogin()
        
      }

})
