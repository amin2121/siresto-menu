import React, { useEffect, useState } from "react";
import SiResto from "../../../assets/logo/SiResto.png";
import axios from "../../../utils/axios";
import Alert from "../../../components/auth/Alert";
import { MessageError } from "../../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { setRegistrasi } from "../../../features/registrasiSlice";
import { useNavigate } from "react-router";
import functions from "daisyui/src/colors/functions";
import { Link } from "react-router-dom";
import { Button } from "../../../components/Button";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nama, setNama] = useState("");
  // const [username, setUsername] = useState("");
  const [nomerWhatsapp, setNomerWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [isKirimKodeClicked, setIsKirimKodeClicked] = useState(0);
  const [isKirimKodeDisabled, setIsKirimKodeDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [check, setCheck] = useState(true);

  useEffect(() => {
    if (konfirmasiPassword) {
      setCheck(password === konfirmasiPassword);
    }
  }, [konfirmasiPassword]);

  function sendOtp() {
    axios
      .post("sendotp", {
        phone_number: nomerWhatsapp,
        // username: username,
        email: email,
      })
      .then((response) => {
        const res = response.data.data;

        localStorage.setItem(
          "userMenu",
          JSON.stringify({
            nama: nama,
            // username: username,
            email: email,
            nomerWhatsapp: nomerWhatsapp,
            password: password,
          })
        );

        var alert = document.getElementById("alert-success");
        alert.classList.toggle("hidden");
        alert.classList.toggle("opacity-[0]");

        setTimeout(() => {
          alert.classList.toggle("opacity-[0]");
        }, 2000);

        setTimeout(() => {
          alert.classList.toggle("hidden");
        }, 2500);

        navigate("/pesan-online/verifikasi");
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
      <div className="max-w-lg w-full px-auto">
        <div className="bg-white rounded-lg shadow-lg px-8 py-6">
          <div className="flex items-center justify-center">
            <div
              className="absolute top-[50px] w-full mx-auto flex justify-center hidden opacity-[0] z-50"
              id="alert-success"
            >
              <Alert type={"success"} msg={"Kode Otp berhasil dikirim."} />
            </div>
            <div
              className="absolute top-[50px] w-full mx-auto flex justify-center hidden opacity-[0] z-50"
              id="alert-error"
            >
              <Alert
                type={"error"}
                msg={"Nomer HP atau Email anda sudah terdaftar"}
              />
            </div>
          </div>
          <a
            href="https://siresto.awandigital.id"
            rel="noopener noreferrer"
            target="_blank"
            className="block text-center mb-6"
          >
            <img
              src={SiResto}
              alt=""
              className="w-24 mx-auto"
              style={{ marginTop: "12rem", display: "block" }}
            />
          </a>
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold">Registrasi</h3>
            <p>Terima kasih telah bergabung dengan SiResto</p>
          </div>

          <div className="mb-5">
            <label htmlFor="nama" className="block">
              Nama
            </label>
            <div className="relative">
              <input
                type="text"
                id="nama"
                className="input input-bordered w-full"
                placeholder="Masukkan Nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
          </div>

          {/* <div className="mb-5">
            <label htmlFor="username" className="block">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                className="input input-bordered w-full"
                placeholder="Masukkan Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div> */}

          <div className="mb-5">
            <label htmlFor="no_whatsapp" className="block">
              Nomor WhatsApp
            </label>
            <div className="relative">
              <input
                type="number"
                id="no_whatsapp"
                className="input input-bordered w-full"
                placeholder="Masukkan No. WhatsApp 08*"
                value={nomerWhatsapp}
                onChange={(e) => setNomerWhatsapp(e.target.value)}
                onWheel={(event) => event.currentTarget.blur()}
              />
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                className="input input-bordered w-full"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                id="password"
                className="input input-bordered w-full"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="konfirmasi_password" className="block">
              Konfirmasi Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="konfirmasi_password"
                id="konfirmasi_password"
                className="input input-bordered w-full"
                placeholder="Masukkan Konfirmasi Password"
                value={konfirmasiPassword}
                onChange={(e) => setKonfirmasiPassword(e.target.value)}
              />
              {!check && (
                <MessageError>
                  Password dan Konfirmasi Password harus sama
                </MessageError>
              )}
            </div>
          </div>
          <div className="mt-6">
            <Button
              type="button"
              title="Registrasi"
              className="w-full bg-blue-500 border-0 hover:bg-blue-400 mb-2"
              disabled={
                nama == "" ||
                !check ||
                nomerWhatsapp === "" ||
                email === "" ||
                password === "" ||
                konfirmasiPassword === ""
              }
              onClick={sendOtp.bind(this)}
            />

            <div className="my-2">
              <p>
                Sudah punya akun?
                <Link to="/pesan-online/login" className="text-[#4c98dc] ml-1">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
