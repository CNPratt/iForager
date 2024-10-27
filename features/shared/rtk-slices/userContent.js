import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveCustomMapsToAsyncStorage = createAsyncThunk(
  "userContent/saveCustomMapsToAsyncStorage",
  async (customMaps) => {
    await AsyncStorage.setItem("customMaps", JSON.stringify(customMaps));
  }
);

export const userContentSlice = createSlice({
  name: "userContent",
  initialState: {
    customMaps: [],
  },
  reducers: {
    createMap: (state, action) => {
      state.customMaps.push(action.payload);
    },
    deleteMap: (state, action) => {
      state.customMaps = state.customMaps.filter(
        (map) => map.title !== action.payload
      );
    },
    setMaps: (state, action) => {
      state.customMaps = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveCustomMapsToAsyncStorage.fulfilled, (state, action) => {
      console.log("Saved custom maps to async storage");
    });
  },
});

export const { createMap, deleteMap, setMaps } = userContentSlice.actions;

export default userContentReducer = userContentSlice.reducer;
