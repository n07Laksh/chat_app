import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: {
    err?:boolean;
    token?:string;
    user:{
      name:string;
      email:string;
    }
    msg?:string;
    __v?:string | number;
  } | null;
  chatOpenUser: string | null;
  profile_img: string | null;
}

const initialState: UserState = {
  user: null,
  chatOpenUser: null,
  profile_img: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState['user'] | null>) => {
      state.user = action.payload;
    },
    setChatOpenerUser: (state, action: PayloadAction<string | null>) => {
      state.chatOpenUser = action.payload;
    },
    setProfileImg: (state, action: PayloadAction<string | null>) => {
      state.profile_img = action.payload;
    },
    
  },
});

export const { setUser, setChatOpenerUser, setProfileImg } = userSlice.actions;

export default userSlice.reducer;
