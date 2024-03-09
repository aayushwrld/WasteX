import { Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";
import { BsHousesFill } from "react-icons/bs";
import {
  BarLoader,
  ClimbingBoxLoader,
  ClockLoader,
  MoonLoader,
  PacmanLoader,
  PuffLoader,
  PulseLoader,
  RiseLoader,
} from "react-spinners";
import Resident from "./Resident";

export default function CardDetail() {
  let loadersArray = [
    <BarLoader color="green" />,
    <ClimbingBoxLoader color="green" />,
    <ClockLoader color="green" />,
    <MoonLoader color="green" />,
    <PuffLoader color="green" />,
    <PacmanLoader color="green" />,
    <PulseLoader color="green" />,
    <RiseLoader color="green" />,
  ];

  

  let randomLoader = Math.floor(Math.random() * 8);
  const navigate = useNavigate();
  const username = getCookie("username");
  let { id } = useParams();
  const [societyData, setSocietyData] = useState({});
  const [residentsData, setResidentsData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`https://waste-x-gamma.vercel.app/society/details/${id}`)
        .then((res) => {
          console.log(res.data);
          setSocietyData(res.data.societyData);
          setResidentsData(res.data.residentsData); // Assuming users data is what you're getting for residents
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data === "Post not found..!") {
            toast.error("Post not found!");
          } else {
            toast.error("Server side error or wrong ID..!");
          }
        });
    }, 100);
  }, [id]); // Adding id as a dependency to re-fetch data when id changes

  console.log(societyData);
  console.log(residentsData);

  return (
    <div id="listings-parent">
      {residentsData.length == 0 ? (
        <div className="loading">{loadersArray[randomLoader]}</div>
      ) : (
        <div className="society-data">
          <div className="society-name flex">
            <BsHousesFill />
            {societyData.name}
            </div>
          <div className="society-users flex">
            {residentsData.map((resident, i) => (
              <Resident key={i} details={resident}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
