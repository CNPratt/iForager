import { configureStore } from "@reduxjs/toolkit";
import configReducer from "../rtk-slices/configSlice";
import userContentReducer from "../rtk-slices/userContent";
import { taxaSearchApi } from "../api-slices/taxaSearchApi";
import { observationsApi } from "../api-slices/observationsApi";

export default configureStore({
  reducer: {
    config: configReducer,
    userContent: userContentReducer,
    [observationsApi.reducerPath]: observationsApi.reducer,
    [taxaSearchApi.reducerPath]: taxaSearchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(observationsApi.middleware)
      .concat(taxaSearchApi.middleware),
});
