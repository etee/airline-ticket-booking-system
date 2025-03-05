import { db } from "@/firebase/config"
import { getFirestore, collection, addDoc } from "firebase/firestore"
import { ref } from "vue"

const useCollection = (collectionName) => {
    
    const error = ref(null)
    const isPending = ref(false)

    const addDocument = async (doc) => {
        error.value = null
        isPending.value = true
        try {
            const colRef = await collection(db, collectionName)
            const res = await addDoc(colRef, doc)
            isPending.value = false
            return res
        } catch (err) {
            console.log(err.message)
            error.value = 'Could not send the message'
            isPending.value = false
        }
        
    }

    return { error, addDocument, isPending }
}

export default useCollection