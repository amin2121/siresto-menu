import React, { useEffect, useState } from "react";
import SiResto from "../../assets/logo/SiResto.png";
import axios from "../../utils/axios";
import Alert from "../../components/auth/Alert";
import { MessageError } from "../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    axios
      .post(process.env.REACT_APP_BACKEND_DOMAIN + "api/user-guest-available", {
        email: email,
      })
      .then(() => {
        axios
          .post("menu/login", { email: email, password: password })
          .then((response) => {
            const res = response.data.data;
            if (response.status === 200) {
              localStorage.setItem("namaPelanggan", res.nama);
              localStorage.setItem("noTelepon", res.no_hp);
              localStorage.setItem("email", res.email);
              localStorage.setItem("username", res.username);
              console.log(res.alamat_1 === null);
              if (res.alamat_1 !== null) {
                localStorage.setItem("alamat", res.alamat_1);
              }
              navigate("/home");
            }
          })
          .catch((error) => {
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
              className="absolute top-[50px] w-full mx-auto flex justify-center hidden opacity-[0] z-50"
              id="alert"
            >
              <Alert type={"error"} msg={"Email atau Password anda salah"} />
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
            <h3 className="text-xl font-semibold">Login</h3>
            <p>Terima kasih telah bergabung dengan SiResto</p>
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

          <div className="mt-6">
            <Button
              type="button"
              title="Login"
              className="w-full bg-blue-500 border-0 hover:bg-blue-400 mb-2"
              disabled={email === "" || password === ""}
              onClick={login.bind(this)}
            />
            {/* <button
              className="btn w-full"
              disabled={email === "" || password === ""}
              onClick={login.bind(this)}
            >
              Login
            </button> */}
            <div className="my-2">
              <p>
                Belum punya akun?
                <Link to="/pesan-online/register" className="text-[#4c98dc]">
                  Daftar Sekarang
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
