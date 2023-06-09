import { useEffect, useState } from "react"
import { useParams } from "react-router";

const UpdatePost = ({ navigate }) => {
  // const [token, setToken] = useState(window.localStorage.getItem("token"));
  const post_id = useParams();
  console.log(post_id.id);
  
  return(
    <>
      <h2>Post {`${post_id.id}`}</h2>
      <div id='feed' role="feed">
          <p>test</p>
      </div>
    </>
  )
}

export default UpdatePost;
