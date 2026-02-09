import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCzxhp4aqhwKSirFOCRfVMLw-EMhjUuDb8',
  authDomain: 'login-page-65e6e.firebaseapp.com',
  projectId: 'login-page-65e6e',
  storageBucket: 'login-page-65e6e.firebasestorage.app',
  messagingSenderId: '827297233536',
  appId: '1:827297233536:web:b2ba62d5ece3ed00024465',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
