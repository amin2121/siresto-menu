import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { settingNoMeja } from '../features/nomejaSlice'
import axios from '../utils/axios'
import Logo from '../assets/logo/SiResto.png'

import { IoCartOutline, IoBagHandleOutline } from 'react-icons/io5'

function HeaderUser() {
  const { no_meja } = useSelector(state => state.nomeja)
  const navigate = useNavigate()
  let { code, guest } = useParams()
  const dispatchNoMeja = useDispatch()

  useEffect(() => {
    if(localStorage.getItem('code') == null) {
      localStorage.setItem('code', code)
      localStorage.setItem('guest', guest)
    }

    ambilDataMeja()
  }, [])

  const ambilDataMeja = async () => {
    let queryCode = ''
    let codeLocal = localStorage.getItem('code')
    if(codeLocal) {
      queryCode = `_u=${codeLocal}`
    }

    const response = await axios.get(`meja/no-meja?${queryCode}`)
    const res = response.data
    const meja = res.data
    dispatchNoMeja(settingNoMeja(meja.no_meja))
  }

  return (
    <>
        <div className='header-user px-4 py-2 flex justify-between bg-white'>
            <div className='header-user__logo flex justify-start items-center'>
              <img src={Logo} alt={Logo} className="w-24"/>
            </div>
            <div className='header-user__setting flex justify-evenly items-center space-x-8'>
                <span className='header-user__nouser'>#{no_meja}</span>
                <div className='relative cursor-pointer' onClick={() => navigate('/status-order')}>
                    <span className='w-3 h-3 text-xs rounded-full absolute inline-flex -top-1 -right-1 bg-blue-400'>
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                    <IoBagHandleOutline size="24"/>
                </div>
                <div className='relative cursor-pointer' onClick={() => navigate('/keranjang')}>
                  <span className='w-3 h-3 text-xs rounded-full absolute inline-flex -top-1 -right-1 bg-blue-400'>
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                  <IoCartOutline size="24"/>
                </div>
            </div>
        </div>
    </>
  )
}

export default HeaderUser