// pages/History.jsx
import { useUser } from '../context/UserContext'
import { 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab,
  CircularProgress
} from '@mui/material'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { format, subDays, eachDayOfInterval, isSameDay } from 'date-fns'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const HistoryPage = () => {
  const { history } = useUser()
  const [tabValue, setTabValue] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (history.length > 0) {
      setLoading(false)
    }
  }, [history])

  const getLast7DaysData = () => {
    const days = eachDayOfInterval({
      start: subDays(new Date(), 6),
      end: new Date()
    }).reverse()
    
    return days.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd')
      const dayData = history.find(h => isSameDay(new Date(h.date), day))
      return {
        date: format(day, 'MMM dd'),
        steps: dayData ? dayData.steps : 0
      }
    })
  }

  const getLast4WeeksData = () => {
    const weeks = []
    for (let i = 3; i >= 0; i--) {
      const startDate = subDays(new Date(), (i + 1) * 7)
      const endDate = subDays(new Date(), i * 7)
      const weekData = history.filter(h => 
        new Date(h.date) >= startDate && new Date(h.date) < endDate
      )
      const totalSteps = weekData.reduce((sum, day) => sum + day.steps, 0)
      weeks.push({
        label: `Week ${4 - i}`,
        steps: totalSteps
      })
    }
    return weeks
  }

  const getLast6MonthsData = () => {
    const months = []
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date()
      monthStart.setMonth(monthStart.getMonth() - i)
      monthStart.setDate(1)
      
      const monthEnd = new Date(monthStart)
      monthEnd.setMonth(monthEnd.getMonth() + 1)
      
      const monthData = history.filter(h => 
        new Date(h.date) >= monthStart && new Date(h.date) < monthEnd
      )
      
      const totalSteps = monthData.reduce((sum, day) => sum + day.steps, 0)
      months.push({
        label: format(monthStart, 'MMM yyyy'),
        steps: totalSteps
      })
    }
    return months
  }

  const renderChart = () => {
    let data
    let title
    
    switch(tabValue) {
      case 0: // Days
        data = getLast7DaysData()
        title = 'Last 7 Days'
        break
      case 1: // Weeks
        data = getLast4WeeksData()
        title = 'Last 4 Weeks'
        break
      case 2: // Months
        data = getLast6MonthsData()
        title = 'Last 6 Months'
        break
      default:
        data = []
    }
    
    const chartData = {
      labels: data.map(item => item.label || item.date),
      datasets: [
        {
          label: 'Steps',
          data: data.map(item => item.steps),
          backgroundColor: 'rgba(63, 81, 181, 0.7)',
          borderColor: 'rgba(63, 81, 181, 1)',
          borderWidth: 1
        }
      ]
    }
    
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: title,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Steps'
          }
        }
      }
    }
    
    return <Bar data={chartData} options={options} />
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Your Activity History
      </Typography>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="fullWidth"
        >
          <Tab label="Days" />
          <Tab label="Weeks" />
          <Tab label="Months" />
        </Tabs>
      </Paper>
      
      <Box sx={{ height: '400px' }}>
        {renderChart()}
      </Box>
    </Box>
  )
}

export default HistoryPage