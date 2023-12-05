import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />}/>
      </Route>
    </Routes>
  )
}

export default App