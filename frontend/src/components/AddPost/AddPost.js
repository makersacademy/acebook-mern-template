import React, { useState } from 'react';

const AddPost = ({ navigate }) => {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleSubmit = (event) => {
    event.preventDefault();

    // useEffect(() => {
      if (token) {
        
        // fetch("/posts", {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // })
        //   .then(response => response.json())
        //   .then(async data => {
        //     window.localStorage.setItem("token", data.token)
        //     setToken(window.localStorage.getItem("token"))
        //     setPosts(data.posts);
        //   })

        fetch('/posts', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: message })
        })
          .then(response => response.json())
          .then(async data => {
            window.localStorage.setItem("token", data.token);
            setToken(window.localStorage.getItem("token"));
            console.log(data)
            // setPosts(data.posts);
          })
    
        // if (response.status !== 201) {
        //   console.log(response)
        //   navigate('/posts')
        // } else {
        //   console.log("Yay!")
        //   let data = response.json()
        //   window.localStorage.setItem("token", data.token)
        //   navigate('/posts');
        // }

      }
    // }, [])
  }

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   useEffect(() => {
  //     if (token) {
        
  //       // fetch("/posts", {
  //       //   headers: {
  //       //     'Authorization': `Bearer ${token}`
  //       //   }
  //       // })
  //       //   .then(response => response.json())
  //       //   .then(async data => {
  //       //     window.localStorage.setItem("token", data.token)
  //       //     setToken(window.localStorage.getItem("token"))
  //       //     setPosts(data.posts);
  //       //   })

  //       let response = await fetch('/posts', {
  //         method: 'POST',
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ message: message })
  //       })
    
  //       if (response.status !== 201) {
  //         console.log(response)
  //         navigate('/posts')
  //       } else {
  //         console.log("Yay!")
  //         let data = await response.json()
  //         window.localStorage.setItem("token", data.token)
  //         navigate('/posts');
  //       }

  //     }
  //   }, [])
  // }

    const handleMessageChange = (event) => {
      setMessage(event.target.value)
    }

    return (
      <>
        <form onSubmit={handleSubmit}>
          <input placeholder='Message' id="message" type='text' value={message} onChange={handleMessageChange} />
          <input role='submit-button' id='submit' type="submit" value="Submit" />
        </form>
    
      </>
    )
  }


export default AddPost;