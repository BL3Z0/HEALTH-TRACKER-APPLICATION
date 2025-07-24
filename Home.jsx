import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useAlarm } from '../context/AlarmContext';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  CircularProgress,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { Alarm, AlarmOn, DirectionsWalk } from '@mui/icons-material';

const Home = () => {
  const { user, steps, incrementSteps, resetSteps } = useUser();
  const { alarmActive, setAlarmActive } = useAlarm();
  const [lastTap, setLastTap] = useState(0);
  const [cooldown, setCooldown] = useState(false);

  if (!user) return <Typography>Loading user data...</Typography>;

  const handleTap = () => {
    const now = Date.now();
    if (now - lastTap < 300) return; // 300ms cooldown
    if (cooldown) return;
    
    incrementSteps();
    setLastTap(now);
    
    // Visual feedback
    setCooldown(true);
    setTimeout(() => setCooldown(false), 100);
  };

  const progress = Math.min((steps / user.dailyGoal) * 100, 100);

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Welcome, {user.name}!
      </Typography>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Today's Progress</Typography>
          <Box sx={{ position: 'relative', display: 'inline-flex', my: 2 }}>
            <CircularProgress 
              variant="determinate" 
              value={progress} 
              size={150} 
              thickness={5}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" component="div">
                {steps}/{user.dailyGoal}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {progress.toFixed(1)}% of your daily goal
          </Typography>
        </CardContent>
      </Card>
      
      <Paper 
        elevation={cooldown ? 8 : 4} 
        sx={{ 
          p: 4, 
          mb: 3,
          cursor: 'pointer',
          transition: 'all 0.1s ease',
          backgroundColor: cooldown ? 'action.selected' : 'background.paper',
          touchAction: 'manipulation'
        }}
        onTouchStart={handleTap}
        onClick={handleTap}
      >
        <DirectionsWalk sx={{ fontSize: 60 }} />
        <Typography variant="h6">Tap to record a step</Typography>
        <Typography variant="body2" color="text.secondary">
          Current step count: {steps}
        </Typography>
      </Paper>
      
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            fullWidth 
            onClick={resetSteps}
          >
            Reset Steps
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button 
            variant="outlined" 
            fullWidth 
            startIcon={alarmActive ? <AlarmOn /> : <Alarm />}
            onClick={() => setAlarmActive(!alarmActive)}
          >
            {alarmActive ? 'Alarm On' : 'Alarm Off'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;