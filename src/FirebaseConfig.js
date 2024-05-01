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

const firebaseConfig1 = {
    apiKey: "AIzaSyAALh7mXXgMK7rmylLZMFXGNVASwcU2y7s",
    authDomain: "manager-6bc03.firebaseapp.com",
    projectId: "manager-6bc03",
    storageBucket: "manager-6bc03.appspot.com",
    messagingSenderId: "778184668000",
    appId: "1:778184668000:web:045e9824d20ee5bb82e405"
  };

const app = initializeApp(firebaseConfig, "app");
export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth(app)

const app1 = initializeApp(firebaseConfig1, "app1");
export const storage1 = getStorage(app1)
export const db1 = getFirestore(app1)
export const auth1 = getAuth(app1)

