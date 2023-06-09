import { useEffect, useState } from "react"

const UpdatePost = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const post_id = '6483207441bded05b7bfe1fa'

  return(
    <>
      <h2>Post {`${post_id}`}</h2>
      <div id='feed' role="feed">
          <p>test</p>
      </div>
    </>
  )

}

export default UpdatePost;
