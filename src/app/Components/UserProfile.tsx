import * as React from "react";
import Image from "next/image";
import profileImg from "../Assets/pngwing.com (1).png";
import styles from "../page.module.css";

import {
  Edit,
  Person,
  Call,
  Mail,
  Upload,
  Delete,
  Visibility,
} from "@mui/icons-material";
import { Backdrop, Box, Modal, Fade, Button, Typography } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const UserProfile = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [open, setOpen] = React.useState<boolean>(false);
  const [editTxt, setEditTxt] = React.useState<string>("");
  const [inputType, setInputType] = React.useState<string>("");
  const [headTxt, setHeadTxt] = React.useState<string>("");
  const [profileImage, setProfileImage] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditTxt(e.target.value);
  };

  const handleOpen = (
    editTag: string,
    input: string,
    helptxt: string
  ): void => {
    setEditTxt(editTag);
    setInputType(input);
    setHeadTxt(helptxt);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleUploadClick = () => {
    // Click the hidden input element to trigger file selection
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // Function to handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      // Process the selected file(s)
      const selectedFile = fileList[0];

      if (selectedFile) {
        const imageUrl = URL.createObjectURL(selectedFile);
        setProfileImage(imageUrl);
        console.log("Selected file:", imageUrl);
      }
      // You can perform further actions like uploading the file to a server
    }
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              sx={{
                mb: 3,
              }}
              variant="h6"
              component="h6"
            >
              {headTxt}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="div"
            >
              <div className={styles.material_inpt}>
                <input
                  onChange={handleChange}
                  type={inputType}
                  name=""
                  id=""
                  value={editTxt}
                />
              </div>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <Button
                  sx={{
                    marginTop: "30px",
                  }}
                  variant="outlined"
                  color="error"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  sx={{
                    marginTop: "30px",
                  }}
                  variant="contained"
                  color="success"
                  onClick={handleClose}
                >
                  Update
                </Button>
              </Typography>
            </Typography>
          </Box>
        </Fade>
      </Modal>

      <section className={styles.profile_image}>
        <div title="Profile Image">
          <Image
            className={styles.user_img}
            style={{ width: "100%", height: "100%" }}
            fill={true}
            layout={"fill"}
            objectFit={"contain"}
            src={profileImage ? profileImage : profileImg}
            alt="profile Image"
          />
          <section className={styles.profile_img_overlay}>
            <div title="Upload">
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={inputRef}
                onChange={handleFileSelect}
              />
              <Upload
                onClick={handleUploadClick}
                sx={{ fontSize: 30, cursor: "pointer" }}
              />
            </div>
            <div title="View">
              <Visibility sx={{ fontSize: 30, cursor: "pointer" }} />
            </div>
            <div title="Delete">
              <Delete sx={{ fontSize: 30, cursor: "pointer" }} />
            </div>
          </section>
        </div>
      </section>

      <section className={styles.profile_details}>
        <ul className={styles.user_details}>
          <li>
            <div className={styles.profile_details_container}>
              <span>
                <Person />
              </span>
              <span>Laxmi Lal</span>
              <span
                onClick={() =>
                  handleOpen("laxmi Lal", "text", "Update username")
                }
              >
                <Edit />
              </span>
            </div>
          </li>
          <li>
            <div className={styles.profile_details_container}>
              <span>
                <Call />
              </span>
              <span>7477055461</span>
              <span
                onClick={() =>
                  handleOpen("7477055461", "text", "Update phone number")
                }
              >
                <Edit />
              </span>
            </div>
          </li>
          <li>
            <div className={styles.profile_details_container}>
              <span>
                <Mail />
              </span>
              <span>lln7477055461@gmail.com</span>
              <span
                onClick={() =>
                  handleOpen("lln7477055461@gmail.com", "email", "Update Email")
                }
              >
                <Edit />
              </span>
            </div>
          </li>
        </ul>
      </section>
    </>
  );
};

export default UserProfile;
