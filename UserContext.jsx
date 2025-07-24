// context/UserContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('healthUser')
    return saved ? JSON.parse(saved) : null
  })
  const [steps, setSteps] = useState(() => {
    const saved = localStorage.getItem('healthSteps')
    return saved ? JSON.parse(saved) : 0
  })
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('healthHistory')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('healthUser', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    localStorage.setItem('healthSteps', JSON.stringify(steps))
  }, [steps])

  useEffect(() => {
    localStorage.setItem('healthHistory', JSON.stringify(history))
  }, [history])

  const updateDailySteps = () => {
    const today = new Date().toISOString().split('T')[0]
    const existingDay = history.find(day => day.date === today)
    
    if (existingDay) {
      setHistory(history.map(day => 
        day.date === today ? { ...day, steps: steps } : day
      ))
    } else {
      setHistory([...history, { date: today, steps }])
    }
  }

  const incrementSteps = () => {
    setSteps(prev => prev + 1)
    if (steps % 20 === 19) { // Just before reaching next 20
      showMotivation()
    }
  }

  const showMotivation = () => {
    const motivations = [
      "Great job! Every step counts towards a healthier you!",
      "You're doing amazing! Keep it up!",
      "Small steps lead to big results!",
      "Your future self will thank you for this!",
      "Health is wealth! You're investing wisely!",
      "One step at a time - you've got this!",
      "Walking is the best medicine - keep going!",
      "You're stronger than you think! Keep moving!"
    ]
    const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)]
    alert(randomMotivation) // In a real app, use a nicer notification
  }

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      steps, 
      incrementSteps, 
      resetSteps: () => setSteps(0),
      history,
      updateDailySteps
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)