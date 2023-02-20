<template>
    <div>
        <div class=" text-center items-center card m-2 p-2 ">
            <h1 class="m-2 card-title">
                Login Page
            </h1>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">What is your Username?</span>
                </label>
                <input type="text" v-model="username" placeholder="Username" class="input input-bordered w-full max-w-xs" />
            </div>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">What is your Password?</span>
                </label>
                <input type="text" v-model="password" placeholder="Password" class="input input-bordered w-full max-w-xs" />
            </div>
            <button @click="login()" class="btn w-full max-w-xs my-2 text-white btn-secondary">Login</button>
            <badge class=" badge badge-warning p-4" v-show="!isCorrect">Please entre valide info</badge>
        </div>
        <div class=" text-center">
            <a href="/signup " class=" text-lg">or Create a new account</a>
        </div>

    </div>
</template>

<script>
import axios from "axios";
import { authStore } from '@/store/auth'
const authUser = authStore()
definePageMeta({
    middleware: 'is-login'
})
export default {


    data() {
        return {
            username: '',
            password: '',
            isCorrect: true
        }
    },
    methods: {

        login() {

            axios.post('http://localhost:9000/api/login', {
                "username": this.username,
                "password": this.password
            }).then((data) => {
                console.log(data)
                localStorage.setItem('token', data.data.token)
                axios.get('http://localhost:9000/api/user/profile', { headers: { 'authorization': data.data.token } })
                    .then((data) => {
                        const userData = {
                            full_name: data.data.full_name,
                            username: data.data.username,
                            $id: data.data.userId
                        }
                        //       console.log(userData)
                        authUser.setData(userData)
                        this.$router.push('/')
                    }).catch((err) => { console.log(err) });
            }).catch((err) => {
                console.log(err)
                this.isCorrect = false });
        }
    },
}
</script>