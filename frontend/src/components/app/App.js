import "./App.css";
import React, { useContext } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../user/SignUpForm";
import Feed from "../feed/Feed";
import Card from "../card/Card";
import ModalList from "../modalList/ModalList";
import WithoutNav from "../withoutNav/WithoutNav";
import WithNav from "../withNav/WithNav";
import { TokenContext } from "../../contexts/tokenContext";

const App = () => {
  const { token } = useContext(TokenContext);

  return (
    <>
      <ModalList />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route element={<WithNav />}>
          <Route
            path="/posts"
            element={
              token ? (
                <Feed navigate={useNavigate()} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Route>
        <Route element={<WithoutNav />}>
          <Route
            path="/login"
            element={
              token ? (
                <Navigate to="/posts" />
              ) : (
                <LoginForm navigate={useNavigate()} />
              )
            }
          />
          <Route
            path="/signup"
            element={<SignUpForm navigate={useNavigate()} />}
          />
        </Route>
        <Route path="/card" element={<Card />} />
      </Routes>
    </>
  );
};

export default App;
