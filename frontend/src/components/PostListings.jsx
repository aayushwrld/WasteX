// PostListings.js
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Post from "./Post";

function PostListings() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // State to hold selected post
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://waste-x-gamma.vercel.app/posts`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast.error("Error occurred!");
        }
        console.log(err);
      });
  }, []);

  const handlePostClick = (postData) => {
    setSelectedPost(postData); // Set selected post when clicked
    onOpen(); // Open the modal
  };

  return (
    <div className="complaints-parent flex">
      <Text
        textAlign="center"
        fontWeight="extrabold"
        fontSize="2vmax"
        id="complaints-header"
      >
        User blog
      </Text>
      {data.length === 0 ? (
        <div className="loading">{/* Your loader component */}</div>
      ) : (
        <div
          style={{
            display: "flex",
            flex: "1",
            flexDirection: "column",
            gap: "3vmin",
            alignItems: "center",
          }}
        >
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={10}>
            {data.map((post, index) => (
              <Post
                key={index}
                data={post}
                onClick={() => handlePostClick(post)} // Pass the post data to the handler
              />
            ))}
          </SimpleGrid>
        </div>
      )}
      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          style={{
            backgroundColor: "#fefed4",
            border: "green 3px solid",
            borderRadius: "15px",
            margin: "15vmax 2vmax 0 2vmax",
          }}
        >
          <ModalHeader> {selectedPost && selectedPost.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            style={{
              borderRadius: "15px",
              padding: "3vmax",
            }}
          >
            <div><img src={selectedPost && selectedPost.image} /></div>
            <div>{selectedPost && selectedPost.description}</div>
          </ModalBody>
        </ModalContent>
      </Modal> */}
      <ToastContainer />
      <Button onClick={() => navigate("/newpost")}>+</Button>
    </div>
  );
}

export default PostListings;
