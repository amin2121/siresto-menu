import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "../../utils/axios";
import { baseUrl, rupiah } from "../../utils/strings";
import { Link, useNavigate } from "react-router-dom";

// icons
import { BiArrowBack } from "react-icons/bi";
import { Button } from "../../components/Button";

export default function PilihPromo() {
  const navigate = useNavigate();
  const promo = JSON.parse(sessionStorage.getItem("promo"));
  const [idPromo, setIdPromo] = useState(promo ? promo.id : "");

  const handlePromoChange = (e) => {
    setIdPromo(e.target.value);
  };

  const {
    isLoading,
    isError,
    error,
    data,
    isSuccess,
    isFetching,
    refetch,
    isPreviousData,
  } = useQuery(["data-promo"], () => fetchData(), {
    staleTime: 15000,
    refetchInterval: 15000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const fetchData = async () => {
    const branch =
      sessionStorage.getItem("branch") != null
        ? sessionStorage.getItem("branch")
        : localStorage.getItem("branch");
    const response = await axios.get(`promo/menu?resto=${branch}`);
    const res = await response.data;
    const data = res.data;

    return data;
  };

  const selectedPromo = data?.find((obj) => obj.id == idPromo);

  function simpanPromo() {
    sessionStorage.setItem(
      "promo",
      JSON.stringify({
        id: selectedPromo.id,
        judul_promo: selectedPromo.judul_promo,
        tanggal_awal_promo: selectedPromo.tanggal_awal_promo,
        periode_promo: selectedPromo.periode_promo,
        promo: selectedPromo.promo,
      })
    );
    navigate("/keranjang");
  }

  return (
    <>
      <div className="px-4 flex flex-col flex-1 mt-4">
        <Link to="/keranjang">
          <BiArrowBack size="20" className="text-blue-500 mb-4" />
        </Link>
        <div className="mb-6">
          <h3 className="font-bold mb-1">Pilih Promo</h3>
          <p className="text-xs">
            Pilih promo di pilihan yang tersedia dibawah ini!
          </p>
        </div>
        {data?.map((obj, key) => (
          <div className="w-full my-3" key={key}>
            <div className="relative">
              <input
                type="radio"
                name="promo"
                id={obj.id}
                value={obj.id}
                className="hidden peer"
                onChange={handlePromoChange}
                checked={idPromo == obj.id}
              />
              <label
                for={obj.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 bg-opacity-90 backdrop-blur-2xl shadow-xl hover:bg-opacity-75 peer-checked:bg-blue-500 peer-checked:text-white cursor-pointer transition"
              >
                <img
                  src={baseUrl + obj.gambar}
                  alt="Produk"
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div>
                  <h6 className="text-base font-bold">{obj.judul_promo}</h6>
                  <span className="text-sm block">
                    Deskripsi Promo : {obj.deskripsi_promo}
                  </span>
                  <span className="text-sm">IDR {rupiah(obj.promo)}</span>
                </div>
              </label>
              <div className="flex absolute top-0 right-4 bottom-0 w-7 h-7 my-auto rounded-full bg-blue-400 scale-0 peer-checked:scale-100 transition delay-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-5 text-white my-auto mx-auto"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
        <div className="w-full px-4 absolute bottom-10 left-0">
          <Button
            title="Pilih"
            type="button"
            className="w-full bg-blue-500 border-0 hover:bg-blue-700 text-xs"
            onClick={simpanPromo}
          />
        </div>
      </div>
    </>
  );
}
