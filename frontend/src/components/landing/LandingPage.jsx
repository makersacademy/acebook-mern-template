import React from "react";
import RouteButton from "../routeButton/RouteButton";
import styles from "./LandingPage.css";

const LandingPage = ({ navigate }) => {
  return (
    <section className="landing">
      <h1 className="landing-header">ACEBOOK</h1>
      <p className="landing-text">
        Miaow then turn around and show you my bum have a lot of grump in
        yourself because you can't forget to be grumpy and not be like king
        grumpy cat, take a deep sniff of sock then walk around with mouth half
        open. What the heck just happened, something feels fishy warm up laptop
        with butt lick butt fart rainbows until owner yells pee in litter box
        hiss at cats so no, you can't close the door
      </p>
      <RouteButton navigate={navigate} routePath={"/signup"} text={"Sign up"} />
    </section>
  );
};

export default LandingPage;
