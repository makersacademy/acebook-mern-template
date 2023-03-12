import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import ModalList from "../components/modalList/ModalList";

export const ModalContext = React.createContext();

const ModalContextProvider = ({ children }) => {
  const [modals, setModals] = useState([]);

  const pushModal = (modal) => {
    const id = new Date().getTime().toString();
    const newModal = { ...modal, id };
    setModals((prevState) => prevState.concat(newModal));
    setTimeout(() => {
      setModals((prevState) => prevState.slice(1));
    }, 3000);
  };

  const context = useMemo(() => ({ modals, pushModal }), [modals]);

  return (
    <ModalContext.Provider value={context}>
      <ModalList modals={modals} />
      {children}
    </ModalContext.Provider>
  );
};

ModalContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ModalContextProvider;
