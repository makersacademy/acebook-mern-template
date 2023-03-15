import * as React from 'react'
import { useParams } from 'react-router-dom'

const Profile = ({ navigate }) => {
  const [user, setUser] = React.useState(null)
  const { id } = useParams()
  console.log(id)


    return (
      <h1>{id}</h1>

    )

}

export default Profile