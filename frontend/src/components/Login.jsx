import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormControl, FormLabel, Input, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { setCookie } from "../utils/cookie";
import { AppContext } from "./Context";
import { loginCheck } from "../utils/loginCheck";
import SignIn from "../assets/SignIn.png"

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  // console.log(watch())
  const { login, setLogin } = useContext(AppContext);
  const FormSubmitHandler = (formData) => {
    // console.log(formData);
    const id = toast.loading("Logging In...");
    setTimeout(() => {
      axios
        .post("https://waste-x-gamma.vercel.app/user/login", formData)
        .then((result) => {
          // console.log("ADDED");
          setCookie("username", formData.username, 365);
          setCookie("auth-token", result.data, 365);
          setLogin(loginCheck());
          toast.update(id, {
            render: "Logged In!",
            type: "success",
            isLoading: false,
          });
          setTimeout(() => {
            navigate("/");
          }, 1200);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 404) {
            toast.update(id, {
              render: "Username not found",
              type: "error",
              isLoading: false,
            });
          } else if (err.response.status == 401) {
            toast.update(id, {
              render: "Incorrect Password",
              type: "error",
              isLoading: false,
            });
          } else {
            toast.update(id, {
              render: "Server Error. Contact admin",
              type: "error",
              isLoading: false,
            });
          }
        });
    }, 1000);
  };

  return (
    <div className="form-parent flex">
      <ToastContainer />

      <br />
      <div className="form-img-parent flex">

      <form className="form" onSubmit={handleSubmit(FormSubmitHandler)}>
        <Text as="b" fontSize="2.3vmax">
          Welcome Back..!
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
            />
          <p className="err">{errors.username?.message}</p>
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
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
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
      
    <div className="form-parent-2">
      <img src={SignIn} alt="" id="sign-in-img"/>
    </div>
    
            </div>
            <Link
        to="/signup"
        style={{
          fontSize: "2vmin",
          color: "green",
          textDecoration: "underline",
          textAlign: "center",
          paddingTop: "4vmax"
        }}
      >
        Not a member? Signup here...
      </Link>
    </div>
  );
}
