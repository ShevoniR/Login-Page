import React, { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import LoginPage from './pages/LoginPage'
import SuccessPage from './components/SuccessPage'

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
          },
        },
      },
    },
  },
})

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [user, setUser] = useState(null)

  const handleLogout = () => {
    setIsLoggedIn(false)
    setAccessToken('')
    setUser(null)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoggedIn ? (
        <SuccessPage accessToken={accessToken} user={user} onLogout={handleLogout} />
      ) : (
        <LoginPage setIsLoggedIn={setIsLoggedIn} setAccessToken={setAccessToken} setUser={setUser} />
      )}
    </ThemeProvider>
  )
}

export default App
