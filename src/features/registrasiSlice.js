import { createSlice } from "@reduxjs/toolkit";

export const registrasiSlice = createSlice({
  name: "registrasi",
  initialState: {
    nama: "",
    username: "",
    email: "",
    nomerWhatsapp: "",
    password: "",
  },
  reducers: {
    setRegistrasi: (state, action) => {
      state.nama = action.payload.nama;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.nomerWhatsapp = action.payload.nomerWhatsapp;
      state.password = action.payload.password;
    },
  },
});

export const { setRegistrasi } = registrasiSlice.actions;
export default registrasiSlice.reducer;
