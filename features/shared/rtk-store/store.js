import { configureStore } from "@reduxjs/toolkit";
import configReducer from "../rtk-slices/configSlice";
import { observationsApi } from "../api-slices/observationsApi";

export default configureStore({
  reducer: {
    config: configReducer,
    [observationsApi.reducerPath]: observationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(observationsApi.middleware),
});
