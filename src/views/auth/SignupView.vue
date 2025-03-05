<template>
  <div>
    <form novalidate @submit.prevent="onSubmit" class="signup-form">
        <div>
            <input type="text" v-model="displayName" v-bind="displayNameAttrs" placeholder="Name" />
            <span class="error">{{ errors.displayName }}</span>
        </div>
        <div>
            <input type="email" v-model="email" v-bind="emailAttrs" placeholder="Email"/>
            <span class="error">{{ errors.email }}</span>
        </div>
        <div>
            <input type="password" v-model="password" v-bind="passwordAttrs" placeholder="Password"/>
            <span class="error">{{ errors.password }}</span>
        </div>
        <button>Sign up</button>
        <div class="error" v-if="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import useSignup from '@/composables/useSignup'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import * as yup from 'yup'

export default {
    setup() {
        const { error, signup} = useSignup()
        const router = useRouter()

        const { errors, handleSubmit, defineField } = useForm({
            validationSchema: yup.object({
                displayName: yup.string().required(),
                email: yup.string().email().required(),
                password: yup.string().required().min(6)
            }),
            
        })

        const onSubmit = handleSubmit(async values => {
            const res = await signup(values.email, values.password, values.displayName)
            if(!error.value) {
                console.log('User created', res.user)
                router.push('/')
            }
        })

        const [email, emailAttrs] = defineField('email');
        const [password, passwordAttrs] = defineField('password');
        const [displayName, displayNameAttrs] = defineField('displayName');

        return { 
            displayName,
            email,
            password,
            displayNameAttrs,
            emailAttrs,
            passwordAttrs,
            errors,
            error,
            onSubmit
        }
    }
}
</script>

<style scoped>
    .signup-form div span {
        color: red;
        font-size: 0.8em;
    }
</style>