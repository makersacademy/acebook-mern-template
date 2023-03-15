import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const UserInfo = () => {
  const { user } = useContext(AuthContext);

  return <div>{user.name}</div>;
};

export default UserInfo;
