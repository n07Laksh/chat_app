"use client";
import Style from "../login/login.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { alertWithTimeout } from "../app/features/userSelection/alertSlice";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import LoadingButtons from "../Components/LoadingBtn";

const Signup = () => {
  const navigate = useRouter();
  const dispatch = useDispatch<any>();

  const [userName, setUserName] = useState<string>("");
  const [userNameError, setUserNameError] = useState<boolean>(false);

  const [userEmail, setUserEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  const [userPassword, setUserPassword] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const isLogin = storedUser ? true : false;
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
    setLoading(true);
    interface UserDetails {
      name: string;
      email: string;
      password: string;
    }
    try {
      if (!navigator.onLine) {
        dispatch(
          alertWithTimeout({
            severity: "warning",
            variant: "filled",
            message:
              "You are currently offline. Please check your internet connection and try again.",
          })
        );
        setLoading(false);
        return;
      }

      if (
        userName.length > 0 &&
        isEmailValid &&
        userEmail.length > 0 &&
        isPasswordValid &&
        userPassword.length > 5
      ) {
        const user: UserDetails = {
          name: userName,
          email: userEmail,
          password: userPassword,
        };
        // Send a POST request
        const response = await axios.post(
          "https://chat-app-auth.vercel.app/chatapp/user/auth/signup",
          // "http://localhost:8000/chatapp/user/auth/signup",
          user,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const data = response.data;

        if (!data.error) {
          localStorage.setItem("user", JSON.stringify(data));
          navigate.push("/");
          dispatch(
            alertWithTimeout({
              severity: "success",
              variant: "filled",
              message: `${data.message}`,
            })
          );
          setLoading(false);
        }
      } else {
        dispatch(
          alertWithTimeout({
            severity: "warning",
            variant: "filled",
            message: "Please fill the all details correctly",
          })
        );
        if (userName.length <= 0) {
          setUserNameError(true);
        }
        setLoading(false);
      }
    } catch (error: any) {
      dispatch(
        alertWithTimeout({
          severity: "error",
          variant: "filled",
          message: `${
            error.response
              ? error.response.data.message
              : "Internal Server Error"
          }`,
        })
      );
      const timer = setTimeout(() => {
        setLoading(false);
        clearTimeout(timer);
      }, 3000);
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
                      error={!isEmailValid}
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
                      error={!isPasswordValid}
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
                    <LoadingButtons
                      clickEvent={handleSignup}
                      txt={"Sign up"}
                      loading={loading}
                      customStyle={{
                        width: "70%",
                        borderRadius: "20px",
                        "@media (max-width:750px)": {
                          width: "90%",
                        },
                        "&:hover": {
                          background: "rgb(50, 170, 180)",
                        },
                        background: "rgb(59, 194, 188)",
                        "&.Mui-disabled": {
                          color: "white",
                        },
                        color: "white",
                      }}
                    />
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
