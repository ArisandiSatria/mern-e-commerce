import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import { useRecoilValue } from "recoil";
import { userIsLoggedIn } from "./state/selector/loggedInUser";
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'

const App = () => {
  const userData = useRecoilValue(userIsLoggedIn);

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/product-detail/:id" element={<ProductDetail/>}/>
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={userData && userData.role == "customer" ? <Profile /> : <Admin />}/></Route>
        <Route path="/cart" element={<Cart/>}/>
    </Routes>
  )
}

export default App