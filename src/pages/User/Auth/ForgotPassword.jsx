import React, { useEffect, useState } from "react";
import SiResto from "../../../assets/logo/SiResto.png";
import OtpInput from "../../../components/OtpInput";
import axios from "../../../utils/axios";
import Alert from "../../../components/auth/Alert";
import { useNavigate } from "react-router";
import { Button } from "../../../components/Button";
import { Link } from "react-router-dom";
import { baseUrlFrontEnd } from "../../../utils/strings";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [nomerWhatsapp, setNomerWhatsapp] = useState("");

  function forgotPassword() {
    axios
      .post("menu/forgot-password", {
        phone_number: nomerWhatsapp,
        link: "menu.awandigital.id/pesan-online/reset-password",
      })
      .then((response) => {
        const res = response.data.data;

        var alert = document.getElementById("alert-success");
        alert.classList.toggle("hidden");
        alert.classList.toggle("opacity-[0]");

        setTimeout(() => {
          alert.classList.toggle("opacity-[0]");
        }, 2000);

        setTimeout(() => {
          alert.classList.toggle("hidden");
        }, 2500);
      })
      .catch((error) => {
        var alert = document.getElementById("alert-error");
        alert.classList.toggle("hidden");
        alert.classList.toggle("opacity-[0]");

        setTimeout(() => {
          alert.classList.toggle("opacity-[0]");
        }, 2000);

        setTimeout(() => {
          alert.classList.toggle("hidden");
        }, 2500);
      });
  }

  return (
    <div className="flex justify-center items-center h-screen overflow-y-auto">
      <div className="max-w-lg w-full px-4">
        <div className="bg-white rounded-lg shadow-lg px-8 py-6">
          <div className="flex items-center justify-center">
            <div
              className="absolute top-[50px] w-full mx-auto flex justify-center hidden opacity-[0] z-50"
              id="alert-success"
            >
              <Alert
                type={"success"}
                msg={
                  "Link pemulihan telah berhasil dikirim. Mohon periksa pesan di WhatsApp Anda. Terima kasih."
                }
              />
            </div>
            <div
              className="absolute top-[50px] w-full mx-auto flex justify-center hidden opacity-[0] z-50"
              id="alert-error"
            >
              <Alert type={"error"} msg={"Periksa kembali data anda."} />
            </div>
          </div>
          <a
            href="https://siresto.awandigital.id"
            rel="noopener noreferrer"
            target="_blank"
            className="block text-center mb-6"
          >
            <img src={SiResto} alt="" className="w-24 mx-auto" />
          </a>
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold">Reset Password</h3>
            <p>Kami bantu pulihkan akunmu kembali</p>
          </div>
          <div className="mx-auto my-6">
            <label htmlFor="otp" className="block mb-2">
              Nomer Handphone
            </label>
            <div className="relative mb-4">
              <input
                type="number"
                placeholder="Masukkan No. WhatsApp 08*"
                value={nomerWhatsapp}
                onChange={(e) => setNomerWhatsapp(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <p className="text-sm text-gray-500">
              Silakan masukkan nomor handphone yang telah terdaftar untuk
              menerima link pemulihan.
            </p>
          </div>
          <div className="mt-6">
            <Button
              type="button"
              title="Kirim Email Pemulihan"
              className="w-full bg-blue-500 border-0 hover:bg-blue-400 mb-2"
              onClick={forgotPassword.bind(this)}
            />

            <p>
              Kembali ke
              <Link to="/pesan-online/login" className="text-blue-500 pl-1">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
