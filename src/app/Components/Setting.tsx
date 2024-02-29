import * as React from "react";
import { useDispatch } from "react-redux";
import { alertWithTimeout } from "../app/features/userSelection/alertSlice";

import {
  ExitToApp,
  Brightness7,
  CheckCircleOutline,
  Logout,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useTheme } from "next-themes";

import Image from "next/image";
import user from "../Assets/pngwing.com (1).png";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import LoadingButtons from "./LoadingBtn";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
  background: "var(--background)",
  color: "var(--foreground)",
  border: `1px solid var(--border)`,
};

interface ComponentProps {
  handleRouteClick: (str: string) => void;
}

const Setting: React.FC<ComponentProps> = ({ handleRouteClick }) => {
  const profileImage = useSelector(
    (state: RootState) => state.users.profile_img
  );
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [selectedValue, setSelectedValue] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [logoutloading, setLogoutloading] = React.useState<boolean>(false);

  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const [dialog, setDialog] = React.useState<boolean>(false);
  const handleDialogOpen = (): void => {
    setDialog(true);
  };
  const handleDialogClose = (): void => {
    setDialog(false);
  };

  const handleProfileClick = (): void => {
    handleRouteClick("profile");
  };

  const handleMode = (): void => {
    setLoading(true);
    setTheme(selectedValue);
    const timer = setTimeout(() => {
      setLoading(false);
      handleClose();
      clearTimeout(timer);
    }, 2000);
  };

  const handleLogout = (): void => {
    setLogoutloading(true);
    localStorage.removeItem("user");
    localStorage.removeItem("profile_img");
    setTimeout(() => {
      router.push("/login");
      dispatch(
        alertWithTimeout({
          severity: "success",
          variant: "filled",
          message: "Log out successfully",
        })
        );
        setLogoutloading(false);
    }, 2000);
  };

  return (
    <>
      <div>
        <React.Fragment>
          <Dialog
            sx={{
              "& > div:nth-of-type(3) > div": {
                borderRadius: "10px",
                p: 2,
                background: "var(--background)",
                color: "var(--foreground)",
                border: `1px solid var(--border)`,
              },
            }}
            open={dialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleDialogClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Confirm"}</DialogTitle>
            <DialogContent>
              <DialogContentText
                sx={{ color: "inherit" }}
                id="alert-dialog-slide-description"
              >
                {`Are you sure? You want to log out.`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                sx={{ color: "var(--boxColor)" }}
                onClick={handleDialogClose}
              >
                Cancel
              </Button>
              <LoadingButtons
                clickEvent={handleLogout}
                txt={"Log out"}
                icon={Logout}
                loading={logoutloading}
              />
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </div>
      <div>
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
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Theme
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 3 }}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={theme}
                  name="radio-buttons-group"
                  onChange={(event) => setSelectedValue(event.target.value)}
                >
                  <FormControlLabel
                    value="light"
                    control={
                      <Radio
                        sx={{
                          color: "var(--boxColor)",
                        }}
                      />
                    }
                    label="Light"
                  />
                  <FormControlLabel
                    value="dark"
                    control={
                      <Radio
                        sx={{
                          color: "var(--boxColor)",
                        }}
                      />
                    }
                    label="Dark"
                  />
                  <FormControlLabel
                    value="system"
                    control={
                      <Radio
                        sx={{
                          color: "var(--boxColor)",
                        }}
                      />
                    }
                    label="System default"
                    color="success"
                  />
                </RadioGroup>
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 4,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <Button
                    onClick={handleClose}
                    variant="outlined"
                    sx={{ color: "var(--boxColor)" }}
                  >
                    Cancel
                  </Button>
                  <LoadingButtons
                    clickEvent={handleMode}
                    txt={"Ok"}
                    icon={CheckCircleOutline}
                    loading={loading}
                  />
                </div>
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
      <main>
        <section
          className={styles.setting_user_sec}
          onClick={handleProfileClick}
        >
          <div>
            <div className={styles.setting_user_container}>
              <Image
                style={{ width: "100%", height: "auto" }}
                src={profileImage ? profileImage : user}
                alt="user"
                width={100}
                height={100}
              />
            </div>
            <div className={styles.setting_user_details}>
              <h4>Laxmi Lal</h4>
              <h4>lln74@gmail.com</h4>
            </div>
          </div>
        </section>
        <ul className={styles.setting_other_sec}>
          <li onClick={handleOpen}>
            <div className={styles.setting_li_items}>
              <Brightness7 />
              <Button
                sx={{
                  textTransform: "none",
                  color: "var(--foreground)",
                }}
              >
                Theme
              </Button>
            </div>
          </li>
          <li onClick={handleDialogOpen}>
            <div className={styles.setting_li_items}>
              <ExitToApp />
              <Button
                sx={{
                  textTransform: "none",
                  color: "var(--foreground)",
                }}
              >
                Log out
              </Button>
            </div>
          </li>
        </ul>
      </main>
    </>
  );
};

export default Setting;
