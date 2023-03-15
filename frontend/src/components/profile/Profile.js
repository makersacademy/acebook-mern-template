import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const Profile = ({ navigate }) => {
  const [user, setUser] = React.useState(null)
  const { id } = useParams()

useEffect(() => {
  getUserDetails()
}, [])


  const getUserDetails = async () => {
    const response = await fetch(`/users/userInfo/${id}`);
    const json = await response.json();
  

    if(response.ok) {
      console.log(response)
      console.log(json);
    }
  }
  

    return (
      <h1>{id}</h1>

    )

}

export default Profile