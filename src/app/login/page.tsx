"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { alertWithTimeout } from "../app/features/userSelection/alertSlice";

import React, { useEffect, useState } from "react";
import Style from "./login.module.css";
import axios from "axios";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import LoadingButtons from "../Components/LoadingBtn";

const Login = () => {
  const navigate = useRouter();
  const dispatch = useDispatch<any>();

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [password, setPassword] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const isLogin = storedUser ? true : false;
    if (isLogin) {
      navigate.push("/");
    }
  }, [navigate]);

  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword: string = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);
  };

  const validatePassword = (newPassword: string) => {
    // Password must have at least 1 uppercase letter, 1 special character, and 1 lowercase letter
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{6,}$/;
    const isValid = passwordRegex.test(newPassword);
    setIsPasswordValid(isValid);
  };

  const handleLogin = async () => {
    setLoading(true);
    interface UserDetails {
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
        isEmailValid &&
        email.length > 0 &&
        isPasswordValid &&
        password.length > 5
      ) {
        const user: UserDetails = {
          email: email,
          password: password,
        };
        // Send a POST request
        const response = await axios.post(
          "https://chatappauth.vercel.app/chatapp/user/auth/login",
          // "http://localhost:8000/chatapp/user/auth/login",
          user,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const data = response.data;
        console.log("data", data);

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
        setLoading(false);
        setIsEmailValid(false);
        setIsPasswordValid(false);
      }
    } catch (error: any) {
      console.log(error);
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
                  <h5>Sign in to Chat App</h5>
                </div>
                <div style={{ marginTop: "32px", textAlign: "center" }}>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "30ch" },
                      color: "rgb(59, 194, 188)",
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      error={!isEmailValid}
                      helperText={!isEmailValid ? "Incorrect Email." : ""}
                      id="standard-search"
                      label="Email*"
                      type="search"
                      variant="standard"
                      value={email}
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
                          ? "Use this combination (uppercase, lowercase, symbols, numbers)"
                          : ""
                      }
                      id="standard-password"
                      label="Password*"
                      type="password"
                      variant="standard"
                      value={password}
                      onChange={passwordChange}
                      InputProps={{
                        style: { color: "rgb(59, 194, 188)" },
                      }}
                      InputLabelProps={{
                        style: { color: "rgb(59, 194, 188)" },
                      }}
                    />
                  </Box>
                  <div className={Style.fg_pass}>
                    <Link href="#" style={{ color: "rgb(59, 194, 188)" }}>
                      <p
                        className={Style.fg_pass_p}
                        style={{ fontSize: "13px" }}
                      >
                        Forgot password
                      </p>
                    </Link>
                  </div>
                  <div style={{ marginTop: "40px" }}>
                    <LoadingButtons
                      clickEvent={handleLogin}
                      txt={"Sign in"}
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
                    <Link href="/signup" style={{ color: "rgb(59, 194, 188)" }}>
                      <p
                        className={Style.fg_pass_p}
                        style={{ fontSize: "13px" }}
                      >
                        {`Don't have an account? Signup here!`}
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

export default Login;
