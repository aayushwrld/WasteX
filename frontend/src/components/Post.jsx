import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { VscCommentDiscussion } from "react-icons/vsc";
import { IoHeart } from "react-icons/io5";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Post({ data, onClick }) {
  const navigate = useNavigate();
  console.log("data", data);

  const handlePostClick = () => {
    onClick(data);
  };

  return (
    <Box
      border="green 3px solid"
      padding="2vmin 0"
      borderRadius="10px"
      onClick={handlePostClick} // Call handlePostClick when the post is clicked
      cursor="pointer" // Add cursor pointer to indicate it's clickable
    >
      <ToastContainer />
      <div className="card">
        <div className="card-tagline" fontSize="2vmax">
          <img
            src={data.image}
            alt=""
            style={{ width: "15vmax", height: "10vmax", borderRadius:"10px" }}
          />
        </div>
        <div className="card-title">
          <Text textAlign="center" fontWeight="extrabold" fontSize="1.5vmax">
            {data.title}
          </Text>
        </div>
        {/* <div>
          <Text>{data.description}</Text>
        </div> */}
      </div>
    </Box>
  );
}
