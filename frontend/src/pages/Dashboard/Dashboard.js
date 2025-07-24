import React from "react";
import { useAuth } from "../../hooks/useAuth";
import classes from "./dashboard.module.css";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className={classes.container}>
      <div className={classes.menu}>
        {allItems
          .filter((item) => user.isAdmin || !item.forAdmin)
          .map((item) => (
            <Link
              key={item.title}
              to={item.url}
              style={{
                backgroundColor: item.bgColor,
                color: item.color,
              }}
            >
                <img src={item.imageUrl} alt={item.title} />
                <h2>{item.title}</h2>
            </Link>
          ))}
      </div>
    </div>
  );
}

const allItems = [
  {
    title: "Orders",
    imageUrl: "/icons/orders.svg",
    url: "/orders",
    bgColor: "#63488f",
    color: "white",
  },
  {
    title: "Profile",
    imageUrl: "/icons/profile.svg",
    url: "/profile",
    bgColor: "#63488f",
    color: "white",
  },
  {
    title: "Users",
    imageUrl: "/icons/users.svg",
    url: "/admin/users",
    forAdmin: true,
    bgColor: "#63488f",
    color: "white",
  },
  {
    title: "Items",
    imageUrl: "/icons/barang.svg",
    url: "/admin/barang",
    forAdmin: true,
    bgColor: "#63488f",
    color: "white",
  },
];
