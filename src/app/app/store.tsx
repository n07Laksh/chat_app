'use client'
import { configureStore } from '@reduxjs/toolkit';
import userSlice from "./features/userSelection/userSlice";
import alertSlice from './features/userSelection/alertSlice';
// ...

const store = configureStore({
  reducer: {
    users: userSlice,
    alerts: alertSlice,
  }
})

export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;