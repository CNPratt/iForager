import { configureStore } from "@reduxjs/toolkit";
import configReducer from "../rtk-slices/configSlice";
import userContentReducer from "../rtk-slices/userContent";
import { taxaSearchApi } from "../api-slices/taxaSearchApi";
import { observationsApi } from "../api-slices/observationsApi";
import {
  createMap,
  deleteMap,
  saveCustomMapsToAsyncStorage,
} from "../rtk-slices/userContent";

const store = configureStore({
  reducer: {
    config: configReducer,
    userContent: userContentReducer,
    [observationsApi.reducerPath]: observationsApi.reducer,
    [taxaSearchApi.reducerPath]: taxaSearchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(observationsApi.middleware)
      .concat(taxaSearchApi.middleware)
      .concat((storeAPI) => (next) => (action) => {
        const result = next(action);

        if (createMap.match(action) || deleteMap.match(action)) {
          storeAPI.dispatch(
            saveCustomMapsToAsyncStorage(
              storeAPI.getState().userContent.customMaps
            )
          );
        }

        return result;
      }),
});

export default store;
