import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Authentication from './Pages/Authentication'

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Authentication />} />
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
