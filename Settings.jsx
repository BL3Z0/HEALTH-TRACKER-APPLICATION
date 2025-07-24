// pages/Settings.jsx
import { useUser } from '../context/UserContext'
import { useAlarm } from '../context/AlarmContext'
import { useTheme } from '../context/ThemeContext'
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material'

const SettingsPage = () => {
  const { user, setUser } = useUser()
  const { alarmTime, setAlarmTime, alarmActive, setAlarmActive } = useAlarm()
  const { darkMode, toggleTheme } = useTheme()
  const [editMode, setEditMode] = useState(false)
  const [tempUser, setTempUser] = useState({ ...user })

  const handleUserChange = (e) => {
    setTempUser({
      ...tempUser,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    // Recalculate BMI if weight or height changed
    if (tempUser.weight !== user.weight || tempUser.height !== user.height) {
      const bmi = (tempUser.weight / ((tempUser.height / 100) ** 2)).toFixed(1)
      setUser({ ...tempUser, bmi })
    } else {
      setUser(tempUser)
    }
    setEditMode(false)
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Profile Information
        </Typography>
        
        {editMode ? (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={tempUser.name}
              onChange={handleUserChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Weight (kg)"
              name="weight"
              type="number"
              value={tempUser.weight}
              onChange={handleUserChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Height (cm)"
              name="height"
              type="number"
              value={tempUser.height}
              onChange={handleUserChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Daily Step Goal"
              name="dailyGoal"
              type="number"
              value={tempUser.dailyGoal}
              onChange={handleUserChange}
            />
            
            <Box sx={{ mt: 2 }}>
              <Button 
                variant="contained" 
                onClick={handleSave}
                sx={{ mr: 2 }}
              >
                Save
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
            </Box>
          </>
        ) : (
          <List>
            <ListItem>
              <ListItemText primary="Name" secondary={user.name} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Weight" secondary={`${user.weight} kg`} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Height" secondary={`${user.height} cm`} />
            </ListItem>
            <ListItem>
              <ListItemText primary="BMI" secondary={user.bmi} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Daily Step Goal" secondary={user.dailyGoal.toLocaleString()} />
            </ListItem>
            <Button 
              variant="outlined" 
              fullWidth 
              sx={{ mt: 2 }}
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </Button>
          </List>
        )}
      </Paper>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Alarm Settings
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            label="Alarm Time"
            type="time"
            value={alarmTime}
            onChange={(e) => setAlarmTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ mr: 2 }}
          />
          <FormControlLabel
            control={
              <Switch 
                checked={alarmActive} 
                onChange={(e) => setAlarmActive(e.target.checked)} 
              />
            }
            label="Alarm Active"
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          The alarm will remind you to get up and walk at the specified time each day.
        </Typography>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Appearance
        </Typography>
        
        <FormControlLabel
          control={
            <Switch 
              checked={darkMode} 
              onChange={toggleTheme} 
            />
          }
          label="Dark Mode"
        />
      </Paper>
    </Box>
  )
}

export default SettingsPage