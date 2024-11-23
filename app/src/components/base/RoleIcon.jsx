import { Eye, Pencil } from 'lucide-react'
import React from 'react'

const RoleIcon = ({role}) => {
  return (
    <div className='role-button'>
      {role==="edit"?<Pencil/>:<Eye/>}
    </div>
  )
}

export default RoleIcon
