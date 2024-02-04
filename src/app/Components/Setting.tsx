import * as React from "react";

import { ExitToApp, Brightness7 } from "@mui/icons-material";
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

import Image from "next/image";
import user from "../Assets/pngwing.com (1).png";
import styles from "../page.module.css";

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
};

interface YourComponentProps {
  handleRouteClick: (str: string) => void;
}

const Setting: React.FC<YourComponentProps> = ({ handleRouteClick }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [dialog, setDialog] = React.useState(false);

  const handleDialogOpen = () => {
    setDialog(true);
  };

  const handleDialogClose = () => {
    setDialog(false);
  };

  const handleProfileClick = () => {
    handleRouteClick("profile");
  };

  return (
    <>
      <div>
        <React.Fragment>
          <Dialog
            sx={{
              "& > div:nth-child(3) > div": {
                borderRadius: "10px",
                p: 2,
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
              <DialogContentText id="alert-dialog-slide-description">
                {`Are you sure? You want to log out.`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDialogClose}
              >
                Cancel
              </Button>
              <Button variant="contained" color="success" onClick={handleClose}>
                Confirm
              </Button>
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
                  defaultValue="light"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="light"
                    control={<Radio />}
                    label="Light"
                  />
                  <FormControlLabel
                    value="dark"
                    control={<Radio />}
                    label="Dark"
                  />
                  <FormControlLabel
                    value="system"
                    control={<Radio />}
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
                    color="error"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    color="success"
                  >
                    Ok
                  </Button>
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
                style={{ width: "100%", height: "100%" }}
                layout="fill"
                objectFit="contain"
                src={user}
                alt="user"
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
                  fontFamily: '"sans-serif", "helventica"',
                }}
              >
                Theme
              </Button>
            </div>
          </li>
          <li onClick={handleDialogOpen}>
            <div className={styles.setting_li_items}>
              <ExitToApp />
              <Button>Log out</Button>
            </div>
          </li>
        </ul>
      </main>
    </>
  );
};

export default Setting;
