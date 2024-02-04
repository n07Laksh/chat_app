"use client";
import Style from "../login/login.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";

const Signup = () => {
  const navigate = useRouter();
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passError, setPassError] = useState<boolean>(false);

  const [userName, setUserName] = useState<string>("");

  const [userEmail, setUserEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  const [userPassword, setUserPassword] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const isLogin = storedUser? true : false
    if (isLogin) {
      navigate.push("/");
    }
  }, [navigate]);

  const handleBrandName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
    if (event.target.value) {
      setUserNameError(false);
    }
  };

  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setUserPassword(newPassword);
    validatePassword(newPassword);
  };

  const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid: boolean = emailRegex.test(userEmail);
    setIsEmailValid(isValid);
  };

  const validatePassword = (newPassword: string) => {
    // Password must have at least 1 uppercase letter, 1 special character, and 1 lowercase letter
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{6,}$/;
    const isValid: boolean = passwordRegex.test(newPassword);
    setIsPasswordValid(isValid);
  };

  const handleSignup = async () => {
    interface UserDetails {
      name: string;
      email: string;
      password: string;
    }
    try {
      if (userName.length > 0 && isEmailValid && isPasswordValid) {
        const user: UserDetails = {
          name: userName,
          email: userEmail,
          password: userPassword,
        };
        // Send a POST request
        const response = await axios.post(
          "https://chat-app-auth.vercel.app/chatapp/user/auth/signup",
          user,
          {
            headers: {
              "Content-Type": "application/json",
              token: "auth token",
            },
          }
        );

        const responseData = response.data;

        if (responseData.err) {
          alert("Error signing up");
          return;
        }

        localStorage.setItem("user", JSON.stringify(responseData));
        setUserName("");
        setUserEmail("");
        setUserPassword("");
        navigate.push("/");
      } else {
        if (userName.length <= 0) {
          setUserNameError(true);
        }
        if (userEmail.length <= 0) {
          setEmailError(true);
        }
        if (userPassword.length <= 0) {
          setPassError(true);
        }
      }
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle error appropriately
      alert("Error signing up. Please try again later.");
    }
  };

  return (
    <>
      <div className={Style.user_type_contaner}>
        <div className={Style.user_type_container_child}>
          <div className={Style.log_type_item_parent}>
            <div className={`${Style.div1} ${Style.left_box}`}>
              <div className={Style.width_100}></div>
              <div className={Style.welcome_txt}>WELCOME</div>
            </div>
            <div className={`${Style.div1}`}>
              <div style={{ marginTop: "32px", textAlign: "center" }}>
                <div className={Style.form_head_etxt}>
                  <h3>Chat App</h3>
                </div>
                <div className={Style.wlc_txt}>
                  <h5>Sign up to Chat App</h5>
                </div>
                <div style={{ marginTop: "24px", textAlign: "center" }}>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "30ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      error={userNameError}
                      helperText={userNameError ? "Enter User Name." : ""}
                      id="standard-search"
                      label="User Name*"
                      type="search"
                      variant="standard"
                      value={userName}
                      onChange={handleBrandName}
                      InputProps={{
                        style: { color: "rgb(59, 194, 188)" },
                      }}
                      InputLabelProps={{
                        style: { color: "rgb(59, 194, 188)" },
                      }}
                    />
                    <Stack
                      spacing={1}
                      sx={{
                        width: "",
                        textAlign: "center",
                        margin: "0 auto !important",
                      }}
                    ></Stack>
                    <TextField
                      error={!isEmailValid || emailError}
                      helperText={!isEmailValid ? "Incorrect Email." : ""}
                      id="standard-search"
                      label="Email*"
                      type="search"
                      variant="standard"
                      value={userEmail}
                      onChange={emailChange}
                      onBlur={validateEmail}
                      InputProps={{
                        style: { color: "rgb(59, 194, 188)" },
                      }}
                      InputLabelProps={{
                        style: { color: "rgb(59, 194, 188)" },
                      }}
                    />
                    <TextField
                      error={!isPasswordValid || passError}
                      helperText={
                        !isPasswordValid
                          ? "Combine of (Uppercase, lowercase, symbole, number)"
                          : ""
                      }
                      id="standard-password"
                      label="Password*"
                      type="password"
                      variant="standard"
                      value={userPassword}
                      onChange={passwordChange}
                      InputProps={{
                        style: { color: "rgb(59, 194, 188)" },
                      }}
                      InputLabelProps={{
                        style: { color: "rgb(59, 194, 188)" },
                      }}
                    />
                  </Box>
                  <div style={{ marginTop: "24px" }}>
                    <Button
                      onClick={handleSignup}
                      sx={{
                        width: "70%",
                        borderRadius: "20px",
                        "@media (max-width:750px)": {
                          width: "90%",
                        },
                        "&:hover": {
                          background: "rgb(50, 170, 180)",
                        },
                        background: "rgb(59, 194, 188)",
                      }}
                      variant="contained"
                    >
                      Sign up
                    </Button>
                  </div>
                </div>
                <div className={Style.have_acc}>
                  <div className={Style.signup_here}>
                    <Link href="/login" style={{ color: "rgb(59, 194, 188)" }}>
                      <p
                        className={Style.fg_pass_p}
                        style={{ fontSize: "13px" }}
                      >
                        Already have an account? Sign in here!
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
