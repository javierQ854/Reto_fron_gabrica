import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './Page/Landing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='c_principal'>
      <LandingPage/>
    </div>
  )
}

export default App
