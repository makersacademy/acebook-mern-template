import NavigationBar from "../navigation/Navigation";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
// import EditPostForm from "./editPostForm"; // don't have this in at the moment, we could add it back later to make the code more DRY

const PostId = () => {
    const [post, setPost] = useState({ message: "", author: "", authorId: ""}); // Initial state with empty values
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [editPostValue, setEditPostValue] = useState(""); // State for form input value
    const ref = useRef(null);
    const { id } = useParams();

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
                setPost({
                    message: data.message,
                    author: data.author,
                    authorId: data.authorId
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

    return (
        <>
            <NavigationBar />
            <div>
                <p data-cy="post">{post.message}</p>
                <p data-cy="author">{post.author}</p>
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
        </>
    );
};

export default PostId;
