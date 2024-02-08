import React, { useState } from "react";
import Image from "next/image";

import img from "../Assets/pngwing.com.png";
import styles from "../page.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const HomeRight = () => {
  const user = useSelector((state: RootState) => state.users);

  const [opneDetail, setOpneDetail] = useState<boolean>(false);

  return (
    <>
      {!user.user ? (
        <div>
          <section className={styles.home_right_img_section}>
            <Image
              style={{ width: "40%", height: "auto" }}
              src={img}
              alt="Chat Image"
            />
          </section>
        </div>
      ) : (
        <div className={styles.chat_box}>
          <section style={{width:"100%"}}>
            <header className={styles.current_chat_user_header}>
              <h4 onClick={()=>setOpneDetail(true)} style={{cursor:"pointer"}}>{user.user}</h4>
            </header>

            <main className={styles.chat_box_main}>
              <p style={{padding:"30px 0"}}>Welcome to ChatApp, {user.user}!</p>
              <p style={{padding:"30px 0"}}>Welcome to ChatApp, {user.user}!</p>
              <p style={{padding:"30px 0"}}>Welcome to ChatApp, {user.user}!</p>
              <p style={{padding:"30px 0"}}>Welcome to ChatApp, {user.user}!</p>
              <p style={{padding:"30px 0"}}>Welcome to ChatApp, {user.user}!</p>
              <p style={{padding:"30px 0"}}>Welcome to ChatApp, {user.user}!</p>
              <p style={{padding:"30px 0"}}>Welcome to ChatApp, {user.user}!</p>
              <p style={{padding:"30px 0"}}>Welcome to ChatApp, {user.user}!</p>
              <p style={{padding:"30px 0"}}>Welcome to ChatApp, {user.user}!</p>
              <p style={{padding:"30px 0"}}>Welcome to ChatApp, {user.user}!</p>
              <p style={{padding:"30px 0"}}>Welcome to ChatApp, {user.user}!</p>
            </main>
          </section>
          {opneDetail && (
            <section style={{ borderLeft: "1px solid var(--border)", width: "50%" }}>
              <header className={styles.current_chat_user_header}>
                <h4 className={styles.user_info_close} onClick={()=>setOpneDetail(false)} title="close">&#215;</h4>
              </header>
              <div>
                <h1>{user.user}</h1>
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );
};

export default HomeRight;
