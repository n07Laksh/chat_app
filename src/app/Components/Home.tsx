import React from "react";
import HomeLeft from "./HomeLeft";
import HomeRight from "./HomeRight";

import styles from "../page.module.css"

export default function MainHome() {
  return (
    <>
      <div className={styles.home_main}>
        <HomeLeft />
        <HomeRight />
      </div>
    </>
  );
}
