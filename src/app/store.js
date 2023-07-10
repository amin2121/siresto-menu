import { configureStore } from "@reduxjs/toolkit";
import produkReducer from "../features/produkSlice";
import sidebarReducer from "../features/sidebarSlice";
import pembayaranReducer from "../features/pembayaranSlice";
import nomejaReducer from "../features/nomejaSlice";
import sourceReducer from "../features/sourceSlice";
import warnaKeranjangReducer from "../features/warnaKeranjangSlice";
import loginReducer from "../features/loginSlice";
import notifTrialReducer from "../features/notifTrialSlice";
import registrasiReducer from "../features/registrasiSlice";

export const store = configureStore({
  reducer: {
    produk: produkReducer,
    sidebar: sidebarReducer,
    pembayaran: pembayaranReducer,
    nomeja: nomejaReducer,
    source: sourceReducer,
    warnaKeranjang: warnaKeranjangReducer,
    login: loginReducer,
    notifTrial: notifTrialReducer,
    registrasi: registrasiReducer,
  },
});
