import React, { useState } from 'react';
import './Delete.css';

const Delete = ({}) => {

  const handleDelete = async () => {
    console.log("been pressed")
  }

  return (
    <>
    <button onClick={handleDelete} className="delete-button">❌</button>
    </>
    )
}

export default Delete