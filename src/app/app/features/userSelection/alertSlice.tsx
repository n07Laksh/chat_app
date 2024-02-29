import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface smsObj {
  alertSMS: {
    severity: string;
    variant: string;
    message: string;
  } | null;
}

const initialState: smsObj = {
  alertSMS: null,
};
export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<smsObj['alertSMS'] | null>) => {
        state.alertSMS = action.payload;
      },
      clearAlert: (state) => {
        state.alertSMS = null;
      },
  },
});

export const { setAlert, clearAlert } = alertSlice.actions;

export const alertWithTimeout = (alertData: smsObj["alertSMS"]) => (dispatch: any) => {
  dispatch(setAlert(alertData));
  setTimeout(() => {
    dispatch(clearAlert());
  }, 4000);
};

export default alertSlice.reducer;