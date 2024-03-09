import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
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
import Card from "./Card";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import { AppContext } from "./Context";
import { getCookie } from "../utils/cookie";

export default function Listings() {
  let [posts, setPosts] = useState([]);
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

  const username = getCookie("username");
  const { login, setLogin } = useContext(AppContext);
  // console.log(username)
  useEffect(() => {
    setTimeout(() => {
      axios
        .get("https://waste-x-gamma.vercel.app/society")
        .then((data) => {
          console.log(data.data);
          setPosts(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  }, []);
  return (
    <div id="listings-parent">
      {posts.length == 0 ? (
        <div className="loading">{loadersArray[randomLoader]}</div>
      ) : (
        <div
          style={{
            display: "flex",
            flex:"1",
            flexDirection: "column",
            gap: "7vmin",
            alignItems: "center",
          }}
        >
          <div className="username">Hello, {login ? username : "Guest"}!</div>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={10}>
            {posts.map((e, i) => {
              return <Card data={posts[i]} key={i}  />;
            })}
          </SimpleGrid>
        </div>
      )}
    </div>
  );
}
