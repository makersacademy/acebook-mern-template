import React from "react";
import "./Home.css";

const Home = () => {
  return(
    <div>
    <div className="induction">
      <h1>The Spybook</h1>
      <p>The world’s greatest famous crime fighting superheroes of Metroville,<br /> 
        connect here with friends and the world around you on Spybook.<br />
        Saving lives and battling evil on a daily basis.</p>
    </div>
    <img src="/images/logo.png" alt="logo" className="logo"/>
    </div>
  )
};

export default Home;