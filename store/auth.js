import { defineStore } from 'pinia'
import axios from 'axios'

export const authStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null

  }),
  actions: {
    
    setData(data) {
        this.user = data
      },
    isLogin(token){
      //  const token = localStorage.getItem('token')
        axios.get('http://localhost:9000/api/user/profile', { headers: { 'authorization': token } })
        .then( (data) => {
            const userData = {
                full_name: data.data.full_name,
                username: data.data.username,
                $id: data.data.userId
            }
              this.user = userData
              console.log(userData)
              console.log('st-auth done ')
              return navigateTo('/')
        }).catch((err) => {
          localStorage.removeItem('token')
          console.log('st-auth err ')
          return navigateTo('/login')
          
         });
    }
  }
})