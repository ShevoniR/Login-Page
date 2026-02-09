import React from 'react'
import { Container, Paper, Typography, Box, Button } from '@mui/material'

const SuccessPage = ({ accessToken, user, onLogout }) => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700, mb: 3 }}>
          Login Successful!
        </Typography>

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

export default SuccessPage
