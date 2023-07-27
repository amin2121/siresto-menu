import React, { useEffect, useState } from "react";
import SiResto from "../../../assets/logo/SiResto.png";
import axios from "../../../utils/axios";
import Alert from "../../../components/auth/Alert";
import { useNavigate } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../../../components/Button";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Periksa kembali data anda.");
  const [type, setType] = useState("error");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setConfirmationPassword] = useState("");
  const email = searchParams.get("email");

  function reset() {
    axios
      .post(
        process.env.REACT_APP_BACKEND_DOMAIN + "api/user-guest/reset-password",
        {
          email,
          password,
        }
      )
      .then((response) => {
        axios
          .post("menu/reset-password", { email, password })
          .then((response) => {
            setType("success");
            setMessage("Berhasil mengganti password anda");

            var alert = document.getElementById("alert");
            alert.classList.toggle("hidden");
            alert.classList.toggle("opacity-[0]");

            setTimeout(() => {
              alert.classList.toggle("opacity-[0]");
            }, 2000);

            setTimeout(() => {
              alert.classList.toggle("hidden");
              window.location = "/pesan-online/login";
            }, 2500);
          })
          .catch((error) => {
            setType("error");
            setMessage("Silahkan periksa kembali password anda");
            var alert = document.getElementById("alert");
            alert.classList.toggle("hidden");
            alert.classList.toggle("opacity-[0]");

            setTimeout(() => {
              alert.classList.toggle("opacity-[0]");
            }, 2000);

            setTimeout(() => {
              alert.classList.toggle("hidden");
            }, 2500);
          });
      })
      .catch((error) => {
        setType("error");
        setMessage("Silahkan periksa kembali password anda");
        var alert = document.getElementById("alert");
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
    <div className="flex justify-center items-center overflow-y-auto">
      <div className="max-w-lg w-full px-auto">
        <div className="bg-white rounded-lg shadow-lg px-8 py-6">
          <div className="flex items-center justify-center">
            <div
              className="absolute top-[50px] w-full mx-auto flex justify-center hidden opacity-[0]"
              id="alert"
            >
              <Alert type={type} msg={message} />
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
              style={{ marginTop: "5rem", display: "block" }}
            />
          </a>
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold">Password Baru Anda</h3>
            <p>Kami bantu pulihkan akunmu kembali</p>
          </div>
          <div className="mb-5">
            <div className="mb-[31px]">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Masukan Password"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="password">Konfirmasi Password</label>
            <div className="relative">
              <input
                type="password"
                id="konfirmasiPassword"
                value={passwordConfirmation}
                onChange={(e) => setConfirmationPassword(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Ketik Ulang Password"
              />
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="forgot-password md:block ml-auto">
              <Link to="/pesan-online/forgot-password" className="/">
                Lupa Password?
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <Button
              type="button"
              title="Lanjutkan"
              className="w-full bg-blue-500 border-0 hover:bg-blue-400 mb-2"
              onClick={reset.bind(this)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
