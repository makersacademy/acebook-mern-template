import React from 'react';
// import useState from 'react';

const Post = ({post}) => {
  // const [token, setToken] = useState(window.localStorage.getItem("token"));
  // const handleLike = async () => {
  //   try {
  //     await fetch(`/posts/${ post._id }/likes` , {
  //       method: 'POST',
  //       headers: {
  //         // 'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //       },
        // body: JSON.stringify({})
      // })
      // .then(response => response.json())
      //   .then(async data => {
      //     window.localStorage.setItem("token", data.token)
      //     setToken(window.localStorage.getItem("token"))
      //   })
      // ;

      // console.log(token)
      

    //   const data = await response.json();
    //   console.log(data);
      
    // } catch (error) {
    //   console.error(error);
    // }
  // }

  return(
    <article data-cy="post" key={ post._id }>{ post.message }  <button>👍 | { post.like }</button></article>
  )
}
export default Post;

