import React, { useEffect } from "react";
import HomeLeft from "./HomeLeft";
import HomeRight from "./HomeRight";

import styles from "../page.module.css";

import { useDispatch } from "react-redux";
import { setProfileImg } from "../app/features/userSelection/userSlice";

export default function MainHome() {
  const dispatch = useDispatch();
  useEffect(() => {
    const profileImg = localStorage.getItem("profile_img");
    dispatch(setProfileImg(profileImg));
  }, []);

  useEffect(() => {
    // var expirationDate = new Date();
    // expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    // var expires = "expires=" + expirationDate.toUTCString();

    // document.cookie = `sessionToken=Laksh_nishad-saraipali; ${expires}; path=/;`;
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("othervalue="))
      ?.split("=")[1];

    console.log("session token", token);
  }, []);

  return (
    <>
      <div className={styles.home_main}>
        <HomeLeft />
        <HomeRight />
      </div>
    </>
  );
}
