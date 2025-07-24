// pages/Onboarding.jsx
import { useState } from 'react'
import { useUser } from '../context/UserContext'
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'

const Onboarding = () => {
  const { setUser } = useUser()
  const [formData, setFormData] = useState({
    name: '',
    weight: '',
    height: '',
    age: '',
    dailyGoal: 5000
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const bmi = (formData.weight / ((formData.height / 100) ** 2)).toFixed(1)
    setUser({
      ...formData,
      bmi,
      joined: new Date().toISOString()
    })
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>Welcome to Health Tracker</Typography>
        <Typography variant="body1" gutterBottom>
          Let's set up your profile to get started on your health journey!
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Weight (kg)"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            required
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Height (cm)"
            name="height"
            type="number"
            value={formData.height}
            onChange={handleChange}
            required
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Daily Step Goal</InputLabel>
            <Select
              name="dailyGoal"
              value={formData.dailyGoal}
              onChange={handleChange}
              label="Daily Step Goal"
            >
              <MenuItem value={3000}>3,000 (Beginner)</MenuItem>
              <MenuItem value={5000}>5,000 (Moderate)</MenuItem>
              <MenuItem value={7500}>7,500 (Active)</MenuItem>
              <MenuItem value={10000}>10,000 (Very Active)</MenuItem>
            </Select>
          </FormControl>
          
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ mt: 3 }}
          >
            Start Tracking
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default Onboarding