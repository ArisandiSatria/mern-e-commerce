import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userIsLoggedIn } from '../state/selector/loggedInUser'
import Cookies from 'js-cookie';
import { userState } from '../state/atom/userState';

const PrivateRoute = () => {
  const userData = useRecoilValue(userIsLoggedIn)
  const [user, setUser] = useRecoilState(userState);

  const isCookiePresent = Cookies.get('access_token')

  return (
    userData && isCookiePresent ? <Outlet /> : (setUser(null), <Navigate to="/login" />)
  )
}

export default PrivateRoute