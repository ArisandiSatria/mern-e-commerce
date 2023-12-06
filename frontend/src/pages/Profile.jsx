import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userIsLoggedIn } from '../state/selector/loggedInUser'
import { userState } from '../state/atom/userState'

const Profile = () => {
  const userData = useRecoilValue(userIsLoggedIn)
  const [user, setUser] = useRecoilState(userState)

  const [error, setError] = useState(false)

  const handleLogOut = async () => {
    try {
      const res = await fetch('/api/auth/logout')
      const data = await res.json()
      if (data.success == false) {
        setError(data.message)
        return
      }
      setUser(null)
      setError(null)
    } catch (error) {
      setError(error.message)
    }
  }
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <img src={userData.avatar} alt="" />
      <button className='mt-10' onClick={handleLogOut}>Log Out</button>
      <p>{error && error}</p>
    </div>
  )
}

export default Profile