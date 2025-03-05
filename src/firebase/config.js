import { initializeApp } from 'firebase/app'
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCFMmBk3OGZgEpFgBrMMCob-GBG2M9HLoQ",
    authDomain: "ig-airways.firebaseapp.com",
    projectId: "ig-airways",
    storageBucket: "ig-airways.firebasestorage.app",
    messagingSenderId: "420737491427",
    appId: "1:420737491427:web:39389f26d68c67d6db80d6"
  }

  initializeApp(firebaseConfig)
  const db = getFirestore()
  const auth = getAuth()
  const timestamp = serverTimestamp

  export { db, auth, timestamp }