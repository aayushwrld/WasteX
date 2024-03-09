import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { VscCommentDiscussion } from "react-icons/vsc";
import { IoHeart } from "react-icons/io5";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import house from "./../assets/house.gif";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Card({ data }) {
  const navigate = useNavigate();
  let [like, setLike] = useState(false);
  console.log("data", data);
  const cardClick = () => {
    navigate(`/incentive/society/${data._id}`);
  };
  return (
    <Box
      border="green 3px solid"
      padding="2vmin"
      borderRadius="10px"
      onClick={cardClick}
      cursor={"pointer"}
      backgroundColor="ivory"
    >
      <ToastContainer />
      <div className="card">
        <img src={house} className="house-animation" />
        {/* <div className="card-img" onClick={cardClick}>
          <img src={data.image} alt="twitter bird caged" />
        </div> */}
        <div className="card-title">
          <Text textAlign="left" fontWeight="extrabold" fontSize="2.2vmax">
            {data.name}
          </Text>
        </div>
        <div className="card-tagline" fontSize="2vmax">
          {/* <Text as="b" fontSize="1.2vmax">
                      How to destroy a Social Media App..?
                    </Text> */}
          Residents:- {data.residents}
        </div>
        <div className="card-author">
          <Text as="i" fontSize="1.1vmax">
            ~{data.location}
          </Text>
        </div>
      </div>
    </Box>
  );
}
