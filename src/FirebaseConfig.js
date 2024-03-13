import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB0t7QwCNPrpcYmZgvtdzjjrRbhhpmjQdk",
    authDomain: "formbarmexapp.firebaseapp.com",
    projectId: "formbarmexapp",
    storageBucket: "formbarmexapp.appspot.com",
    messagingSenderId: "479693773949",
    appId: "1:479693773949:web:87ae90a141b1b00505e514"
};

const app = initializeApp(firebaseConfig, "app");
export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth(app)

