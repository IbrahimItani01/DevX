import React from 'react'
import RoleIcon from './RoleIcon'
import "../../styles/invite.css"
import Input from "../base/Input"
import Button from "../base/Button"
const InviteField = () => {
  return (
    <div className='invite-section'>
      <RoleIcon role={"edit"}/>
      <RoleIcon role={"view"}/>
      <Input type='email' placeholder='Invitee Email ...'></Input>
      <Button text={"Invite"}/>
    </div>
  )
}

export default InviteField