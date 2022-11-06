import React, {useEffect, useState} from 'react';

const Comment = ({comment}) => {

    const [comments, setComment] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const handleCommentChange = (event) => {
        setComment(event.target.value)
    }


    const loadComments = () => {
        if(token) {
          fetch("/comments", {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then(response => response.json())
            .then(async data => {
              window.localStorage.setItem("token", data.token)
              setToken(window.localStorage.getItem("token"))
              console.log(data);
              setComment(data.comments);
              ;
            })
        }
      }

    const handleCommentSubmit = async (event) => {
        event.preventDefault();

        if (token) fetch('/comments', {
          method: 'post',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({token: token, message: comments})
        })
          .then(response => response.json())
          .then(
            data => {   
            console.log(data);
          })
    
          
      }

    return(
        <body>
          <div class="comments">
            <form onSubmit={handleCommentSubmit}>
             <input id='commentMessage' placeholder="Add a comment.." type="text" value={comment} onChange={handleCommentChange}/>
             <input id='submitComment' type="submit" value="Submit"/>
           </form>
        </div>


        </body>
        
        
    )
}

export default Comment;