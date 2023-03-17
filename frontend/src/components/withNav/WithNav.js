import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../navBar/NavBar";

export default () => {
  return (
    <>
      <NavBar />
      <div className="mx-auto max-w-2xl px-2">
        <Outlet />
      </div>
    </>
  );
};
