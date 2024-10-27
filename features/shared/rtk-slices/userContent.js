import { createSlice } from "@reduxjs/toolkit";

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
});

export const { createMap, deleteMap, setMaps } = userContentSlice.actions;

export default userContentReducer = userContentSlice.reducer;
