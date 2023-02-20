import axios from "axios";
import { authStore } from '@/store/auth'
export default defineNuxtRouteMiddleware((to, from) => {
    const authUser = authStore()
    if (process.client) {
        console.log('pg-auth start ')
        const token = localStorage.getItem('token')
        if (token) {
            axios.get('http://localhost:9000/api/user/profile', { headers: { 'authorization': token } })
            .then( (data) => {
                const userData = {
                    full_name: data.data.full_name,
                    username: data.data.username,
                    $id: data.data.userId
                }
                authUser.setData(userData)
                console.log('pg-auth + ' + userData)
            }).catch((err) => { 
                console.log('pg-auth err ')
                return navigateTo('/login')
            })
        }


      }

})
