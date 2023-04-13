import { Routes, Route } from 'react-router-dom'

import ContainerUser from '../pages/User/container'
import Home from '../pages/User/Home'
import Keranjang from '../pages/User/Keranjang'
import Pembayaran from '../pages/User/Pembayaran'
import PembayaranBerhasil from '../pages/User/PembayaranBerhasil'
import StatusOrder from '../pages/User/StatusOrder'

const RouteManager = () => {
	return (
		<Routes>
			<Route path="/" element={<ContainerUser/>}>
				<Route index element={<Home />}/>
				<Route path="home/:code/:guest" element={<Home />}/>
				<Route path="status-order" element={<StatusOrder />}/>
				<Route path="keranjang" element={<Keranjang />}/>
				<Route path="pembayaran" element={<Pembayaran />}/>
				<Route path="pembayaran-berhasil" element={<PembayaranBerhasil />}/>
			</Route>
		</Routes>
	)
}

export { RouteManager }