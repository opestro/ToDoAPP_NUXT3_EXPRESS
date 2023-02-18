<template>
    <div>
        <div class=" text-center items-center card m-2 p-2 ">
            <h1 class="m-2 card-title">
                Signup Page
            </h1>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">What is your Full Name?</span>
                </label>
                <input type="text" v-model="full_name" placeholder="Full name"
                    class="input input-bordered w-full max-w-xs" />
            </div>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">What is your Username?</span>
                </label>
                <input type="text" v-model="username" placeholder="Username" class="input input-bordered w-full max-w-xs" />
            </div>
            <div class="form-control w-full max-w-xs my-3">
                <label class="label">
                    <span class="label-text">What is your Password?</span>
                </label>
                <input type="password" v-model="password" placeholder="Password"
                    class="input input-bordered w-full max-w-xs" />
                <label class="label">
                </label>
                <input type="password" v-model="passwordV" placeholder="Password Again"
                    class="input input-bordered w-full max-w-xs" />
            </div>
            <button class="btn w-full max-w-xs my-2 text-white btn-secondary" @click="signup()">Create Account</button>
            <div class=" badge badge-error disabled m-2 p-3" v-show="!(password === passwordV)">ReEnter your password</div>
            <div class=" badge badge-success disabled m-2 p-3" v-show="isCreated">Your account has been created</div>
            <badge class=" badge badge-warning p-4" v-show="!isCorrect">Please entre valide info</badge>
        </div>
        <div class=" text-center">
            <a href="/login " class=" text-lg">or Login</a>
        </div>

    </div>
</template>

<script >
import axios from 'axios';
definePageMeta({
    middleware: 'is-login'
})
export default {
    data() {
        return {
            full_name: '',
            username: '',
            password: '',
            passwordV: '',
            isCreated: false,
            isCorrect: true
            //  passIsTrue: !(pass1 = pass2),
        }
    },
    methods: {
        signup() {
            axios.post('http://localhost:9000/api/signup', {
                "full_name": this.full_name,
                "username": this.username,
                "password": this.password
            }).then((data) => {
             //   console.log(data)
                this.isCreated = true
            }).catch((err) => { this.isCorrect = false });
        }
    },
}
</script>

