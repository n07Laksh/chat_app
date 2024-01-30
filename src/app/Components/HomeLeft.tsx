import React, { useState } from "react";
import styles from "../page.module.css";
import UserProfile from "./UserProfile";
import Setting from "./Setting";
import { useDispatch } from "react-redux";
import { setUser } from "../app/features/userSelection/userSlice";
import Image from "next/image";
import user from "../Assets/pngwing.com (1).png";

const HomeLeft = () => {
  const dispatch = useDispatch();
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [settingOpen, setSettingOpen] = useState<boolean>(false);

  const handleRouteClick = (str: string): void => {
    if (str === "profile") {
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
  };

  const openChat = (userId: string): void => {
    dispatch(setUser(userId));
  };

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
                <Image style={{width:"80%", height:"auto"}} src={user} alt="." />
              </span>
              <span
              className={styles.more_setting}
                title="Setting"
                onClick={() => handleRouteClick("setting")}
              >&#8942;
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
                <li onClick={() => openChat("Fast X Service")}>Fast X Service</li>
              </ul>
            </section>
          </section>
        )}

        {profileOpen && (
          <section className={styles.prof_sett_open_sec}>
            <header className={styles.prof_sett_head} onClick={handleBack}>&larr;</header>
            <UserProfile />
          </section>
        )}
        {settingOpen && (
          <section className={styles.prof_sett_open_sec}>
            <header className={styles.prof_sett_head} onClick={handleBack}>&larr;</header>
            <Setting />
          </section>
        )}
      </div>
    </>
  );
};

export default HomeLeft;
