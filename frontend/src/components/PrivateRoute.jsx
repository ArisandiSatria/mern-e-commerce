import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userIsLoggedIn } from '../state/selector/loggedInUser'

const PrivateRoute = () => {
  const user = useRecoilValue(userIsLoggedIn)

  return (
    user ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoute