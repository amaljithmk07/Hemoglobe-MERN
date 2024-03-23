import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URI from "../../components/constant/Constants";

//This api for user's donation date displaying
const initialState = {
  userdata: [],
  isLoading: false,
  error: null,
};
// const token = sessionStorage.getItem("Token");

export const userview = createAsyncThunk("content/userview", async (token) => {
  try {
    // console.log(token);
    const res = await axios.get(`${BASE_URI}/api/user/view`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.data.data;
    return data;
  } catch (error) {
    throw error.response;
    // console.log(error);
    // rethrow the error to propagate it to the action
  }
});
export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userview.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userdata = action.payload;
    });
    builder.addCase(userview.rejected, (state, action) => {
      state.isLoading = false;
      // console.log(action.error.message);
      state.error = action.error.message;
    });
  },
});
export default contentSlice.reducer;
