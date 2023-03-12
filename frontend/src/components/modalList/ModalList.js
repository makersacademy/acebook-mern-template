import React from "react";
import PropTypes from "prop-types";
import Modal from "../modal/Modal";

const ModalList = ({ modals }) => {
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

ModalList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  modals: PropTypes.array.isRequired,
};

export default ModalList;
