"use client";
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import styles from "./page.module.css";

import { useRouter } from "next/navigation";
import MainHome from "./Components/Home";

export default function Home() {
  const navigate = useRouter();

  const socket = io("https://stripe-moored-dungeon.glitch.me/");

   socket.on("connect",()=>{
    console.log("Socket is connected")
    socket.on("close", () => {
      console.log("Socket is closed");
    });
    
   })

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const isLogin = storedUser? true : false
    if (!isLogin) {
      navigate.push("/login");
    }
  }, [navigate]);

  return (
    <main className={styles.main}>
      <MainHome />
    </main>
  );
}
