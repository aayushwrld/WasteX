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
          image:
            "data:image/jpeg;base64,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",
          order_id: res.data.order.id,
          callback_url: "https://www.youtube.com/",
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
          <Button backgroundColor="#00a200" color="white" onClick={onOpen}>
            Donate Now!
          </Button>
        </div>
      </div>

      <ToastContainer />
      <Modal isOpen={isOpen} onClose={onClose}>
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
      </Modal>
      {/* <div className="form-parent">
        <ToastContainer />
        <form className="form" onSubmit={handleSubmit(FormSubmitHandler)}>
          <Text as="b" fontSize="2.3vmax">
            Donate Now!
          </Text>
          <Text as="i" fontSize="1vmax">
            Enter the amount you would like to donate!
          </Text>
          <FormControl>
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
          </FormControl>
          <Button type="submit" colorScheme="green">
            Submit
          </Button>
        </form>
      </div> */}
    </>
  );
}
