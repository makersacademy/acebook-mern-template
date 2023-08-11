import NavigationBar from "../navigation/Navigation";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from '../navigation/Navigation';
// import EditPostForm from "./editPostForm"; // don't have this in at the moment, we could add it back later to make the code more DRY

const PostId = () => {
    const [post, setPost] = useState({});
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [comment, setComment] = useState("");
    const [allPostComments, setAllPostComments] = useState([
        "This post has no comments",
    ]);
    const [editPostValue, setEditPostValue] = useState(""); // State for form input value
    const ref = useRef(null);
    const [isLiked, setIsLiked] = useState();
    const { id } = useParams();
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };



    useEffect(() => {
        setAllPostComments(post.comments);
    }, [post]);

    useEffect(() => {
        fetch(`/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then(async (data) => {
                window.localStorage.setItem("token", data.token);
                setToken(window.localStorage.getItem("token"));
                const isPostLikedByUser = data.likes.includes(data.logged_in_user)
                setIsLiked(isPostLikedByUser)
                setPost({
                    message: data.message,
                    author: data.author,
                    authorId: data.authorId,
                    likedBy: data.likes,
                    likes: data.likes.length,
                    logged_in_user: data.logged_in_user,
                    comments: data.comments,
                });
            });
    }, []);


    const editPost = () => {
        fetch(`/posts/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: editPostValue,
            }),
        })
            .then((response) => response.json())
            .then( (data) => {
                window.localStorage.setItem("token", data.token);
                setToken(window.localStorage.getItem("token"));
                setPost({ ...post, message: data.message }); // spread operator to update the message but keep the author
                setEditPostValue("");
            });
    };
  
    const handleLike = async () => {
        const response = await fetch(`/posts/${id}/likeUnlike`,{
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 201) {
        const newLikesCount = post.likes + 1;
        setPost(prevPost => ({ ...prevPost, likes: newLikesCount }));
        setIsLiked(true)
        }
        
        if (response.status === 200) {
        const newLikesCount = post.likes - 1; 
        setPost(prevPost => ({ ...prevPost, likes: newLikesCount }));
        setIsLiked(false)
        }
    }
    
    const handleCommentSubmit = async () => {
        let response = await fetch(`/posts/${id}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ comment: comment }),
        });

        const responseStatus = response.status;
        response = await response.json();

        if (responseStatus === 201) {
            window.localStorage.setItem("token", response.token);
            setToken(window.localStorage.getItem("token"));

            setPost((prevPost) => ({
                ...prevPost,
                comments: response.post.comments,
            }));
        }
    };

  
    return (
        <>
            <NavigationBar />
            <div>
                <p data-cy="post">{post.message}</p>
                <p data-cy="author">{post.author}</p>
                <p data-cy='likes'>{post.likes} Likes</p>
            </div>
            <div>
                    <button id='likeUnlike' onClick={handleLike}>
                        {isLiked ? '🧡' : '🤍'}
                    </button>
                    {isLiked ? <p>Unlike this post</p> : <p>Like this post</p>}
            </div>
            { window.localStorage.getItem("userId") === post.authorId ?
            <div> 
                <form data-cy="editPostForm" onSubmit={editPost}>
                    <label>
                        <input
                            ref={ref}
                            defaultValue={post.message}
                            data-cy="editPost"
                            type="text"
                            name="message"
                            onChange={(e) => setEditPostValue(e.target.value)}
                        />
                    </label>
                    <input data-cy='submit' type="submit" value="Edit Post" />
                </form>
            </div> : null}
            <div>
                <ul data-cy="comments">
                    {allPostComments &&
                        allPostComments.map((commentObject, index) => {
                            return <li key={index}>{commentObject.comment}</li>;
                        })}
                </ul>
            </div>
            <div>
                <input
                    data-cy="commententry"
                    type="text"
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment..."
                />
                <button onClick={handleCommentSubmit}>Submit Comment</button>
            </div>
        </>
    );
};

export default PostId;
