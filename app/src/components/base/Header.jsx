import React, { useContext } from 'react'
import { userContext } from '../../context/UserContext'
import InviteField from './InviteField';

const Header = () => {
  const {name} = useContext(userContext);
  return (
    <div className='header-section'>
      <h1>🔥 Welcome Back, {name}!</h1>
      <div className='invite-section'>
        <InviteField/>
      </div>
    </div>
  )
}

export default Header
