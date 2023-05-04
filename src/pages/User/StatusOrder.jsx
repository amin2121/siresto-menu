import React, { useState } from 'react'
import { HiOutlineChevronLeft } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import axios from '../../utils/axios'
import { Button } from '../../components/Button'
import { useQuery } from 'react-query'
import { TiWarningOutline } from 'react-icons/ti'
import { BsCheckCircle } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import LoadingPage from '../../components/LoadingPage'
import { rupiah, baseUrl } from '../../utils/strings'
import moment from 'moment'

export default function StatusOrder() {
  moment.locale('id');
  const navigate = useNavigate()

  // react query
  const {
    isLoading,
    data,
  } = useQuery(["data-order"], () => fetchData(), {
    staleTime: 15000, 
    refetchInterval: 15000, 
    keepPreviousData: true,
    refetchOnWindowFocus: false
  })

  const fetchData = async () => {
    let branch = localStorage.getItem('branch')
    let no_transaksi = localStorage.getItem('no_transaksi')

    const response = await axios.get(`menu/cari-order-transaksi?branch=${branch}&no_transaksi=${no_transaksi}`)
    const res = response.data
    const order = res.data

    return order
  }

  const pilihWarnaStatusOrder = (status) => {
    switch(status) {
      case 'open' :
        return 'bg-blue-400'
      break;
      case 'in_progress' :
        return 'bg-yellow-400'
      break;
      case 'served' :
        return 'bg-green-400'
      break;
      case 'closed' :
        return 'bg-red-400'
      break;
    }
  }

  function warnaAlert(alur_pembayaran, status_pembayaran) {
    if(alur_pembayaran === 'bayar_langsung' && status_pembayaran === 'already_paid') {
      return 'bg-blue-300 text-white'
    } else if(alur_pembayaran === 'bayar_langsung' && status_pembayaran === 'not_paid') {
      return 'bg-yellow-300 text-slate-700'
    } else if(alur_pembayaran === 'bayar_nanti' || 'status_pembayaran' === 'not_paid') {
      return 'bg-blue-300 text-white'
    }
  }

  function pesanAlert (alur_pembayaran, status_pembayaran) {
    if(alur_pembayaran === 'bayar_langsung' && status_pembayaran === 'already_paid') {
      return 'Silahkan Tunggu Makanan yang Anda Pesan'
    } else if(alur_pembayaran === 'bayar_langsung' && status_pembayaran === 'not_paid') {
      return 'Perhatian: Lakukan Pembayaran Terlebih Dahulu ke Kasir'
    } else if(alur_pembayaran === 'bayar_nanti' || 'status_pembayaran' === 'not_paid') {
      return 'Silahkan Tunggu Makanan yang Anda Pesan'
    }
  }

  function iconAlert(alur_pembayaran, status_pembayaran) {
    if(alur_pembayaran === 'bayar_langsung' && status_pembayaran === 'already_paid') {
      return <BsCheckCircle size="30"/>
    } else if(alur_pembayaran === 'bayar_langsung' && status_pembayaran === 'not_paid') {
      return <TiWarningOutline size="30"/>
    } else if(alur_pembayaran === 'bayar_nanti' || 'status_pembayaran' === 'not_paid') {
      return <BsCheckCircle size="30"/>
    }
  }

  const layoutProduk = (item, index) => (
    <div className="order__products" key={index}>
      <div className="order__item p-3 flex bg-white">
        <img src={baseUrl + item.produk.gambar} alt="Produk Image" className="h-16 w-16 object-cover rounded-lg"/>
        <div className='ml-4 flex-1'>
          <div className="mb-2">
            <h5 className='text-sm font-semibold tracking-wide'>{item.produk.nama_produk}</h5>
            <span className="text-xs text-slate-300">{item.produk.kategori_produk.kategori_produk}</span>
          </div>
          <div className='mb-1 flex justify-between items-center'>
              <span className='inline-block mr-1 text-sm font-semibold text-blue-500'>IDR {rupiah(item.total_harga_jual)}</span>
              <p className='text-sm text-slate-400'>x{item.jumlah_beli}</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className='px-4 flex-1 flex flex-col'>
        <div className='flex justify-start items-center'>
          <HiOutlineChevronLeft size="20" className="cursor-pointer" onClick={() => navigate('/')}/>
          <h5 className="font-bold text-lg text-center flex-1">Pesanan</h5>
        </div>

        <div className="flex-1 flex flex-col mt-4">
          {
            isLoading
            ? <div className="col-span-2 flex flex-1 justify-center items-center flex-col space-y-3"><LoadingPage /></div> 
            : <div className='order__container w-full space-y-4 mb-32'>
                <div class={`alert ${warnaAlert(data.setting.alur_pembayaran_konsumen, data.order.status_bayar)} shadow-lg`}>
                  <div>
                    {iconAlert(data.setting.alur_pembayaran_konsumen, data.order.status_bayar)}
                    <span>{pesanAlert(data.setting.alur_pembayaran_konsumen, data.order.status_bayar)}</span>
                  </div>
                </div>
                <div>
                  <div className="order__content">
                      <div>
                          <div className={`order__status text-xs py-2 ${pilihWarnaStatusOrder(data.order.status_order)} font-semibold px-4 text-white flex justify-between items-center rounded-t-md`}>
                            <span>{data.order.no_transaksi}</span>
                            <span>{data.order.status_order.replace('_', ' ').toUpperCase()}</span>
                          </div>
                          {data.order.order_detail.map((item, index) => (layoutProduk(item, index)))}
                      </div>
                  </div>
                </div>
                <div className={`border border-slate-200 rounded mt-4 rounded-md`}>
                  <h1 className="text-sm text-black font-semibold mb-2 py-2 px-4 bg-slate-100 rounded-t-md">Informasi Order</h1>
                  <div className="py-2 px-4">
                    <div className="flex justify-between text-xs text-slate-700 mb-2">
                        <h1 className="font-semibold">Nama</h1>
                        <p className="font-semibold">{data != null ? data.order.nama_pelanggan : ''}</p>
                    </div>
                    <div className="flex justify-between text-xs text-slate-700 mb-2">
                        <h1 className="font-semibold">No Meja</h1>
                        <p className="font-semibold">{data != null ? data.order.meja?.no_meja: ''}</p>
                    </div>
                    <div className="flex justify-between text-xs text-slate-700 mb-2">
                        <h1 className="font-semibold">Tanggal & Waktu</h1>
                        <p className="font-semibold">{moment(data != null ? data.order.created_at : '').format('DD-MM-YYYY HH:MM')}</p>
                    </div>
                    <div className="flex justify-between text-xs text-slate-700 mb-2">
                        <h1 className="font-semibold">Subtotal</h1>
                        <p className="font-semibold">IDR {rupiah(data != null ? parseInt(data.order.nilai_transaksi) - (parseInt(data.order.service_charge) + parseInt(data.order.pajak)) : '')}</p>
                    </div>
                    <div className="flex justify-between text-xs mb-2">
                        <h1 className="font-semibold text-green-500">Diskon</h1>
                        <p className="font-semibold text-green-500">IDR {rupiah(data != null ? data.order.diskon : '')}</p>
                    </div>
                    <div className="flex justify-between text-xs text-slate-700 mb-2">
                        <h1 className="font-semibold">Pajak</h1>
                        <p className="font-semibold">IDR {rupiah(data != null ? data.order.pajak : '')}</p>
                    </div>
                    <div className="flex justify-between text-xs text-slate-700 mb-4">
                        <h1 className="font-semibold">Service Charge</h1>
                        <p className="font-semibold">IDR {rupiah(data != null ? data.order.service_charge : '')}</p>
                    </div>

                    <div className="flex justify-between text-xs text-slate-700 pt-4 border-t border-dashed border-slate-400 mb-2">
                        <h1 className="font-bold">Total Transaksi</h1>
                        <p className="font-bold">IDR {rupiah(data != null ? data.order.nilai_transaksi : '')}</p>
                    </div>
                  </div>
                </div>
                <div className='w-full px-4 fixed bottom-1 left-0 bg-white flex items-center py-4'>
                  <Link to="/home" className="flex-1 flex items-center border-none">
                    <Button type="button" title="Tambah Lagi" className="w-full bg-blue-500 border-0 hover:bg-blue-400 mb-2"/>
                  </Link>
                </div>
              </div>
          }
        </div>

      </div> 
      
    </>
  )
}
