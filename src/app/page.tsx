"use client";
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import styles from "./page.module.css";

import { useRouter } from "next/navigation";
import MainHome from "./Components/Home";
import { useTheme } from "next-themes";

export default function Home() {
  const { resolvedTheme } = useTheme();
  const navigate = useRouter();

  const socket = io("https://stripe-moored-dungeon.glitch.me/");

  socket.on("connect", () => {
    console.log("Socket is connected");
    socket.on("close", () => {
      console.log("Socket is closed");
    });
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const isLogin = storedUser ? true : false;
    if (!isLogin) {
      navigate.push("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const root = document.documentElement;

    if (resolvedTheme == "dark") {
      root.style.setProperty("--background", "#020817");
      root.style.setProperty("--boxColor", "#165aaa");
      root.style.setProperty("--hoverColor", "#1e293b");
      root.style.setProperty("--foreground", "#fff");
      root.style.setProperty("--border", "#e5e7eb");
    } else {
      root.style.setProperty("--background", "#fff");
      root.style.setProperty("--boxColor", "#165aaa");
      root.style.setProperty("--hoverColor", "#f1f5f9");
      root.style.setProperty("--foreground", "#000");
      root.style.setProperty("--border", "#e5e7eb");
    }
  }, [resolvedTheme]);

  return (
    <main className={styles.main}>
      <MainHome />
    </main>
  );
}
