// App.jsx
import { useState, useEffect } from 'react'
import { useTheme } from './context/ThemeContext'
import { useAlarm } from './context/AlarmContext'
import { useUser } from './context/UserContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Container,
  Box,
  Button,
  Paper
} from '@mui/material'
import { Brightness4, Brightness7, Settings, History } from '@mui/icons-material'
import Home from './pages/Home'
import SettingsPage from './pages/Settings'
import HistoryPage from './pages/History'
import Onboarding from './pages/Onboarding'

function App() {
  const { darkMode, toggleTheme } = useTheme()
  const { user } = useUser()

  if (!user) {
    return <Onboarding />
  }

  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Health Tracker
          </Typography>
          <IconButton color="inherit" onClick={toggleTheme}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  )
}

export default App