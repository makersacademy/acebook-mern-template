import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ModalContext } from "../contexts/ModalContext";

export default () => {
  const { setToken, setUser } = useContext(AuthContext);
  const { pushModal } = useContext(ModalContext);

  const logout = () => {
    window.localStorage.removeItem("token");
    setToken(null);
    setUser({});
    pushModal({
      message: "Successfully logged out",
      type: "success",
    });
  };

  return { logout };
};
