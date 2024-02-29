"use client";
import React from "react";
import { Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const AlertBox = () => {
  const alertData = useSelector((state: RootState) => state.alerts.alertSMS);

  return (
    <>
      {alertData && (
        <Alert
          sx={{
            position: "absolute",
            bottom: "80px",
            right: "80px",
            zIndex: 100,
          }}
          variant={alertData.variant as any} // TODO: fix this type error
          severity={alertData.severity as any}
        >
          {alertData.message}
        </Alert>
      )}
    </>
  );
};

export default AlertBox;
