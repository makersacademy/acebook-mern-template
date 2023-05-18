import React from "react";
import "./GoodbyeForm.css";
import eye_roll from "./eye_roll.gif";
import brand from "./brand.gif";

const goodbyeMessages = [
  {
    message: "Bye, Karen!",
    image: eye_roll,
  },
  {
    message: "Let's be honest...",
    image: brand,
  },
  // Add more goodbye messages and corresponding images as needed
];

const GoodbyeForm = () => {
  // Generate a random index to select a random goodbye message and picture
  const randomIndex = Math.floor(Math.random() * goodbyeMessages.length);
  const randomGoodbye = goodbyeMessages[randomIndex];

  return (
    <div className="goodbye-container">
      <h1 className="goodbye-message">{randomGoodbye.message}</h1>
      <img className="goodbye-image" src={randomGoodbye.image} alt="Goodbye" />
      <p>
        If you change your mind and want to moan some more,{" "}
        <a href="/signup">click here to sign up again</a>.
      </p>
    </div>
  );
};

export default GoodbyeForm;
