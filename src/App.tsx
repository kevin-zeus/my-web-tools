import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomeLayout from './layout/HomeLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <HomeLayout />
    </div>
  )
}

export default App
