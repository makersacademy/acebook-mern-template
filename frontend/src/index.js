import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./components/app/App";
import reportWebVitals from "./reportWebVitals";
import ModalContextProvider from "./contexts/modalContext";
import CloudinaryContextProvider from "./contexts/cloudinaryContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ModalContextProvider>
        <CloudinaryContextProvider>
          <App />
        </CloudinaryContextProvider>
      </ModalContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
