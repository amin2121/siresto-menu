import { createSlice } from "@reduxjs/toolkit";

export const sourceSlice = createSlice({
  name: "source",
  initialState: {
    source: "",
  },
  reducers: {
    settingSource: (state, action) => {
      state.source = action.payload;
    },
  },
});

export const { settingSource } = sourceSlice.actions;
export default sourceSlice.reducer;
