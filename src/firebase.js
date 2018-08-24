import { initializeApp } from 'firebase'

console.log(process.env.VUE_APP_FIREBASE_DB_URL)

const firebaseApp = initializeApp({
  apiKey: process.env.APP_VUE_FB_API_KEY,
  authDomain: process.env.APP_VUE_FB_AUTH_DOMAIN,
  databaseURL: process.env.APP_VUE_FB_DB_URL,
  projectId: process.env.AP_VUE_PROJECT_ID,
  storageBucket: process.env.APP_VUE_STORAGE_BUCKET,
  messagingSenderId: process.env.APP_VUE_SENDER_ID
})

export const db = firebaseApp.database()