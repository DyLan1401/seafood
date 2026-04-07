import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Resigter from './pages/Register'
import CategoryDetail from './pages/CategoryDetail'
import Categories from './pages/Categories'
import UserOrders from './pages/UserOrders'
import Error404 from './pages/error404'
import Dashboard from './pages/Dashboard'
import { ToastContainer } from './component/ToastContainer'
import OrderDetail from './pages/OrderDetail'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Resigter />} />
        <Route path="/product/category/:slug" element={<CategoryDetail />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/my-orders' element={<UserOrders />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/order/:id" element={<OrderDetail />} />

        <Route path="*" element={<Error404 />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
