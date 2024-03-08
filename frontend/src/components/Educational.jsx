import React, { useState } from "react";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { Button } from "@chakra-ui/react";
import data from "./data.json";
import { useNavigate } from "react-router-dom";

export default function Educational() {
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  function nextData() {
    if (count < data.length - 1) {
      setCount(count + 1);
    } else {
      setCount(0);
    }
    setClicked(false); // Reset clicked state
  }

  function prevData() {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setCount(data.length - 1);
    }
    setClicked(true); // Set clicked state to true
  }

  function handleBack() {
    navigate("/"); // Navigate to home page
  }

  return (
    <div className="edu-parent">
      <div className="edu-div flex">
        <div className="content">
          <div className="edu-text flex">{data[count].text}</div>
          <div className="edu-video">
            <img src={data[count].gif} id="edu-img" />
          </div>
        </div>
        <div className="nav-buttons">
          <FaArrowCircleLeft
            size="2.5vmax"
            onClick={prevData}
            style={{ color: clicked ? "darkgreen" : "green" }}
            id="arrow"
          />
          <FaArrowCircleRight
            size="2.5vmax"
            onClick={nextData}
            style={{ color: clicked ? "darkgreen" : "green" }}
            id="arrow"
          />
        </div>
        <Button
          colorScheme="green"
          onClick={handleBack}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
