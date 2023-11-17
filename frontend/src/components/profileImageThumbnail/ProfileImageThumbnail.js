import React, { useState } from 'react';
import './ProfileImageThumbnail.css';
import defaultProfileImage from '../../assets/defaultProfile.png';// TODO: Make this unnecessary

const ProfileImageThumbnail = ({ user }) => {

  return(
    <div data-cy="profileImageThumbnail">
      <a href={ `/profile/${user._id}` /* TODO: confirm this can work */ }>
        <img
          className="smallProfileImage"
          src={ defaultProfileImage /* TODO: change this to point at the user's actual profile image */}
          alt={ `${user.displayName}` }
        ></img>
      </a>
    </div>
  )
}

export default ProfileImageThumbnail;