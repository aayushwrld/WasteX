import React, { useState } from "react";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { Button } from "@chakra-ui/react";
import data from "./data.json";
import { useNavigate } from "react-router-dom";
import Book from "../assets/BookClipart.png"
import Ques from "../assets/Question.png"

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


{/* <div className="bg-elements" style={{top:"20vh", left:"10vw", bottom:"30vh"}}>
        <img src={Book} alt="" id="back-img-1"/>
      </div>

      <div className="bg-elements" style={{top:"80vh", right:"30vw", left:"20vw", bottom:"30vh"}}>
        <img src={Ques} alt="" id="back-img-2"/>
      </div>


      <div className="bg-elements" style={{top:"15vh", right:"30vw", left:"20vw", bottom:"30vh"}}>
        <img src={Book} alt="" id="back-img-1"/>
      </div>

      <div className="bg-elements" style={{top:"15vh", right:"30vw", left:"20vw", bottom:"30vh"}}>
        <img src={Ques} alt="" id="back-img-2"/>
      </div>
      <div className="bg-elements" style={{top:"15vh", right:"30vw", left:"20vw", bottom:"30vh"}}>
        <img src={Book} alt="" id="back-img-1"/>
      </div>
      <div className="bg-elements" style={{top:"15vh", right:"30vw", left:"20vw", bottom:"30vh"}}>
        <img src={Ques} alt="" id="back-img-2"/>
      </div>
      <div className="bg-elements" style={{top:"15vh", right:"30vw", left:"20vw", bottom:"30vh"}}>
        <img src={Book} alt="" id="back-img-1"/>
      </div>
 */}




      <div className="edu-div flex">
        <div className="content">
          <div className="edu-video">
            <img src={data[count].gif} id="edu-img" />
          </div>
          <div className="edu-text">
            <div className="edu-text-1">
              Title
            </div>
            <div className="edu-text-2">
            {data[count].text}
            </div>
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
