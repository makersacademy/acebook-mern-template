import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./components/app/App";
import reportWebVitals from "./reportWebVitals";
import ModalContextProvider from "./contexts/modalContext";
import TokenContextProvider from "./contexts/tokenContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <TokenContextProvider>
      <ModalContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ModalContextProvider>
    </TokenContextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
