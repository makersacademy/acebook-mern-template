import "./App.css";
import React, { useContext } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import ModalList from "../modalList/ModalList";
import WithNav from "../withNav/WithNav";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../user/SignUpForm";
import Feed from "../feed/Feed";
import NotFound from "../notFound/NotFound";

import { AuthContext } from "../../contexts/AuthContext";

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <ModalList />
      <Routes>
        <Route element={<WithNav />}>
          <Route
            path="/"
            element={token ? <Feed /> : <Navigate to="/login" />}
          />
        </Route>

        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <LoginForm />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/" /> : <SignUpForm />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
