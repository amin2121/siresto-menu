import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../layouts/HeaderUser";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/logo/SiResto.png";

const Container = () => {
  const { warna } = useSelector((state) => state.warnaKeranjang);
  const { no_meja } = useSelector((state) => state.nomeja);

  if (no_meja === null) {
    return (
      <>
        <div class="min-h-screen flex items-center justify-center">
          <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-lg mx-auto text-center">
              <a href="https://awandigital.id" rel="noopener noreferrer">
                <img src={Logo} alt={Logo} className="w-40" />
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className={`sm:w-full relative lg:w-1/3 h-screen mx-auto flex flex-col ${warna}`}
      >
        <Header />
        <Outlet />
        <ToastContainer
          position="bottom-center"
          autoClose={1500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
        />
      </div>
    </>
  );
};

export default Container;
