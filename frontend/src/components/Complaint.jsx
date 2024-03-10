import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineSyncProblem } from "react-icons/md";
import { color } from "framer-motion";

export default function Complaint() {
  const [comp, setComp] = useState({});
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [count, setCount] = useState(1);
  const [length, setLength] = useState(1);
  const [image, setImage] = useState("");
  const categories = ["Industrial", "Event", "Societal Waste", "Others"];
  useEffect(() => {
    axios
      .get("https://waste-x-gamma.vercel.app/cities/")
      .then((res) => {
        // console.log(res.data);
        setCities(res.data);
      })
      .catch();
  }, []);

  function handleButtonClick(value) {
    setComp({ category: value });
    nextDetail();
  }

  function nextDetail() {
    setCount(count + 1);
    setLength(count * 25);
  }
  function lastDetail() {
    setCount(count - 1);
    setLength((count - 2) * 25);
  }
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [submit1, setSubmit1] = useState(false);
  const [submit2, setSubmit2] = useState(false);
  const [submit3, setSubmit3] = useState(false);

  function handleSubmitForm1(data) {
    setSubmit1(true);
    setComp((prevData) => ({
      ...prevData,
      title: data.title,
      description: data.description,
    }));
  }
  function handleSubmitForm2(data) {
    setCity(data.city);
    setSubmit2(true);
    // console.log(data.address);
    setComp((prevData) => ({
      ...prevData,
      address: data.address,
    }));
  }

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  let base64;
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    base64 = await convertToBase64(file);
  };

  const imageFileUpload = async () => {
    setImage({ ...image, myFile: base64 });
    setComp((prevData) => ({
      ...prevData,
      image: base64,
    }));
    setSubmit3(true);

  };

  let finalSubmit = () => {
    setLength(100);
    let finalCity;
    cities.map((e, i) => {
      if (e.cityName === city) {
        finalCity = e;
      }
    });
    // console.log(finalCity.supportEmail)
    const id = toast.loading("Registering Complaint...");
    axios
      .post("https://waste-x-gamma.vercel.app/complaint/new", comp)
      .then(() => {
        toast.update(id, {
          render: "Complaint Registered!",
          type: "success",
          isLoading: false,
        });
        setTimeout(() => {
          navigate("/complaints");
          setTimeout(() => {
            window.location.href = `mailto:${finalCity.supportEmail}?subject=${comp.title}&body=${comp.description}`;
          }, 1500);
        }, 1500);
      })
      .catch((err) => {
        // console.log(err);
        toast.update(id, {
          render: "An Error Occured :(",
          type: "error",
          isLoading: false,
        });
      });
  };

  function complaint() {
    switch (count) {
      case 1:
        return (
          <div className="tag-line">
            <div className="complaint-box">
              <div>
                <div className="tag-heading">Lets register your complaint</div>
                <div className="tag-subHeading">Select the category.</div>
              </div>
              <div className="catrgory-div">
                <SimpleGrid columns={[1, 1, 1, 4]} spacing={10}>
                  {categories.map((category, index) => (
                    <Button
                      key={index}
                      className="category-btn"
                      fontSize={"1.5vmax"}
                      background="none"
                      border="3px green solid"
                      height="6vmax"
                      width="100%"
                      onClick={() => handleButtonClick(category)}
                    >
                      <MdOutlineSyncProblem />
                      &nbsp;
                      {category}
                    </Button>
                  ))}
                </SimpleGrid>
              </div>
            </div>
          </div>
        );
        break;
      case 2:
        return (
          <>
            <div className="tag-line">
              <div className="complaint-box">
                <div className="tag-heading">Let us know more details.</div>
                <div className="tag-subHeading">
                  It will help us work on it ASAP..
                </div>
                <div className="detail-form-parent">
                  <form
                    className="details-form flex"
                    onSubmit={handleSubmit(handleSubmitForm1)}
                  >
                    <FormControl>
                      <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                        Title
                      </FormLabel>
                      <Input
                        type="text"
                        borderColor="black"
                        backgroundColor="ivory"
                        {...register("title", {
                          required: "Title is required",
                          maxLength: { value: 40, message: "Max 40 Chars" },
                        })}
                      />
                      <p className="err">{errors.title?.message}</p>
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                        Description
                      </FormLabel>
                      <Textarea
                        type="text"
                        borderColor="black"
                        backgroundColor="ivory"
                        {...register("description", {
                          required: "Please provide the required description",
                        })}
                      />
                      <p className="err">{errors.description?.message}</p>
                    </FormControl>
                    <Button type="submit" colorScheme="green">
                      Submit
                    </Button>
                  </form>
                </div>
                <div className="next-button">
                  <div className="buttons">
                    <Button
                      onClick={lastDetail}
                      color="white"
                      backgroundColor="greenyellow"
                    >
                      Back
                    </Button>
                    {submit1 ? (
                      <Button colorScheme="red" onClick={nextDetail}>
                        Next
                      </Button>
                    ) : (
                      <Button isDisabled colorScheme="red" onClick={nextDetail}>
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
        break;
      case 3:
        return (
          <>
            <div className="tag-line">
              <ToastContainer />
              <div className="complaint-box">
                <div className="tag-heading">Enter Your Address</div>
                <div className="form-parent">
                  <form
                    className="form"
                    onSubmit={handleSubmit(handleSubmitForm2)}
                  >
                    <FormControl>
                      <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                        Address
                      </FormLabel>
                      <Input
                        type="text"
                        borderColor="black"
                        backgroundColor="ivory"
                        {...register("address", {
                          required: "Address is required",
                        })}
                      />
                      <p className="err">{errors.address?.message}</p>
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                        Cities
                      </FormLabel>
                      <Select
                        placeholder="Select option"
                        {...register("city", {
                          required: "City is required",
                        })}
                      >
                        {cities.map((e, i) => {
                          return (
                            <option key={i} value={e.cityName}>
                              {e.cityName}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <Button type="submit" colorScheme="green">
                      Submit
                    </Button>
                  </form>
                </div>
                <div className="next-button">
                  <div className="buttons">
                    <Button
                      onClick={lastDetail}
                      color="white"
                      backgroundColor="greenyellow"
                    >
                      Back
                    </Button>
                    {submit2 ? (
                      <Button colorScheme="red" onClick={nextDetail}>
                        Next
                      </Button>
                    ) : (
                      <Button isDisabled colorScheme="red" onClick={nextDetail}>
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
        break;
      case 4:
        return (
          <>
            <div className="tag-line">
              <ToastContainer />
              <div className="complaint-box">
                <div className="tag-heading">Upload the image!</div>
                <div className="tag-subHeading">
                  It will help us find the spot fast without disturbing you!
                </div>
                <div className="form-parentt">
                  <form className="form" onSubmit={handleSubmit}>
                    <input
                      type="file"
                      label="Image"
                      name="myFile"
                      id="file-upload"
                      accept=".jpeg, .png, .jpg"
                      onChange={(e) => handleFileUpload(e)}
                    />
                    <Button onClick={imageFileUpload}>Upload!</Button>
                  </form>
                </div>
                <div className="next-button">
                  <div className="buttons">
                    <Button onClick={lastDetail}>Back</Button>

                    {submit3 ? (
                      <Button colorScheme="red" onClick={finalSubmit}>
                        Submit
                      </Button>
                    ) : (
                      <Button isDisabled colorScheme="red" onClick={finalSubmit}>
                        Submit
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
        break;
    }
  }
  return (
    <div className="complaint-parent">
      <div className="progress-div">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${length}%` }}></div>
        </div>
      </div>
      {complaint()}
    </div>
  );
}
