import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = ({ navigate }) => {

  const { id } = useParams();
  // const hello = 'hello000'
  return (
    <>
    <h2> {id} Profile! </h2> 
      <h3> Your posts </h3>
 
    </>
  );

};

export default UserProfile;