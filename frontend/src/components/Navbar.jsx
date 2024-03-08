import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { TbMoneybag } from "react-icons/tb";
import { BiSolidUserVoice } from "react-icons/bi";
import { MdOutlineAutoGraph } from "react-icons/md";
import { FaClipboardQuestion } from "react-icons/fa6";
import { RiTeamFill } from "react-icons/ri";
import { TbLogin2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "./Context";
import { deleteCookie } from "../utils/cookie";
import { loginCheck } from "../utils/loginCheck";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const { login, setLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const logout = ()=>{
    deleteCookie("username")
    deleteCookie("auth-token")
    setLogin(loginCheck())
    window.reload()
  }
  const loginBtn = () => {
    if (login) {
      return (
          <MenuItem onClick={logout} icon={<TbLogin2 />}>Logout</MenuItem>
      );
    }else{
      return(
        <Link to="/signup">
          <MenuItem icon={<TbLogin2 />}>Login / Signup</MenuItem>
        </Link>
      )
    }
  };

  const loginBtn2 = () => {
    if (login) {
      return (
        <MenuButton
        onClick={logout}
          as={Button}
          leftIcon={<TbLogin2 />}
          sx={{
            backgroundColor: "green",
            color: "white",
            ":hover": {
              backgroundColor: "green",
            },
            ":active": {
              backgroundColor: "green",
            },
          }}
        >
          Logout
        </MenuButton>
      );
    }else{
      return(
        <Link to="/signup">
                    <MenuButton
                      as={Button}
                      leftIcon={<TbLogin2 />}
                      sx={{
                        backgroundColor: "green",
                        color: "white",
                        ":hover": {
                          backgroundColor: "green",
                        },
                        ":active": {
                          backgroundColor: "green",
                        },
                      }}
                    >
                      Login / Signup
                    </MenuButton>
                  </Link>
      )
    }
  };


  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 800);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="nav-parent">
      <nav className="flex">
        <div className="nav-parent-2 flex">
          <div className="nav-logo">
            <Link to="/">
            <div className="title-nav">WasteX</div>
            </Link>
          </div>
          <div className="nav-options flex">
            {isMobile ? (
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon color="white" />}
                  variant="outline"
                  _hover={{ bg: "darkgreen" }}
                  _active={{ bg: "green" }}
                  sx={{ borderColor: "transparent" }} // Set border color to transparent
                />
                <MenuList>
                  <Link to="/complaint">
                    <MenuItem icon={<BiSolidUserVoice />}>
                      Raise a Voice
                    </MenuItem>
                  </Link>

                  <Link to="/donation">
                    <MenuItem icon={<TbMoneybag />}>Donations</MenuItem>
                  </Link>

                  <Link to="/incentive">
                    <MenuItem icon={<MdOutlineAutoGraph />}>
                      Incentives
                    </MenuItem>
                  </Link>

                  <Link to="/faq">
                    <MenuItem icon={<FaClipboardQuestion />}>
                      FAQ
                    </MenuItem>
                  </Link>

                  <Link to="/about">
                    <MenuItem icon={<RiTeamFill />}>About Us</MenuItem>
                  </Link>
                  {loginBtn()}
                </MenuList>
              </Menu>
            ) : (
              <>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    sx={{
                      backgroundColor: "green",
                      color: "white",
                      ":hover": {
                        backgroundColor: "darkgreen",
                      },
                      ":active": {
                        backgroundColor: "green",
                      },
                    }}
                  >
                    Services
                  </MenuButton>
                  
                  <MenuList>
                    <Link to="/complaint">
                      <MenuItem minH="40px">
                        <BiSolidUserVoice />
                        &nbsp;
                        <span>Raise a Voice</span>
                      </MenuItem>
                    </Link>

                    <Link to="/donation">
                      <MenuItem minH="40px">
                        <TbMoneybag />
                        &nbsp;
                        <span>Donations</span>
                      </MenuItem>
                    </Link>

                    <Link to="/incentive">
                      <MenuItem minH="40px">
                        <MdOutlineAutoGraph />
                        &nbsp;
                        <span>Incentives</span>
                      </MenuItem>
                    </Link>

                    <Link to="/complaints">
                      <MenuItem minH="40px">
                        <BiSolidUserVoice />
                        &nbsp;
                        <span>Existing Complaints</span>
                      </MenuItem>
                      </Link>
                  </MenuList>
                </Menu>

                <Menu>
                  <Link to="/about">
                    <MenuButton
                      as={Button}
                      leftIcon={<RiTeamFill />}
                      sx={{
                        backgroundColor: "green",
                        color: "white",
                        ":hover": {
                          backgroundColor: "darkgreen",
                        },
                        ":active": {
                          backgroundColor: "green",
                        },
                      }}
                    >
                      About Us
                    </MenuButton>
                  </Link>
                </Menu>

                <Menu>
                  <Link to="/faq">
                    <MenuButton
                      as={Button}
                      leftIcon={<FaClipboardQuestion />}
                      sx={{
                        backgroundColor: "green",
                        color: "white",
                        ":hover": {
                          backgroundColor: "darkgreen",
                        },
                        ":active": {
                          backgroundColor: "green",
                        },
                      }}
                    >
                      FAQ
                    </MenuButton>
                  </Link>
                </Menu>

                <Menu>
                  {loginBtn2()}
                </Menu>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
