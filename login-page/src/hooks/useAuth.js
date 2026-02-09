import { useState } from 'react'
import { auth, googleProvider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const loginWithGoogle = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const token = await result.user.getIdToken()

      setAccessToken(token)
      setUser(result.user)
      setLoading(false)
      return { success: true, token, user: result.user }
    } catch (error) {
      setError(error.message)
      setLoading(false)
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setAccessToken('')
    setUser(null)
    setError('')
  }

  return {
    accessToken,
    user,
    error,
    loading,
    loginWithGoogle,
    logout,
  }
}
