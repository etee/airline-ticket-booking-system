import { ref, watchEffect } from 'vue'

import { db } from "@/firebase/config"
import { doc, onSnapshot } from 'firebase/firestore'

const getDocument = (collectionName, id) => {
    const document = ref(null)
    const error = ref(null)

    const documentRef = doc(db, collectionName, id)

    const unsub = onSnapshot(documentRef, (doc) => {
        if(doc.exists()) {
            document.value = {...doc.data(), id: doc.id}
            error.value = null
        }    else {
            error.value = 'That document doesn\'t exist'
        }     
    }, (err) => {
        console.log(err.message)
        error.value = 'Could not fetch data'
    })

    watchEffect((onInvalidate) => {
        // unsub from prev collection when watcher is stopped (component unmounted)
        onInvalidate(() => {
            unsub()
        })
    })

    return { error, document }
}

export default getDocument
