import React from "react";
import LogInForm from "../auth/LoginForm";
import "./Home.css";
import {useNavigate} from "react-router-dom";

const Home = () => {
  return(
    <div className="home-background">
    {/* LEFT PART */}
      <div className="home-container"> 
        <div className="home-title">
          <div className="home-logo">
            <h1>spybook &#129464;</h1>
          </div>
          <p className="home-description"> 
          Connects world’s greatest superheroes.
            {/* The world’s greatest famous crime fighting superheroes of Metroville, 
            connect here with friends and the world around you on Spybook. */}
            <br/>
            Saving lives and battling evil on a daily basis.
          </p>
        </div>
        {/* LOGIN FORM */} 
          <LogInForm navigate={ useNavigate() }/>
      </div>
    </div>
  )
};

export default Home;