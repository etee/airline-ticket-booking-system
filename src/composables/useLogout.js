import { signOut } from 'firebase/auth'
import { ref } from 'vue'

const error = ref(null)
const isPending = ref(false)

const logout = async () => {
    error.value = null
    isPending.value = true

    try {
        await signOut(auth)
        isPending.value = false
    } catch (error) {
        console.log(error.message)
        error.value = error.message
        isPending.value = false
    }
}

const useLogout = () => {
    return {
        error,
        logout,
        isPending
    }
}

export default useLogout