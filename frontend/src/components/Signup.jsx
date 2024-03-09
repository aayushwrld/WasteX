import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Select,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { setCookie } from "../utils/cookie";
import { AppContext } from "./Context";
import { loginCheck } from "../utils/loginCheck";
import SignIn from "../assets/SignIn.png";

export default function Signup() {
  const [submit1, setSubmit1] = useState(false);
  const [submit2, setSubmit2] = useState(false);
  const [count, setCount] = useState(1);
  const [signupData, setSignupData] = useState({});
  const navigate = useNavigate();
  const [society, setSociety] = useState([]);
  function nextDetail() {
    setCount(count + 1);
  }
  function lastDetail() {
    setCount(count - 1);
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    axios.get("https://waste-x-gamma.vercel.app/society").then((res) => {
      // console.log(res.data)
      setSociety(res.data);
    });
  }, []);
  const FormSubmitHandler1 = (formData) => {
    setSubmit1(true);
    console.log(formData);
    setSignupData((prev) => ({
      ...prev,
      name: formData.name,
      password: formData.password,
      username: formData.username,
    }));
  };
  const FormSubmitHandler2 = (formData) => {
    console.log(formData);
    setSubmit2(true);
    setSignupData((prev) => ({
      ...prev,
      name: formData.name,
      password: formData.password,
      username: formData.username,
    }));
  };

  // console.log(watch())
  const { login, setLogin } = useContext(AppContext);
  const finalSubmit = () => {
    const id = toast.loading("Signing Up...");
    setTimeout(() => {
      axios
        .post("https://waste-x-gamma.vercel.app/user/signup", signupData)
        .then((result) => {
          // console.log(result.data);
          setCookie("username", signupData.username, 365);
          setCookie("auth-token", result.data, 365);
          setLogin(loginCheck());
          toast.update(id, {
            render: "Signed Up",
            type: "success",
            isLoading: false,
          });

          setTimeout(() => {
            navigate("/");
          }, 1200);
        })
        .catch((err) => {
          console.log(err);
          toast.update(id, {
            render: "Username exists",
            type: "error",
            isLoading: false,
          });
          setTimeout(() => {
            navigate("/signup");
          }, 1200);
        });
    }, 1000);
  };
  const pageRender = () => {
    switch (count) {
      case 1:
        return (

          <div className="form-parent" style={{flex:"1"}}>
            <ToastContainer />
            {/* <br /> */}
            <div className="form-img-parent flex">
              <div className="form-1">
                <form
                  className="form1"
                  onSubmit={handleSubmit(FormSubmitHandler1)}
                >
                  <Text as="b" fontSize="2.3vmax">
                    Sign Up
                  </Text>
                  <Text as="i" fontSize="1vmax">
                    Enter the following details!
                  </Text>
                  <FormControl>
                    <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                      Username
                    </FormLabel>
                    <Input
                      type="text"
                      border="2px solid green"
                      backgroundColor="ivory"
                      {...register("username", {
                        required: "Username is required",
                      })}
                      value={signupData.username || ""} // Set value from state
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          username: e.target.value,
                        })
                      } // Update state on change
                    />
                    <p className="err">{errors.username?.message}</p>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                      Name
                    </FormLabel>
                    <Input
                      type="text"
                      border="2px solid green"
                      backgroundColor="ivory"
                      {...register("name", {
                        required: "name is required",
                      })}
                    />
                    <p className="err">{errors.name?.message}</p>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                      Password
                    </FormLabel>
                    <Input
                      type="password"
                      border="2px solid green"
                      backgroundColor="ivory"
                      {...register("password", {
                        required: "Password Required",
                        minLength: {
                          value: 8,
                          message: "Minimum 8 characters required",
                        },
                        pattern: {
                          value:
                            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                          message:
                            "Password Not Valid (Use Special Characters & Numbers)",
                        },
                      })}
                    />
                    <p className="err">{errors.password?.message}</p>
                  </FormControl>

                  <Button type="submit" colorScheme="green">
                    Submit
                  </Button>
                </form>
                <div className="buttons">
                  {submit1 ? (
                    <Button colorScheme="red" onClick={nextDetail}>
                      Next →
                    </Button>
                  ) : (
                    <Button isDisabled colorScheme="red" onClick={nextDetail}>
                      Next →
                    </Button>
                  )}
                </div>
              </div>

              <div className="form-parent-2">
                <img src={SignIn} alt="" id="sign-in-img" />
              </div>
            </div>
            <Link
              to="/login"
              style={{
                fontSize: "2vmin",
                color: "green",
                textDecoration: "underline",
                textAlign: "center",
                paddingTop: "1vmax",
              }}
            >
              Already a user?Login here...
            </Link>
          </div>
        );
      case 2:
        return (
          <div className="form-parent">
            <ToastContainer />
            <Link
              to="/login"
              style={{
                fontSize: "2vmin",
                color: "green",
                textDecoration: "underline",
                textAlign: "center",
              }}
            >
              Already a user?Login here...
            </Link>
            <br />
            <form className="form1" onSubmit={handleSubmit(FormSubmitHandler2)}>
              <Text as="b" fontSize="2.3vmax">
                Complete Your Profile
              </Text>
              <Text as="i" fontSize="1vmax">
                Enter your address and select your society!
              </Text>
              <FormControl>
                <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                  Address
                </FormLabel>
                <Input
                  type="text"
                  border="2px solid green"
                  {...register("address", {
                    required: "Address is required",
                  })}
                  value={signupData.address || ""}
                  onChange={(e) =>
                    setSignupData({ ...signupData, address: e.target.value })
                  }
                />
                <p className="err">{errors.address?.message}</p>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                  Society
                </FormLabel>
                <Select
                  placeholder="Select option"
                  border="2px solid green"
                  {...register("society", {
                    required: "Society is required",
                  })}
                  value={signupData.society || ""}
                  onChange={(e) =>
                    setSignupData({ ...signupData, society: e.target.value })
                  }
                >
                  {society.map((e, i) => {
                    return (
                      <option key={i} value={e.name}>
                        {e.name}
                      </option>
                    );
                  })}
                </Select>
                <p className="err">{errors.society?.message}</p>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                  Phone no.
                </FormLabel>
                <Input
                  type="number"
                  border="2px solid green"
                  {...register("contact.phone", {
                    required: "Phone no is required",
                    minLength: {
                      value: 10,
                      message: "Minimum 10 digits required",
                    },
                    maxLength: {
                      value: 10,
                      message: "Maximum 10 digits required",
                    },
                  })}
                  value={signupData.contact?.phone || ""}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      contact: { ...signupData.contact, phone: e.target.value },
                    })
                  }
                />
                <p className="err">{errors.contact?.phone?.message}</p>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                  Email
                </FormLabel>
                <Input
                  type="email"
                  border="2px solid green"
                  {...register("contact.email", {
                    required: "Email is required",
                  })}
                  value={signupData.contact?.email || ""}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      contact: { ...signupData.contact, email: e.target.value },
                    })
                  }
                />
                <p className="err">{errors.contact?.email?.message}</p>
              </FormControl>

              <Button type="submit" colorScheme="green">
                Submit
              </Button>
            </form>
            <div className="buttons">
              <Button
                onClick={lastDetail}
                color="white"
                backgroundColor="greenyellow"
              >
                Back
              </Button>

              {submit2 ? (
                <Button colorScheme="red" onClick={finalSubmit}>
                  Finish
                </Button>
              ) : (
                <Button isDisabled colorScheme="red" onClick={finalSubmit}>
                  Finish
                </Button>
              )}
            </div>
          </div>
        );
    }
  };

  return (<>{pageRender()}</>)
}
