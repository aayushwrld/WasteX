import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card2 from "./Card2";
import { SimpleGrid, Text } from "@chakra-ui/react";
import { BarLoader, ClimbingBoxLoader, ClockLoader, MoonLoader, PacmanLoader, PuffLoader, PulseLoader, RiseLoader } from "react-spinners";

function Complaints() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
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
  useEffect(() => {
    axios
      .get(`https://waste-x-gamma.vercel.app/complaint`)
      .then((res) => {
        setData(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        if (err.response.status == 404) {
          toast.error(
            "Error occured!"
          );
        }
        console.log(err)
      });
  }, []);
  return (
    
    <div className="complaints-parent flex">
    <Text textAlign="center" fontWeight="extrabold" fontSize="2vmax" id="complaints-header">
    Complaints</Text>
      {data.length == 0 ? (
        <div className="loading">{loadersArray[randomLoader]}</div>
        ) : (
          <div
          style={{
            display: "flex",
            flex:"1",
            flexDirection: "column",
            gap: "3vmin",
            alignItems: "center",
          }}
          >
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={10}>
            {data.map((e, i) => {
              return <Card2 data={data[i]} key={i}  />;
            })}
          </SimpleGrid>
        </div>
      )}
<ToastContainer/>
    </div>
  )
  
}

export default Complaints;
