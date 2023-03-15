import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "../button/Button";

const UserInfo = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex">
      <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gray-800">
        Picture
      </div>
      <div>
        <div>
          {user.name}
          <Button text="Edit Name" className="w-fit" />
        </div>

        <div>
          {user.email}
          <Button text="Edit Email" className="w-fit" />
        </div>

        <div>
          <Button text="Change Photo" className="w-fit" />
          <Button text="Change Password" className="w-fit" />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
