import Image from "next/image";
import React from "react";
import profileImage from "../Assets/pngwing.com (1).png";
import styles from "../page.module.css";

import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Edit } from "@mui/icons-material";

const UserProfile = () => {
  return (
    <>
      <section className={styles.profile_image}>
        <div title="Profile Image">
          <Image
            className={styles.user_img}
            style={{ width: "100%", height: "auto" }}
            src={profileImage}
            alt="profile Image"
          />
          <section className={styles.profile_img_overlay}>
            <div title="Upload">
              <UploadIcon sx={{ fontSize: 30, cursor: "pointer" }} />
            </div>
            <div title="View">
              <VisibilityIcon sx={{ fontSize: 30, cursor: "pointer" }} />
            </div>
            <div title="Delete">
              <DeleteIcon sx={{ fontSize: 30, cursor: "pointer" }} />
            </div>
          </section>
        </div>
      </section>
      <section>
      <header className={styles.profile_edit}><Edit /></header>
      </section>
      <section className={styles.profile_details}>
        <div className={styles.user_details}>
          <div>Laxmi Lal</div>
          <div>email address</div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
