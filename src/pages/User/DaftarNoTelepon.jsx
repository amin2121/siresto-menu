// import React, {useState, useEffect} from 'react'
// import { InputUserRupiah, InputUser, InputGroupCurrency } from '../../components/InputUser'
// import { MessageError } from '../../components/Input'
// import { Button } from '../../components/Button'

// // icons
// import { BiArrowBack } from 'react-icons/bi'

// // libraries
// import axios from '../../utils/axios'
// import { useQuery, useMutation } from 'react-query'
// import { useDispatch, useSelector } from 'react-redux'
// import { useForm } from "react-hook-form";
// import { useNavigate } from 'react-router-dom'
// import { toastDark } from '../../utils/toast'

// export default function DaftarNoTelepon() {
//   const navigate = useNavigate()
//   const { handleSubmit, formState: { errors }, reset, clearErrors, control, setValue } = useForm();

//   const mutation = useMutation(async (data) => {
//     let noTelepon = data.no_telepon.split(' ').join('')

//     if(noTelepon[0] === '0') {
//       noTelepon = noTelepon.replace('0', '62')
//     } else if(noTelepon[0] === '+') {
//       noTelepon = noTelepon.replace('+', '')
//     }

//     localStorage.setItem('noTelepon', parseInt(noTelepon))
//     navigate('/nama-pelanggan')
//   })

//   async function simpanNoTelepon (submitData) {
//     await mutation.mutate(submitData)
//   }

//   return (
//     <>
//       <div className='px-4 flex flex-col flex-1 mt-4'>

//         <form onSubmit={handleSubmit(simpanNoTelepon)} className="space-y-2 mt-3">

//           <InputGroupCurrency type="text" id="input-nilai-pembayaran" directionIcon="left" name="pembayaran" rules={{required: true}} icon='IDR' placeholder="Pembayaran" control={control} error={errors.pembayaran ? true : false}/>
//           {errors?.pembayaran && <MessageError>Pembayaran Tidak Boleh Kosong</MessageError>}

//           <div className='w-full px-4 absolute bottom-3 left-0'>
//             <Button type="submit" title="Bayar Sekarang" className="w-full bg-blue-500 border-0 hover:bg-blue-400 mb-2"/>
//           </div>
//         </form>
//       </div>
//     </>
//   )
// }

import React, {useState} from 'react'
import MetodePembayaran from '../../components/MetodePembayaran'
import { Button } from '../../components/Button' 
import { MessageError } from '../../components/Input'
import { InputUserRupiah, InputUser } from '../../components/InputUser'
import { useLocation, useNavigate } from 'react-router-dom'
import { rupiah, rupiahToNumber } from '../../utils/strings'
import { useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import { useMutation } from 'react-query'
import { HiOutlineChevronLeft } from 'react-icons/hi'
import axios from '../../utils/axios'
import LoadingScreen from '../../components/LoadingScreen'

export default function DaftarNoTelepon() {
  const namaPelanggan = localStorage.getItem('nama-pelanggan')
  const navigate = useNavigate()

  const { handleSubmit, formState: { errors }, reset, clearErrors, control, setValue } = useForm({
    defaultValue: {
      jumlah_bayar: '',
      kembalian: ''
    }
  });

  const mutation = useMutation(async (data) => {
    // let noTelepon = data.no_telepon.split(' ').join('')

    // if(noTelepon[0] === '0') {
    //   noTelepon = noTelepon.replace('0', '62')
    // } else if(noTelepon[0] === '+') {
    //   noTelepon = noTelepon.replace('+', '')
    // }

    // localStorage.setItem('noTelepon', parseInt(noTelepon))
    // navigate('/nama-pelanggan')
  })

  const simpanNoTelepon = async (submitData) => {
    await mutation.mutate(submitData)
  }

  return (
    <>
      <div className='px-4'>
        <div className='flex justify-start items-center bg-white px-4 py-4'>
          <HiOutlineChevronLeft size="20" className="cursor-pointer" onClick={() => navigate('/keranjang')}/>
          <h5 className="font-bold text-lg text-center flex-1">Pembayaran</h5>
        </div>
        <div>
          <form onSubmit={handleSubmit(simpanNoTelepon)} className="space-y-2 mt-3">
            <div>
              <InputUserRupiah title="Jumlah Bayar" control={control} name="jumlah_bayar" rules={{ required: true }} id="input-jumlah-bayar" error={errors.jumlah_bayar ? true : false}/>
              {errors?.jumlah_bayar && <MessageError>Jumlah Bayar Tidak Boleh Kosong</MessageError>}
            </div>

            <div>
              <InputUserRupiah title="Kembalian" control={control} name="kembalian" rules={{ required: true }} id="input-kembalian" error={errors.kembalian ? true : false}/>
              {errors?.kembalian && <MessageError>Kembalian Tidak Boleh Kosong</MessageError>}
            </div>

            <div className='w-full px-4 absolute bottom-3 left-0'>
              <Button type="submit" title="Bayar Sekarang" className="w-full bg-blue-500 border-0 hover:bg-blue-400 mb-2"/>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}
