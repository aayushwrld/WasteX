import React from "react";

import back from "./../assets/back.png";
import { Button } from "@chakra-ui/button";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  function regiNavigate() {
    navigate("/society/signup");
  }
  function eduNavigation() {
    navigate("/education");
  }

  return (
    <div className="home-parent">
      <div className="moto-div">
        <div className="moto">Turning Trash into Treasure</div>
        <div className="sub-moto">
          Revolutionizing Waste Management Together
        </div>
        <a onClick={regiNavigate}>Get Started with society registeration--</a>
        <Button
          width="11vmax"
          backgroundColor="#fefed4"
          color="green"
          border="3px green solid"
          onClick={eduNavigation}
        >
          Learn More
        </Button>
      </div>
      <div className="right-img-div">
        <img className="right-img" src={back} />
      </div>
    </div>
  );
};

export default Home;
