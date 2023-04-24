import React from "react";
import Button from "../button/Button";
import styles from "./LandingPage.css";

const LandingPage = ({ navigate }) => {
  return (
    <section class="landing">
      <svg
        class="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320">
        <path
          fill="#3360FF"
          fill-opacity="0.26"
          d="M0,96L80,85.3C160,75,320,53,480,64C640,75,800,117,960,117.3C1120,117,1280,75,1360,53.3L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
      </svg>
      <div className="hero">
        <div class="header">Acebook</div>
        <p className="text">
          Miaow then turn around and show you my bum have a lot of grump in
          yourself because you can't forget to be grumpy and not be like king
          grumpy cat, take a deep sniff of sock then walk around with mouth half
          open. What the heck just happened, something feels fishy warm up
          laptop with butt lick butt fart rainbows until owner yells pee in
          litter box hiss at cats so no, you can't close the door
        </p>
        <Button navigate={navigate} routePath={"/signup"} text={"Sign up"} />
      </div>
    </section>
  );
};

export default LandingPage;
