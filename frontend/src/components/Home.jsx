import React from "react";
import { Center, SimpleGrid, Text } from "@chakra-ui/react";
import back from "./../assets/back.png";
import { Button } from "@chakra-ui/button";
import { useNavigate } from "react-router";
import bgImg from "./../assets/home-img.png";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const Home = () => {
  const navigate = useNavigate();
  function regiNavigate() {
    navigate("/society/signup");
  }
  function eduNavigation() {
    navigate("/education");
  }
  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        element: ".moto-div",
        popover: {
          title: "Moto of our Project",
          description: "This div showcases the moto of our website",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: ".society-register",
        popover: {
          title: "Register Society",
          description: "Any society can register by clicking here and then users of that society would be able to register themselves on this portal.",
          side: "top",
          align: "end",
        },
      },
      {
        element: ".edu-btn",
        popover: {
          title: "Education Button",
          description: "By clicking on this button, you would be redirected to the education portal of our website where you can learn more about Waste Management in an interactive manner.",
          side: "top",
          align: "start",
        },
      },
    ],
  });
  return (
    <>
      <div className="home-parent">
        <div className="tour-btn">
          <Button
          fontSize="0.9vmax"
            colorScheme="green"
            onClick={() => {
              driverObj.drive();
            }}
          >
            Page Tour
          </Button>
        </div>
        <div className="moto-div">
          <div className="moto">Turning Trash into Treasure</div>
          <div className="sub-moto">
            Revolutionizing Waste Management Together
          </div>
          <a className="society-register" onClick={regiNavigate}>
            Want to register your society? Click here
          </a>
          <Button
            width="11vmax"
            backgroundColor="#fefed4"
            color="green"
            border="3px green solid"
            onClick={eduNavigation}
            className="edu-btn"
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
