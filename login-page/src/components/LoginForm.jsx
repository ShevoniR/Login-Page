import React, { useState } from 'react'
import { TextField, Button, IconButton, InputAdornment, Link, Divider, Typography, Alert, Box } from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  Apple as AppleIcon,
  Facebook as FacebookIcon,
} from '@mui/icons-material'
import { validateEmail } from '../utils/validations'

const LoginForm = ({ onGoogleLogin, onLogin, loginError, loading }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onLogin(username, password)
    }
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

  return (
    <Box sx={{ maxWidth: '400px', mx: 'auto', width: '100%' }}>
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
        Simplify your workflow and boost your productivity with Tuga's App. Get started for free.
      </Typography>

      {loginError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {loginError}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
          error={!!errors.username}
          helperText={errors.username}
          disabled={loading}
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

        <TextField
          fullWidth
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          error={!!errors.password}
          helperText={errors.password}
          disabled={loading}
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

        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading}
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
          {loading ? 'Loading...' : 'Login'}
        </Button>

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

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <IconButton
            onClick={onGoogleLogin}
            disabled={loading}
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

          <IconButton
            disabled={loading}
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

          <IconButton
            disabled={loading}
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
  )
}

export default LoginForm
