// 'use client'

import React, { useState, useEffect } from "react";
import styles from "../page.module.css";
import UserProfile from "./UserProfile";
import Setting from "./Setting";
import { useDispatch } from "react-redux";
import {
  setChatOpenerUser,
  setProfileImg,
} from "../app/features/userSelection/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

import Image from "next/image";
import userImg from "../Assets/pngwing.com (1).png";

import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

const options = ["Profile", "Setting"];

const ITEM_HEIGHT = 48;

const HomeLeft = () => {
  const storeUser = useSelector((state: RootState) => state.users.user);
  const profileImage = useSelector(
    (state: RootState) => state.users.profile_img
  );
  const dispatch = useDispatch();
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [settingOpen, setSettingOpen] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRouteClick = (str: string): void => {
    const url = str.toLowerCase();
    if (url === "profile") {
      setProfileOpen(true);
      setSettingOpen(false);
      return;
    } else {
      setSettingOpen(true);
      setProfileOpen(false);
      return;
    }
  };
  const handleBack = () => {
    setProfileOpen(false);
    setSettingOpen(false);
    handleClose();
  };

  const openChat = (userId: string): void => {
    dispatch(setChatOpenerUser(userId));
  };

  const fetchProfileImg = async () => {
    try {
      const url =
        "https://chat-app-profile-laxmilals-projects.vercel.app/chatapp/user/profileimg/fetchprofileimg";
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!data.error) {
        dispatch(setProfileImg(data.img));
        localStorage.setItem("profile_img", data.img);
        return;
      }
      throw new Error("Failed to fetch profile image");
    } catch (error: any) {
      console.log("Error fetching profile image:", error.message);
    }
  };

  useEffect(() => {
    if (!profileImage && storeUser) fetchProfileImg();
  }, [storeUser]);

  return (
    <>
      <div>
        {!profileOpen && !settingOpen && (
          <section>
            <header className={styles.prop_header}>
              <span
                className={styles.user_profile}
                title="Profile"
                onClick={() => handleRouteClick("profile")}
              >
                <Image
                  style={{ width: "100%", height: "auto" }}
                  src={profileImage ? profileImage : userImg}
                  width={100}
                  height={100}
                  alt="."
                />
              </span>
              <span className={styles.more_setting}>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVert sx={{ color: "var(--foreground)" }} />
                </IconButton>
                <Menu
                  sx={{
                    "& > div:nth-of-type(3)": {
                      background: "var(--background)",
                      color: "var(--foreground)",
                      border: "1px solid var(--border)",
                    },
                  }}
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  {options.map((option) => (
                    <MenuItem
                      key={option}
                      onClick={() => handleRouteClick(option)}
                      sx={{
                        transition: "0.3s ease",
                        ":hover": { background: "var(--hoverColor)" },
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </span>
            </header>

            <section className={styles.msg_user}>
              <ul className={styles.user_ul}>
                <li onClick={() => openChat("John Doe")}>John Doe</li>
                <li onClick={() => openChat("Mark Rufflo")}>Mark Rufflo</li>
                <li onClick={() => openChat("Jack Ryan")}>Jack Ryan</li>
                <li onClick={() => openChat("Reacher Jack")}>Reacher Jack</li>
                <li onClick={() => openChat("Liftigine")}>Liftigine</li>
                <li onClick={() => openChat("Cory Anders")}>Cory Anders</li>
                <li onClick={() => openChat("Chris Pratt")}>Chris Pratt</li>
                <li onClick={() => openChat("Joe Seldana")}>Joe Seldana</li>
                <li onClick={() => openChat("Emily Brunt")}>Emily Brunt</li>
                <li onClick={() => openChat("Fast X Service")}>
                  Fast X Service
                </li>
              </ul>
            </section>
          </section>
        )}

        {profileOpen && (
          <section>
            <header className={styles.prof_sett_head}>
              <span onClick={handleBack}>&larr;</span>
            </header>
            <UserProfile fetchProfileImg={fetchProfileImg} />
          </section>
        )}
        {settingOpen && (
          <section>
            <header className={styles.prof_sett_head}>
              <span onClick={handleBack}>&larr;</span>
            </header>
            <Setting handleRouteClick={handleRouteClick} />
          </section>
        )}
      </div>
    </>
  );
};

export default HomeLeft;
