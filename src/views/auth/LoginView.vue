<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <div>
                <label>Email</label>
                <input type="email" v-model="email"/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" v-model="password"/>
            </div>
            <button>Login</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        const email = ref('')
        const password = ref('')

        const handleSubmit = () => {
            console.log(email.value, password.value)   
        }

        return { 
            email,
            password,
            handleSubmit
        }
    }
}
</script>

<style>

</style>