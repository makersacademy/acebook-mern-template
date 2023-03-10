import React from "react";
import PropTypes from "prop-types";
import Modal from "../modal/Modal";

const ModalView = ({ modals }) => {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center">
        <div>
          {modals.map(({ message, style, id }) => (
            <Modal message={message} style={style} key={id} />
          ))}
        </div>
      </div>
    </div>
  );
};

ModalView.propTypes = {
  modals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ModalView;
