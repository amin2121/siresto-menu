import React, { useEffect } from "react";
import ItemProductHorizontal from "../../components/ItemProductHorizontal";
import KeranjangKosong from "../../layouts/KeranjangKosong";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { swNormal } from "../../utils/sw";
import axios from "../../utils/axios";
import { useQuery } from "react-query";
import { Button } from "../../components/Button";
import { rupiah } from "../../utils/strings";
import { hapusProduk, hapusSemuaProduk } from "../../features/produkSlice";
import { warnaKeranjang } from "../../features/warnaKeranjangSlice";

export default function Keranjang() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const keranjang = useSelector((state) => state.produk.produkKeranjang);
  let no_transaksi =
    sessionStorage.getItem("no_transaksi") === null
      ? 0
      : sessionStorage.getItem("no_transaksi");
  const noTelepon =
    localStorage.getItem("noTelepon") == "null" ||
    localStorage.getItem("noTelepon") == undefined
      ? "Kosong"
      : localStorage.getItem("noTelepon");
  const namaPelanggan =
    localStorage.getItem("namaPelanggan") == "null" ||
    localStorage.getItem("namaPelanggan") == undefined
      ? "Kosong"
      : localStorage.getItem("namaPelanggan");
  const meja = sessionStorage.getItem("meja");
  const source = sessionStorage.getItem("source");
  const branch = sessionStorage.getItem("branch");
  const promo = JSON.parse(sessionStorage.getItem("promo"));

  // react query
  const { data } = useQuery(["data-setting"], () => fetchSetting(), {
    staleTime: 15000,
    refetchInterval: 60000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  let subtotal =
    keranjang !== null &&
    keranjang.reduce(
      (accumulator, item) => accumulator + item.harga_jual * item.jumlah,
      0
    );
  let serviceCharge =
    data?.status_charge_service === 1 && no_transaksi === 0
      ? data?.charge_service
      : 0;
  let pajak =
    data?.status_pajak === 1 && no_transaksi === 0
      ? (data?.pajak * subtotal) / 100
      : 0;
  let pajakPersen =
    data?.status_pajak === 1 && no_transaksi === 0 ? data?.pajak : 0;

  let diskon =
    keranjang !== null &&
    keranjang.reduce((accumulator, item) => accumulator + item.diskon, 0);
  let labaTotal =
    keranjang !== null &&
    keranjang.reduce((accumulator, item) => accumulator + item.laba, 0) -
      diskon;
  let totalSemua = subtotal - diskon;

  labaTotal = labaTotal - diskon - (promo ? parseFloat(promo.promo) : 0);
  totalSemua =
    parseFloat(subtotal) +
    parseFloat(pajak) +
    parseFloat(serviceCharge) -
    parseFloat(diskon) -
    (promo ? parseFloat(promo.promo) : 0);

  const layoutProduk = (item, index) => (
    <ItemProductHorizontal
      key={index}
      id={item.id}
      gambar={item.gambar}
      judul={item.nama_produk}
      harga_jual={item.harga_jual}
      jumlah={item.jumlah}
      onDelete={() => dispatch(hapusProduk({ id: item.id }))}
    />
  );

  useEffect(() => {
    dispatch(warnaKeranjang("bg-slate-200"));

    return () => {
      dispatch(warnaKeranjang("bg-white"));
    };
  }, []);

  const fetchSetting = async () => {
    let resto = sessionStorage.getItem("branch");
    const response = await axios.get(`resto/setting-resto?resto=${resto}`);
    const res = response.data.data;

    return res;
  };

  const nomorTransaksiArr = no_transaksi === 0 ? 0 : no_transaksi.split(",");
  const lastTransaksi = nomorTransaksiArr === 0 ? 0 : nomorTransaksiArr.pop();

  const mutation = useMutation(
    async () => {
      let produk = keranjang;

      let dataForm = {
        no_transaksi: no_transaksi === 0 ? no_transaksi : lastTransaksi,
        produk: produk,
        total: totalSemua,
        diskon: diskon + (promo ? parseFloat(promo.promo) : 0),
        no_telepon: noTelepon,
        nama_pelanggan: namaPelanggan,
        nilai_laba: labaTotal,
        pajak: pajak,
        service_charge: serviceCharge,
        pajak_persen: pajakPersen,
        subtotal: subtotal,
        source: source,
        meja: meja,
        branch: branch,
      };

      const response = await axios.post(
        "menu/simpan-order-pelanggan",
        dataForm
      );
      const res = response.data;

      if (res.meta.code !== 200) {
        throw new Error(res.meta.message);
      }

      return res.data;
    },
    {
      onMutate: () => {
        // spinner
        // setIsAction(!isAction)
      },
      onSettled: async (data, error) => {
        // setIsAction(!isAction)
        if (data) {
          dispatch(hapusSemuaProduk());
          navigate("/pesanan");

          let noTransaksi = sessionStorage.getItem("no_transaksi");

          if (noTransaksi === null) {
            sessionStorage.setItem("no_transaksi", data.no_transaksi);
          } else if (lastTransaksi != data.no_transaksi) {
            noTransaksi = `${noTransaksi},${data.no_transaksi}`;
            sessionStorage.setItem("no_transaksi", noTransaksi);
          }
        }

        if (error) {
        }
      },
      onSuccess: async () => {
        swNormal("Berhasil", "Order Berhasil Disimpan", "success");
      },
      onError: async () => {
        swNormal("Gagal", "Order Gagal Disimpan", "error");
      },
    }
  );

  const simpanOrder = async () => {
    if (noTelepon == "Kosong" && namaPelanggan == "Kosong") {
      navigate("/nomor-telepon");
    } else {
      await mutation.mutate();
    }
  };

  return (
    <>
      <div className="flex justify-start items-center bg-white px-4 py-2">
        <HiOutlineChevronLeft
          size="20"
          className="cursor-pointer"
          onClick={() => navigate("/")}
        />
        <h5 className="font-bold text-md text-center flex-1">Keranjang</h5>
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div className="w-full mt-4 space-y-3 px-4 overflow-y-auto h-[30rem] scrollbar-hide">
          {keranjang.length > 0 ? (
            keranjang?.map((item, index) => layoutProduk(item, index))
          ) : (
            <KeranjangKosong />
          )}
        </div>

        {keranjang.length > 0 ? (
          <div className="bg-white w-full px-6 pt-8 pb-8 text-xs fixed lg:w-1/3 rounded-t-[30px] drop-shadow-2xl bottom-0">
            <button
              type="button"
              className="btn gap-3flex items-center justify-between w-full bg-blue-400 border-0 hover:bg-blue-700 text-xs mb-5"
              onClick={() => navigate("/promo")}
            >
              {promo ? (
                <span className="flex items-center">
                  {promo.judul_promo} (IDR {rupiah(promo.promo)})
                </span>
              ) : (
                <span className="flex items-center">Pilih Promo</span>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div className="flex justify-between mb-2">
              <span className="font-semibold">Total</span>
              <span className="font-semibold text-blue-400">
                IDR {rupiah(subtotal)}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Diskon + Promo</span>
              <span className="font-semibold text-blue-400">
                - IDR {rupiah(diskon + (promo ? parseFloat(promo.promo) : 0))}
              </span>
            </div>
            {data?.status_pajak === 1 && no_transaksi === 0 ? (
              <div className="flex justify-between mb-2">
                <span className="font-bold">Pajak ({data?.pajak}%)</span>
                <span className="font-bold text-blue-400">
                  IDR {rupiah(pajak)}
                </span>
              </div>
            ) : (
              ""
            )}
            {data?.status_charge_service === 1 && no_transaksi === 0 ? (
              <div className="flex justify-between mb-2">
                <span className="font-bold">Service Charge</span>
                <span className="font-bold text-blue-400">
                  IDR {rupiah(serviceCharge)}
                </span>
              </div>
            ) : (
              ""
            )}
            <hr className="mt-2 mb-2 bg-slate-400" />
            <div className="flex justify-between text-sm mb-4">
              <span className="font-bold">Subtotal</span>
              <span className="font-bold text-blue-500">
                IDR {rupiah(totalSemua)}
              </span>
            </div>
            <Button
              title="Pilih Menu Lain"
              type="button"
              className="w-full mb-2 bg-white text-blue-500 border-blue-500 border hover:bg-blue-700 hover:border-blue-700 hover:text-white text-xs"
              onClick={() => navigate("/")}
            />
            <Button
              title={
                noTelepon == "Kosong" && namaPelanggan == "Kosong"
                  ? "Lanjutkan"
                  : "Order Sekarang"
              }
              type="button"
              className="w-full bg-blue-500 border-0 hover:bg-blue-700 text-xs"
              onClick={simpanOrder}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
