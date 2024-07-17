import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../../rtk-slices/counterReducer";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
