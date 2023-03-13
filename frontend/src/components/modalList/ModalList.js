import React, { useContext } from "react";
import Modal from "../modal/Modal";
import { ModalContext } from "../../contexts/modalContext";

const ModalList = () => {
  const { modals } = useContext(ModalContext);

  return (
    <div
      data-cy="modal-list"
      className="pointer-events-none fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex min-h-full items-end justify-center p-4 text-center">
        <div>
          {modals.map(({ message, type, id }) => (
            <Modal message={message} type={type} key={id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalList;
