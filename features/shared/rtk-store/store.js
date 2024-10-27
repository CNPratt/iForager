import { configureStore } from "@reduxjs/toolkit";
import configReducer from "../rtk-slices/configSlice";
import userContentReducer from "../rtk-slices/userContent";
import { taxaSearchApi } from "../api-slices/taxaSearchApi";
import { observationsApi } from "../api-slices/observationsApi";
import { thunk } from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMap, deleteMap } from "../rtk-slices/userContent";

// Middleware to sync with AsyncStorage
const syncWithAsyncStorage = (store) => (next) => async (action) => {
  const result = next(action);

  if (action.type === createMap.type || action.type === deleteMap.type) {
    const state = store.getState();
    await AsyncStorage.setItem(
      "customMaps",
      JSON.stringify(state.userContent.customMaps)
    );
  }

  return result;
};

const store = configureStore({
  reducer: {
    config: configReducer,
    userContent: userContentReducer,
    [observationsApi.reducerPath]: observationsApi.reducer,
    [taxaSearchApi.reducerPath]: taxaSearchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(thunk, syncWithAsyncStorage)
      .concat(observationsApi.middleware)
      .concat(taxaSearchApi.middleware),
});

store.subscribe(() => {
  const state = store.getState();
  AsyncStorage.setItem(
    "customMaps",
    JSON.stringify(state.userContent.customMaps)
  );
});

export default store;
