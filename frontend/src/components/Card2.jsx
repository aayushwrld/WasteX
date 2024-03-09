import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { VscCommentDiscussion } from "react-icons/vsc";
import { IoHeart } from "react-icons/io5";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import bell from "./../assets/bell.gif";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Card2({ data }) {
  const navigate = useNavigate();
  console.log("data", data);
  return (
    <Box
      border="green 3px solid"
      padding="2vmin"
      borderRadius="10px"
      backgroundColor="ivory"
    >
      <ToastContainer />
      <div className="card comp">
        <img src={bell} className="house-animation" />
        <div className="card-tagline" fontSize="2vmax">
          <img
            src={data.image}
            alt=""
            style={{ width: "17vmax", height: "10vmax", borderRadius: "10px" }}
          />
        </div>
        <div className="card-title">
          <Text textAlign="center" fontWeight="extrabold" fontSize="1.5vmax">
            {data.title.length > 25
              ? data.title.substr(0, 25) + "..."
              : data.title}
          </Text>
        </div>
      </div>
    </Box>
  );
}
