import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const Profile = ({ navigate }) => {
  const [user, setUser] = React.useState()
  const { id } = useParams()

useEffect(() => {
  getUserDetails()
}, [])


  const getUserDetails = async () => {
    const response = await fetch(`/users/userInfo/${id}`);
    const json = await response.json();
  

    if(response.ok) {
      console.log(response)
      setUser(json);
    }
  }
  

    return (
      <>
      {user ?
      <>
      <h1>{user.user.firstName} {user.user.lastName}</h1>
      <h2>{user.user.email}</h2> 
      </>
      :
      <h1>Can't find user</h1>
    }
      </>
    )

}

export default Profile