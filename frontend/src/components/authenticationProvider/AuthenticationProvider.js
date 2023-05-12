import React, { createContext, useState } from 'react'

export const AuthenticationContext = createContext({})

const AuthenticationProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  return (
    <AuthenticationContext.Provider value={{isLoggedIn, setIsLoggedIn, username, setUsername}}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationProvider;
