import React from 'react'
import { Box, Container } from '@mui/material'
import LoginForm from '../components/LoginForm'
import OnboardingPanel from '../components/OnboardingPanel'
import { useAuth } from '../hooks/useAuth'

const LoginPage = ({ setIsLoggedIn, setAccessToken, setUser }) => {
  const { loginWithGoogle, error: authError, loading } = useAuth()

  const handleGoogleLogin = async () => {
    const result = await loginWithGoogle()
    if (result.success) {
      setAccessToken(result.token)
      setUser(result.user)
      setIsLoggedIn(true)
    }
  }

  const handleFormLogin = (username, password) => {
    alert(`Form login successful!\nUsername: ${username}\nPassword: ${password}`)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: '#fff',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 4,
          px: { xs: 3, sm: 6 },
        }}
      >
        <LoginForm
          onGoogleLogin={handleGoogleLogin}
          onLogin={handleFormLogin}
          loginError={authError}
          loading={loading}
        />
      </Container>

      <OnboardingPanel />
    </Box>
  )
}

export default LoginPage
