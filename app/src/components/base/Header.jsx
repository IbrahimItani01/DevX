import React, { useContext } from 'react'
import { userContext } from '../../context/UserContext'
import InviteField from './InviteField';

const Header = () => {
  const userData = useContext(userContext);
  return (
    <div className='header-section'>
      <h1>🔥 Welcome Back, {userData.name}!</h1>
      <div className='invite-section'>
        <InviteField/>
      </div>
    </div>
  )
}

export default Header
