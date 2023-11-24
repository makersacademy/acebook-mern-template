import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const useGetCurrentUser = (currentUserId, token) => {
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
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      fetch(`/api/users/${currentUserId}`, {})
        .then((response) => response.json())
        .then(async (data) => {
          setCurrentUser(data.user);
          setFollowing(data.user.following);
        });
    } else {
      navigate("/login");
    }
  }, [currentUserId]);
  return [currentUser, setCurrentUser, following, setFollowing];
};
export default useGetCurrentUser;
