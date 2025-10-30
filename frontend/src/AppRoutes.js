import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import FoodPage from "./pages/Barang/BarangPage";
import CartPage from "./pages/Cart/CartPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import PaymentPage from "./pages/Payment/PaymentPage";
import OrderTrackPage from "./pages/OrderTrack/OrderTrackPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import OrdersPage from "./pages/Orders/OrdersPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import BarangAdminPage from "./pages/BarangAdmin/BarangAdminPage";
import BarangEditPage from "./pages/BarangEdit/BarangEditPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import UserEditPage from "./pages/UserEdit/UserEditPage";
import TasPage from "./pages/Tas/TasPage";
import BajuPage from "./pages/Baju/BajuPage";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search/:searchTerm" element={<HomePage />} />
      <Route path="/tag/:tag" element={<HomePage />} />
      <Route path="/barang/:id" element={<FoodPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/tas" element={<TasPage/>}/>
      <Route path="/tas/search/:searchTerm" element={<TasPage/>}/>
      <Route path="/baju" element={<BajuPage/>}/>
      <Route path="/baju/search/:searchTerm" element={<BajuPage/>}/>
      <Route
        path="/checkout"
        element={
          <AuthRoute>
            <CheckoutPage />
          </AuthRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <AuthRoute>
            <PaymentPage />
          </AuthRoute>
        }
      />
      <Route
        path="/track/:orderId"
        element={
          <AuthRoute>
            <OrderTrackPage />
          </AuthRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthRoute>
            <ProfilePage />
          </AuthRoute>
        }
      />
      <Route
        path="/orders/:filter?"
        element={
          <AuthRoute>
            <OrdersPage />
          </AuthRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AuthRoute>
            <Dashboard/>
          </AuthRoute>
        }
      />
      <Route
        path="/admin/barang/:searchTerm?"
        element={
          <AdminRoute>
            <BarangAdminPage/>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/addBarang"
        element={
          <AdminRoute>
            <BarangEditPage/>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/editBarang/:barangId"
        element={
          <AdminRoute>
            <BarangEditPage/>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users/:searchTerm?"
        element={
          <AdminRoute>
            <UsersPage/>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/editUser/:userId"
        element={
          <AdminRoute>
            <UserEditPage/>
          </AdminRoute>
        }
      />
    </Routes>
  );
}
