import React from 'react'
import UserRec from './UserRec.jsx';

const Feed = () => {
  return (
    <div className="feed-wrapper">
        <UserRec />
        <UserRec />
        <UserRec />
    </div>
  )
}

export default Feed