import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login/Login'
import Lista from './Pages/Lista/Lista'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Lista" element={<Lista />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
