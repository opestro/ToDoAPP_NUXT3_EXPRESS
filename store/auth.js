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
    isLogin(){
        const token = localStorage.getItem('token')
        console.log(token, ' DONE')
        axios.get('http://localhost:9000/api/user/profile', { headers: { 'authorization': token } })
        .then( (data) => {
            const userData = {
                full_name: data.data.full_name,
                username: data.data.username,
                $id: data.data.userId
            }
              this.user = userData
              return navigateTo('/')
        }).catch((err) => { console.log(err) });
    }
  }
})