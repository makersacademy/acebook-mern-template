import React, { useState, useEffect } from 'react';

const Comment = ({ data }) => {
  return (<>
      <article data-cy="comment">{data.message}</article>
  </>)
}
export default Comment;