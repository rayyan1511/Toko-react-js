import React from "react";
import classes from "./header.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { FiShoppingCart } from "react-icons/fi";
import { FiUser } from "react-icons/fi";

export default function Header() {
  const {user, logout} = useAuth();

  const {cart} = useCart();
  

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <li className={classes.logo}>
          <img src="/Gambar/Logo_header.png" alt="logo" className={classes.logo_header} />
        </li>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/baju">Baju</Link>
            </li>
            <li>
              <Link to="/tas">Tas</Link>
            </li>
            {user ? (
              <li className={classes.menu_container}>
                <Link to="/dashboard"><FiUser />{user.name}</Link>
                <div className={classes.menu}>
                  <Link to="/profile">Profile</Link>
                  <Link to="/orders">Orders</Link>
                  <a onClick={logout}>Logout</a>
                </div>
              </li>
            ) : (
              <Link to="/login">Login</Link>
            )}

            <li>
              <Link to="/cart">
                <FiShoppingCart className={classes.cart_icon}/>
                {cart.totalCount > 0 && <span className={classes.cart_count}>{cart.totalCount}</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
