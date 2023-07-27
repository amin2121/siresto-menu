import { Routes, Route } from "react-router-dom";

import ContainerUser from "../pages/User/Container";
import ContainerEmpty from "../pages/User/ContainerEmpty";
import Home from "../pages/User/Home";
import Keranjang from "../pages/User/Keranjang";
import Pembayaran from "../pages/User/Pembayaran";
import DaftarNoTelepon from "../pages/User/DaftarNoTelepon";
import DaftarNamaPelanggan from "../pages/User/DaftarNamaPelanggan";
import PembayaranBerhasil from "../pages/User/PembayaranBerhasil";
import Pesanan from "../pages/User/Pesanan";
import PilihPromo from "../pages/User/PilihPromo";
import Login from "../pages/User/Auth/Login";
import Register from "../pages/User/Auth/Register";
import ForgotPassword from "../pages/User/Auth/ForgotPassword";
import ResetPassword from "../pages/User/Auth/ResetPassword";
import Verifikasi from "../pages/User/Auth/Verifikasi";
import DaftarAlamat from "../pages/User/DaftarAlamat";
import Profile from "../pages/User/Profile";

const RouteManager = () => {
  return (
    <Routes>
      <Route path="/" element={<ContainerUser />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="pesanan" element={<Pesanan />} />
        <Route path="keranjang" element={<Keranjang />} />
        <Route path="pembayaran" element={<Pembayaran />} />
        <Route path="pembayaran-berhasil" element={<PembayaranBerhasil />} />
        <Route path="promo" element={<PilihPromo />} />
      </Route>
      <Route path="/" element={<ContainerEmpty />}>
        <Route path="nomor-telepon" element={<DaftarNoTelepon />} />
        <Route path="nama-pelanggan" element={<DaftarNamaPelanggan />} />
        <Route path="alamat" element={<DaftarAlamat />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="pesan-online/login" element={<Login />} />
      <Route path="pesan-online/register" element={<Register />} />
      <Route path="pesan-online/forgot-password" element={<ForgotPassword />} />
      <Route path="pesan-online/reset-password" element={<ResetPassword />} />
      <Route path="pesan-online/verifikasi" element={<Verifikasi />} />
    </Routes>
  );
};

export { RouteManager };
