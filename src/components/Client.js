import React from 'react'
import Avatar from 'react-avatar';
const Client = ({username}) => {
  return (
    <div className='client'>
      <Avatar name={username}size={50} round="14px" />
      {/* <Avatar nane={username} size={50} round="50px" /> */}
{/* <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar> */}
      <span className='userName'>
        {username}
      </span>
    </div>
  )
}

export default Client
