import { useState, useEffect } from 'react';

  const useLikes = (post_id,token) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(null)

 
  useEffect(() => {
      fetch(`posts/${post_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${token}`
        },

        body: JSON.stringify({
          'field': 'likes',
          'value': window.localStorage.getItem('user_id'),
        })
      }
    ).then((response) => {
      setUpdated(false)
      setUpdated(true)
    })

    console.log(window.localStorage.getItem('user_id'))
    console.log(post_id)

  
   },[updated])

   return
  
  }
  export default useLikes;
