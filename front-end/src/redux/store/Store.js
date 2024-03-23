import { configureStore } from "@reduxjs/toolkit";
import contentSlice from "../reducer/UserviewSlice";

export default configureStore({
  reducer: {
    user: contentSlice,
  },
});
