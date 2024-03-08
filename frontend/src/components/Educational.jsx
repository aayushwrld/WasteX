import React, { useState } from "react";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import data from "./data.json";
import Book from "../assets/BookClipart.png";
import Ques from "../assets/Question.png";

export default function Educational() {
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  function nextData() {
    if (count < data.length - 1) {
      setCount(count + 1);
    } else {
      setCount(0); // Reset count to loop back to the first entity
    }
    setClicked(false); // Reset clicked state
  }

  function prevData() {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setCount(data.length - 1); // Set count to the last entity when reaching the beginning
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
          <div className="edu-text">
            <div className="edu-text-1">{data[count].title}</div>
            <div className="edu-text-2">{data[count].text}</div>
          </div>
          <div className="edu-video">
            <img src={data[count].gif} id="edu-img" alt="Educational content" />
          </div>
        </div><br />
        <div className="content-2">
          <div className="edu-video">
            {/* Display the next entity in data.json */}
            <img src={data[(count + 1) % data.length].gif} id="edu-img" alt="Educational content" />
          </div>
          <div className="edu-text">
            <div className="edu-text-1">{data[(count + 1) % data.length].title}</div>
            <div className="edu-text-2">{data[(count + 1) % data.length].text}</div>
          </div>
        </div>

        <div className="nav-buttons">
          <FaArrowCircleLeft
            size="2.8vmax"
            onClick={prevData}
            style={{ color: clicked ? "darkgreen" : "green" }}
            id="arrow"
          />
          <FaArrowCircleRight
            size="2.8vmax"
            onClick={nextData}
            style={{ color: clicked ? "darkgreen" : "green" }}
            id="arrow"
          />
        </div>
      </div>
    </div>
  );
}
