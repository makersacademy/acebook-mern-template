import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavModal.module.css";


const [isActive, setActive] = useState("false");
const ToggleClass = () => {
  setActive(!isActive); 
 
return (
  <div className={isActive ? "active" : null"}>      
    <h1>Hello Devdojo</h1>
    <button onClick={ToggleClass}>Toggle class</button>    
  </div>
);
}

export default NavModal