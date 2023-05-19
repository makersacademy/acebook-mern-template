import React, { useEffect, useState, useContext, createContext} from 'react';
import Post from '../post/Post'
import {loggedInContext} from '../app/App'
import './Feed.css';

import NewPostForm from '../new-post/NewPostForm'

export const refreshContext = createContext();

const Feed = ({ navigate }) => {
  const [loggedIn, setLoggedIn] = useContext(loggedInContext)
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  // We have a new constant called refresh, starts by false as default
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if(token) {
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          if (data.posts) {
            setPosts(data.posts);
          }
        })
    } else {
      navigate('/login')
    }
    // use effect watches over the refresh constant and executes the function
    // within each time refresh changes
  }, [refresh])

  const toggleRefresh = () => {
    // sets whatever is inside refresh to the opposite, triggering a refresh
    // through useeffect. this is activated whenever the newpostform is
    // submitted
    setRefresh(prevRefresh => !prevRefresh);
  };

  const comparebyDate = ( a, b ) => {
    if ( a.createdDateTime < b.createdDateTime ){
      return 1;
    }
    if ( a.createdDateTime > b.createdDateTime ){
      return -1;
    }
    return 0;
  }

  if(token) {
    return(
      <>
        <h2>Posts</h2>

        <div className="new-post-form">
          < NewPostForm toggleRefresh={toggleRefresh}/><br></br>
        </div>

        <div id='feed' role="feed">
          <refreshContext.Provider value={[refresh, setRefresh]}>
            {posts.sort(comparebyDate).map(
              (post) => ( <Post post={ post } key={ post._id } toggleRefresh={toggleRefresh}/> )
            )}
          </refreshContext.Provider>
        </div>
      </>
    )
  } else {
    navigate('/signin')
  }
}

export default Feed;
