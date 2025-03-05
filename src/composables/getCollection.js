import { ref, watchEffect } from "vue"
import { db } from "@/firebase/config"
import { collection, query, onSnapshot } from "firebase/firestore"

const getCollection = (collectionName, q) => {
    const documents = ref([])
    const error = ref(null)

    let collectionRef = collection(db, collectionName)
    let qRef = query(collectionRef)

    if (q && q.length > 0) {
        qRef = query(collectionRef, ...q);
    }

    const unsub = onSnapshot(qRef, (snap) => {
        let results = []
        snap.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id })
        })
        documents.value = results
        console.log(documents.value)
        error.value = null
    }, (err) => {
        console.log(err.message)
        documents.value = []
        error.value = 'Could not fetch data'
    })

    watchEffect((onInvalidate) => {
        // unsub from prev collection when watcher is stopped (component unmounted)
        onInvalidate(() => {
            unsub()
        })
    })

    return { error, documents }
}

export default getCollection