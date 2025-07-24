// context/AlarmContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

const AlarmContext = createContext()

export const AlarmProvider = ({ children }) => {
  const [alarmTime, setAlarmTime] = useState(() => {
    const saved = localStorage.getItem('alarmTime')
    return saved ? JSON.parse(saved) : '08:00'
  })
  const [alarmActive, setAlarmActive] = useState(() => {
    const saved = localStorage.getItem('alarmActive')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('alarmTime', JSON.stringify(alarmTime))
    localStorage.setItem('alarmActive', JSON.stringify(alarmActive))
  }, [alarmTime, alarmActive])

  const checkAlarm = () => {
    if (!alarmActive) return
    
    const now = new Date()
    const [hours, minutes] = alarmTime.split(':')
    const alarmDate = new Date()
    alarmDate.setHours(hours, minutes, 0, 0)
    
    if (
      now.getHours() === alarmDate.getHours() &&
      now.getMinutes() === alarmDate.getMinutes()
    ) {
      // Trigger alarm
      alert('Time to get up and walk! 🚶‍♂️')
      // In a real app, you would play a sound here
    }
  }

  useEffect(() => {
    const interval = setInterval(checkAlarm, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [alarmTime, alarmActive])

  return (
    <AlarmContext.Provider value={{ alarmTime, setAlarmTime, alarmActive, setAlarmActive }}>
      {children}
    </AlarmContext.Provider>
  )
}

export const useAlarm = () => useContext(AlarmContext)