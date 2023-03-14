import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import '../commentModal/Comment.css'


const CommentModal = (props) => {
    const [show, setShow] = useState(false);
    //const [Comments, setComments] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const postId = props.postID;


    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if(token){
            props.loadComment()
          }
        }, [])

    const loadComments = async () => {
        const response = await fetch(`/comments/${postId}`);
        const json = await response.json();

        if(response.ok) {
            //setComments(json.comments);
          }
    }

    let Comments = props.comments
  
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
            {Comments.map((comment) => 
            <Card className='innerComments' style={{ width: '75%' }}>
            <Card.Body>
              <Card.Title>{comment.poster.firstName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{comment.createdAt.split('T')[1].slice(0,5)} - {comment.createdAt.split('T')[0]} </Card.Subtitle>
              <Card.Text>
                {comment.comment}
              </Card.Text>
            </Card.Body>
          </Card>
            )}
            
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
