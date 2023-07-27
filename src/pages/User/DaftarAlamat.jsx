import React, { useState, useEffect } from "react";
import { InputUserWithIcon } from "../../components/InputUser";
import { MessageError } from "../../components/Input";
import { Button } from "../../components/Button";
import { useLocation } from "react-router-dom";
import Alert from "../../components/auth/Alert";
import axios from "../../utils/axios";

// icons
import { BiArrowBack } from "react-icons/bi";
import { FiHome } from "react-icons/fi";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function DaftarAlamat() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const email = localStorage.getItem("email");
  const [alamat, setAlamat] = useState("kosong");

  function ubahProfile() {
    if (alamat == null || alamat == "") {
      setAlamat("");
    } else {
      axios
        .put(
          process.env.REACT_APP_BACKEND_DOMAIN + "api/user-guest/update-alamat",
          {
            email: email,
            alamat: alamat,
          }
        )
        .then(() => {
          axios
            .put("menu/user-guest/update-alamat", {
              email: email,
              alamat: alamat,
            })
            .then((response) => {
              const res = response.data.data;
              if (response.status === 200) {
                localStorage.setItem("alamat", alamat);
                navigate("/keranjang");
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
  }

  return (
    <>
      <div className="px-4 flex flex-col flex-1 mt-4">
        <Link to="/keranjang">
          <BiArrowBack size="20" className="text-blue-500 mb-4" />
        </Link>
        <div className="flex items-center justify-center">
          <div
            className="absolute top-[50px] w-full mx-auto flex justify-center hidden opacity-[0] z-50"
            id="alert"
          >
            <Alert type={"error"} msg={"Alamat Gagal Ditambahkan"} />
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-bold mb-1">Masukkan Alamat</h3>
          <p className="text-xs">
            Masukkan Alamat agar kami bisa menghubungi Anda.
          </p>
        </div>
        <div className="mb-24">
          <InputUserWithIcon
            title="Alamat"
            directionIcon="left"
            type="text"
            icon={<FiHome size="20" />}
            name="alamat"
            id="input-alamat"
            onChange={(e) => setAlamat(e.target.value)}
            error={alamat == "" ? true : false}
          />
          {alamat == "" ? (
            <MessageError>Alamat Tidak Boleh Kosong</MessageError>
          ) : (
            ""
          )}
        </div>
        <div className="w-full px-4 absolute bottom-10 left-0">
          <Button
            type="button"
            title="Lanjutkan"
            className="w-full bg-blue-500 border-0 hover:bg-blue-400 mb-2"
            onClick={ubahProfile.bind(this)}
          />
        </div>
      </div>
    </>
  );
}
