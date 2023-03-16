import {createContext, useState} from 'react';

const UserContext = createContext();

const UserProvider = (props) => {
  const [userInfo, setUserInfo] = useState(null);

  const handleUserInfo = (value) => {
    setUserInfo(value);
  };


  return <UserContext.Provider value={{userInfo, handleUserInfo}}>{props.children}</UserContext.Provider>;
}

export {UserProvider, UserContext}