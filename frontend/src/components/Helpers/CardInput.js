import React from "react";
import './CardInput.css';

const CardInput = (props) => {
  return(
    <div className="card-input">
      {props.children}
    </div>
  )
}

export default CardInput;