import React, { useState, useEffect } from "react";
import { InputUserWithIcon } from "../../components/InputUser";
import axios from "../../utils/axios";
import { MessageError } from "../../components/Input";
import { Button } from "../../components/Button";
import { useLocation } from "react-router-dom";
import Alert from "../../components/auth/Alert";

// icons
import { BiArrowBack } from "react-icons/bi";
import { FiHome, FiMail, FiPhone, FiUser, FiUserCheck } from "react-icons/fi";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");
  const [nama, setNama] = useState(localStorage.getItem("namaPelanggan"));
  const [nomer, setNomer] = useState(localStorage.getItem("noTelepon"));
  const [alamat, setAlamat] = useState(localStorage.getItem("alamat"));

  function settingLocalStorage() {
    if (alamat == null || alamat == "") {
      setAlamat("");
    } else {
      localStorage.setItem("namaPelanggan", nama);
      localStorage.setItem("noTelepon", nomer);
      localStorage.setItem("alamat", alamat);
      navigate("/keranjang");
    }
  }

  function ubahProfile() {
    axios
      .put(process.env.REACT_APP_BACKEND_DOMAIN + "api/user-guest/update", {
        email: email,
        nama: nama,
        no_hp: nomer,
        alamat: alamat,
      })
      .then(() => {
        axios
          .put("menu/user-guest/update", {
            email: email,
            nama: nama,
            no_hp: nomer,
            alamat: alamat,
          })
          .then((response) => {
            const res = response.data.data;
            if (response.status === 200) {
              var alert = document.getElementById("alert-success");
              alert.classList.toggle("hidden");
              alert.classList.toggle("opacity-[0]");

              setTimeout(() => {
                alert.classList.toggle("opacity-[0]");
              }, 2000);

              setTimeout(() => {
                alert.classList.toggle("hidden");
              }, 2500);

              localStorage.setItem("namaPelanggan", nama);
              localStorage.setItem("noTelepon", nomer);
              localStorage.setItem("alamat", alamat);
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
    <>
      <div className="px-4 flex flex-col flex-1 mt-4">
        <Link to="/home">
          <BiArrowBack size="20" className="text-blue-500 mb-4" />
        </Link>
        <div className="flex items-center justify-center">
          <div
            className="absolute top-[50px] w-full mx-auto flex justify-center hidden opacity-[0] z-50"
            id="alert-success"
          >
            <Alert type={"success"} msg={"Profile Berhasil Diubah"} />
          </div>
          <div
            className="absolute top-[50px] w-full mx-auto flex justify-center hidden opacity-[0] z-50"
            id="alert"
          >
            <Alert type={"error"} msg={"Profile Gagal Diubah"} />
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-bold mb-1 text-lg">Profile</h3>
          <p className="text-sm text-gray-500">Berikut adalah profil Anda</p>
        </div>
        <div className="mb-10">
          <div className="my-4">
            <InputUserWithIcon
              title="Email"
              directionIcon="left"
              type="text"
              icon={<FiMail size="20" />}
              name="email"
              id="input-email"
              value={email}
              placeholder="Email"
              disabled
            />
          </div>
          <div className="my-4">
            <InputUserWithIcon
              title="Username"
              directionIcon="left"
              type="text"
              icon={<FiUserCheck size="20" />}
              name="username"
              id="input-username"
              value={username}
              placeholder="Username"
              disabled
            />
          </div>
          <div className="my-4">
            <InputUserWithIcon
              title="Nama"
              directionIcon="left"
              type="text"
              icon={<FiUser size="20" />}
              name="nama"
              id="input-nama"
              value={nama}
              placeholder="Nama"
              onChange={(e) => setNama(e.target.value)}
              error={nama === ""}
            />
            {nama === "" && (
              <MessageError>Nama tidak boleh kosong</MessageError>
            )}
          </div>
          <div className="my-4">
            <InputUserWithIcon
              title="Nomer HP"
              directionIcon="left"
              type="number"
              icon={<FiPhone size="20" />}
              name="nomer"
              id="input-nomer"
              value={nomer}
              placeholder="Nomer HP"
              onChange={(e) => setNomer(e.target.value)}
              error={nomer === ""}
            />
            {nomer === "" && (
              <MessageError>Nomer HP tidak boleh kosong</MessageError>
            )}
          </div>
          <div className="my-4">
            <InputUserWithIcon
              title="Alamat"
              directionIcon="left"
              type="text"
              icon={<FiHome size="20" />}
              name="alamat"
              id="input-alamat"
              value={alamat}
              placeholder="Alamat"
              onChange={(e) => setAlamat(e.target.value)}
              error={alamat === ""}
            />
            {alamat === "" && (
              <MessageError>Alamat tidak boleh kosong</MessageError>
            )}
          </div>
        </div>
        <div className="w-full">
          <Button
            type="button"
            title="Simpan"
            className="w-full bg-blue-500 border-0 hover:bg-blue-400 mb-2"
            disabled={!nama || !nomer || !alamat}
            onClick={ubahProfile.bind(this)}
          />
        </div>
      </div>
    </>
  );
}
