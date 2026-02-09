import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'

const onboardingSlides = [
  {
    image: '/images/teamwork.png',
    description: 'Work seamlessly with your team members in real-time',
  },
  {
    image: '/images/communication.png',
    description: 'Stay connected with built-in chat and messaging',
  },
  {
    image: '/images/tasks.png',
    description: 'Organize and prioritize your tasks efficiently',
  },
  {
    image: '/images/analytics.png',
    description: 'Track your progress with detailed insights',
  },
]

const OnboardingPanel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % onboardingSlides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: '#f8f9fa',
        display: { xs: 'none', lg: 'flex' },
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        p: 4,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          textAlign: 'center',
          position: 'relative',
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Main Slider Image */}
        <Box
          component="img"
          src={onboardingSlides[currentSlide].image}
          alt={onboardingSlides[currentSlide].description}
          sx={{
            width: '100%',
            maxWidth: '400px',
            height: 'auto',
            mb: 4,
            transition: 'opacity 0.5s ease',
            borderRadius: 3,
          }}
        />

        {/* Floating Avatar & Card Boxes */}
        {/* Top Left Card */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '5%',
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
            sx={{ width: 40, height: 40, borderRadius: '50%' }}
          />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Felix
          </Typography>
        </Box>

        {/* Bottom Left Card */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '25%',
            left: '10%',
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
            10 Tasks
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
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#66bb6a' }} />
            Design
          </Box>
        </Box>

        {/* Top Right Avatar Circle */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            right: '5%',
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
            sx={{ width: 40, height: 40, borderRadius: '50%' }}
          />
        </Box>

        {/* Bottom Right Avatar Circle */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            right: '5%',
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
            sx={{ width: 40, height: 40, borderRadius: '50%' }}
          />
        </Box>

        {/* Slider Dots */}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {onboardingSlides.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: index === currentSlide ? '#000' : '#ddd',
                transition: 'background-color 0.3s ease',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Bottom Text */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          mt: 8,
          textAlign: 'center',
          color: '#333',
        }}
      >
        Make your work easier and organized
        <br />
        with{' '}
        <Box component="span" sx={{ fontWeight: 700, color: '#000' }}>
          Tuga's App
        </Box>
      </Typography>
    </Box>
  )
}

export default OnboardingPanel
