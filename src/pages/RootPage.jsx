import React from 'react'

const RootPage = () => {
  return (
    <div>
        <h1>Welcome to AoE</h1>
        <p>Please <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link></p>
    </div>
  )
}

export default RootPage