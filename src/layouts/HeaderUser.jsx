import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { settingNoMeja } from "../features/nomejaSlice";
import { settingSource } from "../features/sourceSlice";
import axios from "../utils/axios";
import Logo from "../assets/logo/SiResto.png";

import { IoCartOutline, IoBagHandleOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import profile from "../assets/users/blank-profile.webp";
import DropdownHeader from "../components/DropdownHeader";

function HeaderUser() {
  const { no_meja } = useSelector((state) => state.nomeja);
  const { source } = useSelector((state) => state.source);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const keranjang = JSON.parse(sessionStorage.getItem("produkKeranjang"));
  const pesanan = sessionStorage.getItem("no_transaksi");
  const nama = localStorage.getItem("namaPelanggan");
  const [isOpen, setIsOpen] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (
      searchParams.get("source") != null &&
      searchParams.get("source") === "qrcode"
    ) {
      sessionStorage.setItem("source", searchParams.get("source"));
      sessionStorage.setItem("branch", searchParams.get("branch"));
      sessionStorage.setItem("meja", searchParams.get("meja"));
    } else if (
      searchParams.get("source") != null &&
      searchParams.get("source") === "webonline"
    ) {
      localStorage.setItem("source", searchParams.get("source"));
      localStorage.setItem("branch", searchParams.get("branch"));
    }

    dispatch(
      settingNoMeja(
        sessionStorage.getItem("meja") == null
          ? searchParams.get("meja")
          : sessionStorage.getItem("meja")
      )
    );

    let source;

    if (
      sessionStorage.getItem("source") === "qrcode" ||
      searchParams.get("source") === "qrcode"
    ) {
      source = sessionStorage.getItem("source") || searchParams.get("source");
    } else if (
      sessionStorage.getItem("source") === "webonline" ||
      searchParams.get("source") === "webonline"
    ) {
      source = localStorage.getItem("source") || searchParams.get("source");
    }

    dispatch(settingSource(source));
  }, []);

  return (
    <>
      <div className="header-user px-4 py-2 flex justify-between bg-white">
        <div className="header-user__logo flex justify-start items-center">
          <img src={Logo} alt={Logo} className="w-24" />
        </div>
        <div className="header-user__setting flex justify-evenly items-center space-x-8">
          <span className="header-user__nouser">
            {source === "qrcode" && `#${no_meja}`}
          </span>
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/pesanan")}
          >
            {/* <span className="w-3 h-3 text-xs rounded-full absolute inline-flex -top-1 -right-1 bg-blue-400">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex justify-center items-center rounded-full h-3 w-3 bg-blue-500 text-white text-[10px]">
                {pesanan?.length}
              </span>
            </span> */}
            <IoBagHandleOutline size="24" />
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/keranjang")}
          >
            {keranjang?.length !== 0 && (
              <span className="w-3 h-3 text-xs rounded-full absolute inline-flex -top-1 -right-1 bg-blue-400">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex justify-center items-center rounded-full h-3 w-3 bg-blue-500 text-white text-[10px]">
                  {keranjang?.length}
                </span>
              </span>
            )}
            <IoCartOutline size="24" />
          </div>
          {source === "webonline" && (
            <>
              <DropdownHeader profile={profile} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default HeaderUser;
