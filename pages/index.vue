<template>
    <div class=" p-2 ">
        <!-- Section head -->
        <bigHead class="text-center card card-body items-center">

            <h2 v-if="isLogin" class=" ">
                Welcome back <h1 class=" text-2xl text-white capitalize">{{ name }}</h1> to your
            </h2>

            <h1 class=" text-4xl card-title">
                Task APP
            </h1>
        </bigHead>
        <!-- Add new note -->
        <addNewNote v-if="isLogin" class=" flex justify-center  my-5">
            <input class="input input-secondary input-bordered shadow-sm border focus:border-0 mx-2 rounded-lg "
                type="text">
            <button class="btn btn-secondary ">
                ADD
            </button>
        </addNewNote>
        <!-- Your notes -->
        <div v-if="isLogin" class="flex justify-center">
            <div class="card card-body card-bordered  items-center w-full max-w-sm">
                <div>
                    <h1 class=" card-title w-full "> testtt ttsts tststs stst tstst stst</h1>
                </div>
                <button class="btn btn-success w-full max-w-xs hover:shadow-sm rounded-md shadow-md ">
                    Done
                </button>
                <button class="btn btn-square btn-error w-full max-w-xs btn-outline">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
        <div class=" card-body items-center">
            <button v-if="isLogin" class="btn w-full max-w-sm btn-error" @click="logout()"> Logout</button>
            <nuxt-link to="/login" v-if="!isLogin" class="btn w-full max-w-sm btn-secondary">Login</nuxt-link>
        </div>

    </div>
</template>

<script>
import { authStore } from '@/store/auth'
import axios from 'axios'
const authUser = authStore()
definePageMeta({
    middleware: 'auth'
})
export default {
    data() {
        return {
            name: '',
            isLogin: false,

        }
    },
    created() {
        const user = authUser.user
        if (user) {
            this.name = user.full_name
            this.isLogin = true

        }

    },
    methods: {
        logout() {
            const token = localStorage.getItem('token')
            // console.log(token)
            axios.post('http://localhost:9000/api/logout', { "token": token }).then((data) => {
                localStorage.removeItem('token')
                this.$router.push('/login')
            }).catch((err) => { console.log(err) });
        }
    },
}
</script>