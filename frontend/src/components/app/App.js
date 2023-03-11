import "./App.css";
import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../user/SignUpForm";
import Feed from "../feed/Feed";
import Card from "../card/Card";
import ModalView from "../modalView/ModalView";
import ModalContext from "../modalContext/ModalContext";

const App = () => {
  const [modals, setModals] = useState([]);

  const pushModal = (modal) => {
    const id = new Date().getTime().toString();
    const newModal = { ...modal, id };
    setModals((prevState) => prevState.concat(newModal));
    setTimeout(() => {
      setModals((prevState) => prevState.slice(1));
    }, 3000);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ModalContext.Provider value={{ modals, pushModal }}>
      <ModalView />
      <Routes>
        <Route path="/posts" element={<Feed navigate={useNavigate()} />} />
        <Route path="/login" element={<LoginForm navigate={useNavigate()} />} />
        <Route
          path="/signup"
          element={<SignUpForm navigate={useNavigate()} />}
        />
        <Route path="/card" element={<Card />} />
      </Routes>
    </ModalContext.Provider>
  );
};

export default App;
