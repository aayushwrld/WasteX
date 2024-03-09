import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  SimpleGrid,
} from "@chakra-ui/react";
import donationImg from "./../assets/donation-img.png";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Select,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { setCookie } from "../utils/cookie";
import { AppContext } from "./Context";
import { loginCheck } from "../utils/loginCheck";

export default function Donation() {
  const navigate = useNavigate();
  const [society, setSociety] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { isOpen, onOpen, onClose } = useDisclosure();
  // console.log(watch())
  const { login, setLogin } = useContext(AppContext);
  const [key, setKey] = useState("");
  useEffect(() => {
    axios
      .get("https://waste-x-gamma.vercel.app/pay/getkey")
      .then((res) => {
        console.log(res);
        setKey(res.data.key);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const FormSubmitHandler = (formData) => {
    console.log(formData);
    axios
      .post("https://waste-x-gamma.vercel.app/pay/checkout", formData)
      .then((res) => {
        console.log(res.data.order);
        const options = {
          key,
          amount: formData.amount,
          currency: "INR",
          name: "Waste Management",
          description: "Donation",
          image: "",
          order_id: res.data.order.id,
          callback_url: "https://wastex-x.vercel.app/",
          prefill: {
            name: "",
            email: "",
            contact: "",
          },
          notes: {
            address: "razorapy official",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="donation-div">
        <div>
          <img src={donationImg} className="donationImg" />
        </div>
        <div className="donation-ref">
          <div className="donation-text">
            Why Not Contribute With a small Donation!!
          </div>
          <form className="donation-form" onSubmit={handleSubmit(FormSubmitHandler)}>
          <Input
            type="number"
            placeholder="Enter amount of your choice"
            borderColor="#D0D5FA"
            {...register("amount", {
              required: "Please enter amount",
            })}
          />
            <Button type="submit" backgroundColor="#00a200" color="white" onClick={onOpen}>
              Donate Now!
            </Button>
          </form>
        </div>
      </div>

      <ToastContainer />
      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          style={{
            border: "green 4px solid",
            borderRadius: "15px",
            margin: "15vmax 2vmax 0 2vmax ",
          }}
        >
          <ModalBody
            style={{
              backgroundColor: "#fefed4",
              borderRadius: "15px",
              padding: "3vmax",
            }}
          >
            <form
              className="form donation-form"
              onSubmit={handleSubmit(FormSubmitHandler)}
            >
              <Text as="b" fontSize="2.3vmax">
                Donate Now!
              </Text>
              <ModalCloseButton />
              <Text as="i" fontSize="1vmax">
                Enter the amount you would like to donate!
              </Text>
              <br />
              <SimpleGrid columns={3} spacing={10}>
                <Button backgroundColor="green" color="white">
                  100
                </Button>
                <Button backgroundColor="green" color="white">
                  500
                </Button>
                <Button backgroundColor="green" color="white">
                  1000
                </Button>
              </SimpleGrid>
              <br />
              <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                Amount
              </FormLabel>
              <Input
                type="number"
                borderColor="#D0D5FA"
                {...register("amount", {
                  required: "Please enter amount",
                })}
              />
              <p className="err">{errors.amount?.message}</p>
              <Button type="submit" colorScheme="green">
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal> */}
    </>
  );
}
