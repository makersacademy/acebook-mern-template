import React, { useContext, useEffect, useState, useRef } from "react";
import Modal from "../modal/Modal";
import { ModalContext } from "../../contexts/modalContext";
import classNames from "../../helpers/classNames";

const ModalList = () => {
  const { modals, removeModal } = useContext(ModalContext);
  const [height, setHeight] = useState(0);
  const [transition, setTransition] = useState(false);
  const [modalCount, setModalCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    // only transition when adding a modal
    setTransition(modals.length > modalCount);

    setHeight(ref.current.clientHeight);

    setModalCount(modals.length);
  }, [modals]);

  return (
    <div
      data-cy="modal-list"
      className="pointer-events-none fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex min-h-full items-end justify-center p-4 text-center">
        <div
          style={{
            height: `${height}px`,
          }}
          className={classNames(transition && "transition-all", "ease-in-out")}
        >
          <div ref={ref} className="space-y-2">
            {modals.map(({ message, type, id }) => (
              <Modal
                message={message}
                type={type}
                key={id}
                remove={() => {
                  removeModal(id);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalList;
