import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Container,
  Paper,
  Link,
  Divider,
  Alert,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  Apple as AppleIcon,
  Facebook as FacebookIcon,
} from '@mui/icons-material'
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

// ============================================
// FIREBASE CONFIGURATION
// ============================================
// TODO: Replace with your Firebase credentials from Firebase Console
const firebaseConfig = {
  apiKey: 'AIzaSyCzxhp4aqhwKSirFOCRfVMLw-EMhjUuDb8',
  authDomain: 'login-page-65e6e.firebaseapp.com',
  projectId: 'login-page-65e6e',
  storageBucket: 'login-page-65e6e.firebasestorage.app',
  messagingSenderId: '827297233536',
  appId: '1:827297233536:web:b2ba62d5ece3ed00024465',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

// ============================================
// SUCCESS PAGE COMPONENT
// ============================================
const SuccessPage = ({ accessToken, user, onLogout }) => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700, mb: 3 }}>
          Login Successful!
        </Typography>

        {/* User Information */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            User Information:
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Name:</strong> {user?.displayName || 'N/A'}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Email:</strong> {user?.email || 'N/A'}
          </Typography>
        </Box>

        {/* Access Token Display */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Access Token:
          </Typography>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 2,
              wordBreak: 'break-all',
              maxHeight: '200px',
              overflowY: 'auto',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
              }}
            >
              {accessToken}
            </Typography>
          </Paper>
        </Box>

        {/* Logout Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={onLogout}
          sx={{
            bgcolor: '#000',
            color: '#fff',
            py: 1.5,
            borderRadius: 10,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            '&:hover': {
              bgcolor: '#333',
            },
          }}
        >
          Logout
        </Button>
      </Paper>
    </Container>
  )
}

// ============================================
// MAIN LOGIN PAGE COMPONENT
// ============================================
function App() {
  // Form state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  // ============================================
  // VALIDATION FUNCTIONS
  // ============================================
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!username) {
      newErrors.username = 'Username is required'
    } else if (!validateEmail(username)) {
      newErrors.username = 'Please enter a valid email address'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ============================================
  // EVENT HANDLERS
  // ============================================
  const handleLogin = (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (validateForm()) {
      alert('Login form validated successfully! (No backend implementation as per requirements)')
    }
  }

  const handleGoogleLogin = async () => {
    setErrorMessage('')
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const token = await result.user.getIdToken()

      setAccessToken(token)
      setUser(result.user)
      setIsLoggedIn(true)
    } catch (error) {
      console.error('Google login error:', error)
      setErrorMessage(
        error.message || 'Failed to login with Google. Please check your Firebase configuration in the code.'
      )
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setAccessToken('')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
    if (errors.username) {
      setErrors({ ...errors, username: '' })
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (errors.password) {
      setErrors({ ...errors, password: '' })
    }
  }

  // ============================================
  // RENDER SUCCESS PAGE IF LOGGED IN
  // ============================================
  if (isLoggedIn) {
    return <SuccessPage accessToken={accessToken} user={user} onLogout={handleLogout} />
  }

  // ============================================
  // RENDER LOGIN PAGE
  // ============================================
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: '#fff',
      }}
    >
      {/* ========== LEFT SIDE - LOGIN FORM ========== */}
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
        <Box sx={{ maxWidth: '400px', mx: 'auto', width: '100%' }}>
          {/* Header */}
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: '2rem', sm: '2.5rem' },
            }}
          >
            Welcome back!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 4,
              fontSize: '0.95rem',
            }}
          >
            Simplify your workflow and boost your productivity with Tugga's App. Get started for free.
          </Typography>

          {/* Error Alert */}
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleLogin}>
            {/* Username/Email Input */}
            <TextField
              fullWidth
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              error={!!errors.username}
              helperText={errors.username}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 10,
                  bgcolor: '#fafafa',
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#bdbdbd',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#000',
                  },
                },
              }}
            />

            {/* Password Input */}
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 10,
                  bgcolor: '#fafafa',
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#bdbdbd',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#000',
                  },
                },
              }}
            />

            {/* Forgot Password Link */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Link
                href="#"
                underline="hover"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  '&:hover': {
                    color: 'text.primary',
                  },
                }}
              >
                Forgot Password?
              </Link>
            </Box>

            {/* Login Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#000',
                color: '#fff',
                py: 1.5,
                mb: 3,
                borderRadius: 10,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#333',
                },
              }}
            >
              Login
            </Button>

            {/* Divider */}
            <Box sx={{ position: 'relative', mb: 3 }}>
              <Divider>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    px: 2,
                    fontSize: '0.875rem',
                  }}
                >
                  or continue with
                </Typography>
              </Divider>
            </Box>

            {/* Social Login Buttons */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                mb: 3,
              }}
            >
              {/* Google Login */}
              <IconButton
                onClick={handleGoogleLogin}
                sx={{
                  bgcolor: '#000',
                  color: '#fff',
                  width: 50,
                  height: 50,
                  '&:hover': {
                    bgcolor: '#333',
                  },
                }}
                aria-label="Sign in with Google"
              >
                <GoogleIcon />
              </IconButton>

              {/* Apple Login (placeholder) */}
              <IconButton
                sx={{
                  bgcolor: '#000',
                  color: '#fff',
                  width: 50,
                  height: 50,
                  '&:hover': {
                    bgcolor: '#333',
                  },
                }}
                aria-label="Sign in with Apple"
              >
                <AppleIcon />
              </IconButton>

              {/* Facebook Login (placeholder) */}
              <IconButton
                sx={{
                  bgcolor: '#000',
                  color: '#fff',
                  width: 50,
                  height: 50,
                  '&:hover': {
                    bgcolor: '#333',
                  },
                }}
                aria-label="Sign in with Facebook"
              >
                <FacebookIcon />
              </IconButton>
            </Box>

            {/* Register Link */}
            <Typography
              variant="body2"
              align="center"
              sx={{
                color: 'text.secondary',
                fontSize: '0.875rem',
              }}
            >
              Not a member?{' '}
              <Link
                href="#"
                underline="hover"
                sx={{
                  color: '#1976d2',
                  fontWeight: 600,
                  '&:hover': {
                    color: '#1565c0',
                  },
                }}
              >
                Register now
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* ========== RIGHT SIDE - ILLUSTRATION ========== */}
      <Box
        sx={{
          flex: 1,
          bgcolor: '#e8f5e9',
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          p: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: '500px',
            textAlign: 'center',
          }}
        >
          {/* Main Illustration */}
          <Box
            component="img"
            src="https://illustrations.undraw.co/illustrations/meditation_re_gll0.svg"
            alt="Meditation illustration"
            sx={{
              width: '100%',
              maxWidth: '400px',
              mb: 4,
            }}
          />

          {/* Floating Avatar - Top Left */}
          <Box
            sx={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              bgcolor: '#fff',
              borderRadius: 3,
              p: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box
              component="img"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="User avatar"
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
              }}
            />
          </Box>

          {/* Task Card - Bottom Left */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '30%',
              left: '15%',
              bgcolor: '#fff',
              borderRadius: 3,
              p: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Canva Design
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
              10 Task
            </Typography>
            <Box
              sx={{
                bgcolor: '#e8f5e9',
                color: '#2e7d32',
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: '#66bb6a',
                }}
              />
              Design
            </Box>
          </Box>

          {/* Floating Avatar - Top Right */}
          <Box
            sx={{
              position: 'absolute',
              top: '25%',
              right: '10%',
              bgcolor: '#fff',
              borderRadius: '50%',
              width: 50,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <Box
              component="img"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
              alt="User avatar"
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
              }}
            />
          </Box>

          {/* Floating Avatar - Bottom Right */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '20%',
              right: '10%',
              bgcolor: '#fff',
              borderRadius: '50%',
              width: 50,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <Box
              component="img"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie"
              alt="User avatar"
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
              }}
            />
          </Box>

          {/* Bottom Tagline */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mt: 4,
            }}
          >
            Make your work easier and organized
            <br />
            with{' '}
            <Box component="span" sx={{ fontWeight: 700 }}>
              Tugga's App
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default App
