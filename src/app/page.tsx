"use client";
import React, { useEffect } from "react";
import styles from "./page.module.css";

import { useRouter } from "next/navigation";
import MainHome from "./Components/Home";

export default function Home() {
  const navigate = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const isLogin = storedUser? true : false
    if (!isLogin) {
      navigate.push("/login");
    }
  }, []);

  return (
    <main className={styles.main}>
      <MainHome />
    </main>
  );
}
