import * as React from "react";
import Image from "next/image";
import profileImg from "../Assets/pngwing.com (1).png";
import styles from "../page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setProfileImg } from "../app/features/userSelection/userSlice";
import { alertWithTimeout } from "../app/features/userSelection/alertSlice";
import { RootState } from "../app/store";
import LoadingButtons from "./LoadingBtn";
import {
  Edit,
  Person,
  Call,
  Mail,
  Upload,
  Delete,
  Visibility,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CropImage from "./CropImage";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  background: "var(--background)",
  color: "var(--foreground)",
  border: `1px solid var(--border)`,
};
const imgStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 450,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  background: "var(--background)",
  color: "var(--foreground)",
  border: `1px solid var(--border)`,
};

interface ComponentProps {
  fetchProfileImg: () => Promise<void>;
}

const UserProfile: React.FC<ComponentProps> = ({ fetchProfileImg }) => {
  const storeUser = useSelector((state: RootState) => state.users.user);
  const profileImage = useSelector(
    (state: RootState) => state.users.profile_img
  );
  const dispatch = useDispatch<any>();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [open, setOpen] = React.useState<boolean>(false);
  const [imgOpen, setImgOpen] = React.useState<boolean>(false);
  const [editTxt, setEditTxt] = React.useState<string>("");
  const [inputType, setInputType] = React.useState<string>("");
  const [headTxt, setHeadTxt] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

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
  const handleClose = (): void => setOpen(false);
  const handleImgOpen = (): void => {
    setImgOpen(true);
  };
  const handleImgClose = (): void => {
    setImgOpen(false);
  };

  // function for input type file clicking
  const handleUploadClick = (): void => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const [selectedImage, setSelectedImage] = React.useState<any>(null);
  // Function to handle file selection
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const blob = URL.createObjectURL(fileList[0]);
      setSelectedImage(blob);
    }
  };

  const uploadImage = async (img: Blob): Promise<boolean> => {
    try {
      if (!navigator.onLine) {
        throw new Error("Network connection error!");
      }
      const formData = new FormData();
      formData.append("picture", img);

      const url =
        // "https://chat-app-profile-laxmilals-projects.vercel.app/chatapp/user/profileimg/profile";
        "http://localhost:8080/chatapp/user/profileimg/profile";

      const response = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();

      if (!data.error) {
        fetchProfileImg();
        dispatch(
          alertWithTimeout({
            severity: "success",
            variant: "filled",
            message: data?.message,
          })
        );
        return true;
      } else {
        throw new Error(data.message); // Throw an error if there's an error in the response data
      }
    } catch (error: any) {
      dispatch(
        alertWithTimeout({
          severity: "error",
          variant: "filled",
          message: error?.message,
        })
      );
      console.log("catch block !Error", error?.message);
      return false;
    }
  };

  const handleProfileRemove = async (): Promise<void> => {
    setLoading(true);
    try {
      let url =
        "https://chat-app-profile-laxmilals-projects.vercel.app/chatapp/user/profileimg/removeimage";
      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to remove file.");
      }

      let data = await response.json();
      if (!data.error) {
        dispatch(setProfileImg(null));
        localStorage.removeItem("profile_img");
        handleDialogClose();
        dispatch(
          alertWithTimeout({
            severity: "success",
            variant: "filled",
            message: data?.message,
          })
        );
        setLoading(false);
      }
    } catch (error: any) {
      handleDialogClose();
      dispatch(
        alertWithTimeout({
          severity: "error",
          variant: "filled",
          message: error?.message,
        })
      );
      console.log("catch block error from remove profile", error.message);
      setLoading(false);
    }
  };

  const updateName = async () => {
    setLoading(true);
    try {
      // api call for updating name in database
      if (storeUser && editTxt) {
        const response = await fetch(
          "https://chat-app-auth-laxmilals-projects.vercel.app/chatapp/user/update/updatename",
          // "http://localhost:8000/chatapp/user/update/updatename",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: editTxt }),
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!data.error) {
          dispatch(
            alertWithTimeout({
              severity: "success",
              variant: "filled",
              message: data?.message,
            })
          );
          setLoading(false);
          handleClose();
          console.log(data);
        } else {
          throw new Error(data.message);
        }
      } else {
        dispatch(
          alertWithTimeout({
            severity: "error",
            variant: "filled",
            message: !editTxt
              ? "Invalid value?"
              : "Something wrong? Refresh and try again",
          })
        );
        setLoading(false);
      }
    } catch (error: any) {
      dispatch(
        alertWithTimeout({
          severity: "error",
          variant: "filled",
          message: error.message,
        })
      );
      setLoading(false);
    }
  };
  return (
    <>
      {selectedImage && (
        <CropImage
          image={selectedImage}
          cancel={setSelectedImage}
          uploadImage={uploadImage}
        />
      )}
      <div>
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            "& > div:nth-of-type(3) > div": {
              borderRadius: "10px",
              p: 1,
              background: "var(--background)",
              color: "var(--foreground)",
              border: `1px solid var(--border)`,
            },
          }}
        >
          <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ color: "inherit" }}
              id="alert-dialog-description"
            >
              Are you sure you want to remove the profile picture!
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ mt: 1 }}>
            <Button
              sx={{
                color: "var(--boxColor)",
              }}
              variant="outlined"
              onClick={handleDialogClose}
            >
              Cancel
            </Button>
            <LoadingButtons
              clickEvent={handleProfileRemove}
              txt={"Delete"}
              icon={Delete}
              loading={loading}
            />
          </DialogActions>
        </Dialog>
      </div>
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
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <Button
                  sx={{
                    color: "var(--boxColor)",
                  }}
                  variant="outlined"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <LoadingButtons
                  clickEvent={updateName}
                  txt={"Update"}
                  icon={Upload}
                  loading={loading}
                />
              </Typography>
            </Typography>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={imgOpen}
        onClose={handleImgClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={imgOpen}>
          <Box sx={imgStyle}>
            <Typography
              sx={{
                width: "100%",
                height: "100%",
                margin: "0 auto",
                overflow: "hidden",
              }}
              id="transition-modal-title"
              variant="h6"
              component="div"
            >
              <Image
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                src={profileImage ? profileImage : profileImg}
                alt="profile image view"
                width={100}
                height={100}
                unoptimized={true}
              />
            </Typography>
            <Typography
              sx={{
                marginTop: "30px",
                position: "absolute",
                bottom: "100%",
                left: "100%",
              }}
            >
              <Button
                sx={{
                  minWidth: "30px",
                  padding: "0",
                  fontSize: "21px",
                  fontWeight: "bolder",
                  color: "var(--foreground)",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  "&:hover": {
                    backgroundColor: "var(--hoverColor)",
                  },
                }}
                onClick={handleImgClose}
                color="error"
              >
                X
              </Button>
            </Typography>
          </Box>
        </Fade>
      </Modal>

      <section className={styles.profile_image}>
        <div title="Profile Image">
          <Image
            className={styles.user_img}
            style={{ width: "100%", height: "auto" }}
            src={profileImage ? profileImage : profileImg}
            alt="profile Image"
            width={100}
            height={100}
          />
          <section className={styles.profile_img_overlay}>
            <div title="Upload">
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={inputRef}
                onChange={handleFileSelect}
                multiple={false}
              />
              <Upload
                onClick={handleUploadClick}
                sx={{ fontSize: 30, cursor: "pointer" }}
              />
            </div>
            <div title="View">
              <Visibility
                onClick={handleImgOpen}
                sx={{ fontSize: 30, cursor: "pointer" }}
              />
            </div>
            <div title="Remove">
              <Delete
                onClick={handleDialogOpen}
                sx={{ fontSize: 30, cursor: "pointer" }}
              />
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
