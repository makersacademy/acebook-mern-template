import React from 'react';


const EditPostForm = ({post}) => {
  return(

    //form containing post message and submit button
    <form data-cy="editPostForm">
        <label>
            Message:
            <input  data-cy='editPost' type="text" name="message"/>
        </label>
        <input type="submit" value="Submit"/>
    </form>



  )
}

export default EditPostForm;