import { useEffect, useState } from "react";

const useGetCurrentUser = (currentUserId) => {
  /* 
    Custom Hook to get authenticated user.
    Takes currentUserId as parameter.
    (Current User Id is available in ***'window.localStorage'***)

    params:
        - currentUserId
    
    returns:
        - Current User Object
        - setCurrentUser funct
        - following - array of profiles followed by currently logged user
        - setFollowing funct

    */
  const [currentUser, setCurrentUser] = useState("");
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    fetch(`/api/users/${currentUserId}`, {})
      .then((response) => response.json())
      .then(async (data) => {
        setCurrentUser(data.user);
        setFollowing(data.user.following);
      });
  }, [currentUserId]);
  return [currentUser, setCurrentUser, following, setFollowing];
};
export default useGetCurrentUser;
