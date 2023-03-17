/* eslint-disable react/destructuring-assignment */
import React, { useState, useContext, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Dialog } from "@headlessui/react";
import PostContent from "../postContent/PostContent";

import { AuthContext } from "../../contexts/AuthContext";

const PostContainer = ({ post }) => {
  const { token, setToken } = useContext(AuthContext);
  const [comments, setComments] = useState(post.comments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const postId = post._id;

  // useCallback memoizes the function so that it is only called when the dependencies change. Preventing unnecessary re-renders
  const getComments = useCallback(async () => {
    if (token) {
      const response = await fetch(`/posts/${postId}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        console.log(response);
        // Render Modal with generic error message
      } else {
        const data = await response.json();
        window.localStorage.setItem("token", data.token);
        setToken(data.token);
        setComments(data.comments);
      }
    }
  }, [token, postId]);

  useEffect(() => {
    getComments();
  }, []);

  const handlePostClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="">
      <div role="presentation" onClick={handlePostClick}>
        {/* {console.log(comments)} */}
        <PostContent
          post={post}
          getComments={getComments}
          comments={comments}
        />
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="fixed inset-0 z-10 overflow-y-auto"
        >
          <div className="flex min-h-screen w-screen items-center justify-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <div className="relative w-1/2 rounded-lg bg-white p-8">
              <PostContent
                post={post}
                getComments={getComments}
                comments={comments}
                defaultShowComments
              />
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

PostContainer.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    message: PropTypes.string,
    authorId: PropTypes.string,
    createdAt: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.string),
    likes: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
      imageId: PropTypes.string,
    }),
    image: PropTypes.string,
  }).isRequired,
};

export default PostContainer;
