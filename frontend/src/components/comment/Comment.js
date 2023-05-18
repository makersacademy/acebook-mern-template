import React, {useState} from 'react';


const CommentBox = () => {
  const[commentValue, setCommentValue] = useState("");
  
  const handleCommentValue = (e) => {
    setCommentValue(e.target.value);
  };

  return
}