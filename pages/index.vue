<template>
    <div class=" p-2 ">
        <!-- Section head -->
        <bigHead class="text-center card card-body items-center">

            <h2 v-if="isLogin" class=" ">
                Welcome back <h1 class=" text-2xl text-white capitalize">{{ user.name }}</h1> to your
            </h2>

            <h1 class=" text-4xl card-title">
                Task APP
            </h1>
        </bigHead>
        <!-- Add new note -->
        <addNewNote v-if="isLogin" class=" flex justify-center  my-5">
            <input class="input input-secondary input-bordered shadow-sm border focus:border-0 mx-2 rounded-lg " type="text"
                v-model="newNote.note">
            <button class="btn btn-secondary " @click="createNote()">
                ADD
            </button>
        </addNewNote>
        <!-- Your notes -->
        <div class=" "> 
            <div  class="  columns-4 ">
                <div v-for="notes in user.notes" :key="notes"  class="flex justify-center">
                  
                        <div class="card card-body collapse h-full card-bordered m-2 items-center w-full max-w-sm">
                            <div>
                                <h1 class=" card-title w-full  "> {{ notes.note }}</h1>
                            </div>
                            <button class="btn btn-square btn-error w-full max-w-xs btn-outline">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                       
                    </div>
    
                </div>
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
const user = authUser.user

definePageMeta({
    middleware: 'auth'
})
export default {
    data() {
        return {
            user: {
                name: '',
                _id: '',
                notes: '',
                isDone: ''
            },
            newNote: {
                note: '',
                isDone: false,
            },
            isLogin: false,
            token: '',

        }
    },
    created() {
        if (user) {
            this.user.name = user.full_name
            this.isLogin = true
        }
    },
    mounted() {
        this.user._id = user.$id
        this.token = localStorage.getItem('token')
        console.log(user.$id)
        $fetch('http://localhost:9000/api/notes', {
            method: 'GET',
            headers: { 'authorization': this.token },
        })
            .then((data) => {
                this.user.notes = data
                console.log(data)
            })
            .catch((error) => { });
    },
    methods: {
        logout() {

            // console.log(token)
            axios.post('http://localhost:9000/api/logout', { "token": this.token }).then((data) => {
                localStorage.removeItem('token')
                this.$router.push('/login')
            }).catch((err) => { console.log(err) });
        },
        createNote() {
            $fetch('http://localhost:9000/api/note', {
                method: 'POST',
                headers: { 'authorization': this.token },
                body: {
                    user_id: this.user._id,
                    note: this.newNote.note,
                    isDone: this.newNote.isDone
                }
            }).then((data) => {
                console.log("data")
                this.user.notes.push({ note: this.newNote.note, isDone: this.newNote.isDone })

            }).catch((err) => { console.log(err) });
        },
        deleteNote() {

        }
    },
}
</script>