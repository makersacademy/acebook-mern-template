const CreateComment = () => {
  return ( 
    <div className="form-container">
      <form className="my-comment-form">
        <input type="text"></input>
      </form>
    </div>
    // Form
      // Input field
      // Starts as a text area
      // size - one line, length of comment box (minus margin)
      // Placeholder text: "Write a comment..."
      // Input field value is changed as you type
      // NO submit button, just enter: onKeyDown={handleKeyDown}
        // (handleKeyDown then submits the comment when 'enter' is pressed)
  );
}
 
export default CreateComment;