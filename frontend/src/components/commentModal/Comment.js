import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CommentModal = (props) => {
    const [show, setShow] = useState(false);
    const [Comments, setComments] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const postId = props.postID;

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if(token){
            loadComments()
          }
        }, [])

    const loadComments = async () => {
        const response = await fetch(`/comments/${postId}`);
        const json = await response.json();

        if(response.ok) {
            setComments(json.comments);
          }
    }

    const commentDisplay = async () => {
        
    }

  
    return (

      <>

        <button type="button" onClick={handleShow} class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
            view comments
        </button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Comments</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {Comments.map((comment) => <div>{comment.poster.firstName} - {comment.comment}</div>)}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}




export default CommentModal;
