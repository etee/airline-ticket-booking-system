import { ref } from 'vue'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/firebase/config'

const error = ref(null)
const isPending = ref(false)

const signup = async (email, password, displayName) => {
    error.value = null
    isPending.value = true

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        if (!res) {
            throw new Error('Could not complete the signup')
        }
        await updateProfile(res.user, { displayName })
        error.value = null
        isPending.value = false

        return res
    } catch (error) {
        console.log('Error:',error.message)
        error.value = error.message
        isPending.value = false
    }      

}

const useSignup = () => {
    return {
        error,
        signup,
        isPending
    }
}

export default useSignup