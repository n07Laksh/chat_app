'use client'
import { configureStore } from '@reduxjs/toolkit';
import userSlice from "./features/userSelection/userSlice";
// ...

const store = configureStore({
  reducer: {
    users: userSlice,
  }
})

export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;