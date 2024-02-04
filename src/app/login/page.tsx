"use client";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import Style from "./login.module.css";
import axios from "axios";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";

const Login = () => {
  const navigate = useRouter();

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [password, setPassword] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const isLogin = storedUser? true : false
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
    interface UserDetails {
      email: string;
      password: string;
    }
    try {
      if (isEmailValid && isPasswordValid) {
        const user: UserDetails = {
          email: email,
          password: password,
        };
        // Send a POST request
        const response = await axios.post(
          "https://chat-app-auth.vercel.app/chatapp/user/auth/login",
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
          alert("Error Log-in");
          return;
        }

        localStorage.setItem("user", JSON.stringify(responseData));
        setEmail("");
        setPassword("");
        navigate.push("/");
      }

    } catch (error) {
      let err:any = error;
      if (err.response) {
        const status = err.response.status;
        if (status === 400) {
          alert("Invalid user ID or password. Please try again.");
        } else {
          alert("An error occurred. Please try again later.");
        }
      } else {
        console.error("Error logging in:", error);
        alert("An error occurred. Please try again later.");
      }
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
                        !isPasswordValid ? "Password must meet criteria." : ""
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
                    <Button
                      onClick={handleLogin}
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
                      Sign in
                    </Button>
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
