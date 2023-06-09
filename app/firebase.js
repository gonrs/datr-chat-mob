import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
import {
	API_API_KEY,
	API_AUTH_DOMAIN,
	API_PROJECT_ID,
	API_STORAGE_BUCKET,
	API_SENDER_ID,
	API_APP_ID,
	API_MEASUREMENT_ID,
} from '@env'

const firebaseConfig = {
	apiKey: API_API_KEY,
	authDomain: API_AUTH_DOMAIN,
	projectId: API_PROJECT_ID,
	storageBucket: API_STORAGE_BUCKET,
	messagingSenderId: API_SENDER_ID,
	appId: API_APP_ID,
	measurementId: API_MEASUREMENT_ID,
}
console.log(process.env.REACT_APP_API_KEY)
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore(app)
