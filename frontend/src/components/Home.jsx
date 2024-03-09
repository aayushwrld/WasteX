import React from "react";
import { Center, SimpleGrid, Text } from "@chakra-ui/react";
import back from "./../assets/back.png";
import { Button } from "@chakra-ui/button";
import { useNavigate } from "react-router";
import bgImg from "./../assets/bg-img.png";


const Home = () => {
  const navigate = useNavigate();
  function regiNavigate() {
    navigate("/society/signup");
  }
  function eduNavigation() {
    navigate("/education");
  }

  return (
    <>
      <div className="home-parent">
        <div className="moto-div">
          <div className="moto">Turning Trash into Treasure</div>
          <div className="sub-moto">
            Revolutionizing Waste Management Together
          </div>
          <a onClick={regiNavigate}>Want to register your society? Click here</a>
          <Button
            width="11vmax"
            backgroundColor="#fefed4"
            color="green"
            border="3px green solid"
            onClick={eduNavigation}
          >
            <Text fontSize="1.5vmax">Learn More</Text>
          </Button>
        </div>
        <div className="right-img-div">
          <img className="right-img" src={bgImg} />
        </div>
      </div>
    </>

  );
};

export default Home;
