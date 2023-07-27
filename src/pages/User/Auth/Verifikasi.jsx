import React, { useEffect, useState } from "react";
import SiResto from "../../../assets/logo/SiResto.png";
import OtpInput from "../../../components/OtpInput";
import axios from "../../../utils/axios";
import Alert from "../../../components/auth/Alert";
import { useNavigate } from "react-router";
import { Button } from "../../../components/Button";

const Verifikasi = () => {
  const navigate = useNavigate();
  const [otpValue, setOtpValue] = useState("");
  const [isKirimKodeClicked, setIsKirimKodeClicked] = useState(0);
  const [isKirimKodeDisabled, setIsKirimKodeDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const user = JSON.parse(localStorage.getItem("userMenu"));
  const nama = user?.nama;
  const username = user?.username;
  const email = user?.email;
  const nomerWhatsapp = user?.nomerWhatsapp;
  const password = user?.password;

  const numberCount = otpValue.replace(/\D/g, "").length;

  const handleOtpChange = (otp) => {
    setOtpValue(otp);
  };

  const handleKirimKodeClick = () => {
    setIsKirimKodeClicked(isKirimKodeClicked + 1);
    setIsKirimKodeDisabled(true);
    sendOtp();

    setTimeout(() => {
      setIsKirimKodeDisabled(false);
    }, 60 * 1000);
  };

  function sendOtp() {
    axios
      .post("sendotp", { phone_number: nomerWhatsapp })
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
        var alert = document.getElementById("pesan-error");
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

  function verifikasiOtp() {
    axios
      .post("cekotp", {
        kode_otp: otpValue,
        nama: nama,
        username: username,
        email: email,
        no_whatsapp: nomerWhatsapp,
        password: password,
      })
      .then((response) => {
        var alert = document.getElementById("alert-success-otp");
        alert.classList.toggle("hidden");
        alert.classList.toggle("opacity-[0]");

        setTimeout(() => {
          alert.classList.toggle("opacity-[0]");
        }, 2000);

        setTimeout(() => {
          alert.classList.toggle("hidden");
        }, 2500);

        localStorage.removeItem("userMenu");
        navigate("/pesan-online/login");
      })
      .catch((error) => {
        var alert = document.getElementById("pesan-error");
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

  useEffect(() => {
    let intervalId = null;

    if (isKirimKodeClicked) {
      setRemainingTime(60);
      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isKirimKodeClicked]);

  useEffect(() => {
    if (remainingTime === 0) {
      setIsKirimKodeClicked(false);
    }
  }, [remainingTime]);

  return (
    <div className="flex justify-center items-center h-screen overflow-y-auto">
      <div className="max-w-lg w-full px-4">
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
              id="alert-success-otp"
            >
              <Alert
                type={"success"}
                msg={"Nomor anda berhasil di verifikasi."}
              />
            </div>
            <div
              className="absolute top-[50px] w-full mx-auto flex justify-center hidden opacity-[0] z-50"
              id="alert-error"
            >
              <Alert
                type={"error"}
                msg={"Kode Otp yang anda masukkan salah atau kadaluarsa."}
              />
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
            <h3 className="text-xl font-semibold">Verifikasi Kode Otp</h3>
            <p>Terima kasih telah bergabung dengan SiResto</p>
          </div>
          <div className="mx-auto my-6">
            <label htmlFor="otp" className="block mb-2">
              Kode Verifikasi
            </label>
            <div className="relative mb-4">
              <OtpInput length={6} onChange={handleOtpChange} />
            </div>
            <div className="flex justify-center mb-3">
              <Button
                type="button"
                title="Kirim Kode"
                className="bg-blue-500 border-0 hover:bg-blue-400 mb-2 btn-sm"
                onClick={handleKirimKodeClick}
                disabled={isKirimKodeDisabled}
              />
            </div>
            <p className="text-sm text-gray-500">
              Harap masukkan kode verifikasi yang telah dikirim ke nomor
              WhatsApp Anda
            </p>
          </div>
          <div className="mt-6">
            <Button
              type="button"
              title="Verifikasi"
              className="w-full bg-blue-500 border-0 hover:bg-blue-400 mb-2"
              disabled={numberCount !== 6}
              onClick={verifikasiOtp.bind(this)}
            />
            {/* <button
              className="btn w-full"
              disabled={numberCount !== 6}
              onClick={verifikasiOtp.bind(this)}
            >
              Verifikasi
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verifikasi;
