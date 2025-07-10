import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { trackOrderById } from "../../services/orderService";
import NotFound from "../../components/NotFound/NotFound";
import classes from "./orderTrackPage.module.css";
import DateTime from "../../components/DateTime/DateTime";
import OrderItemsList from "../../components/OrderItemsList/OrderItemsList";
import Title from "../../components/Title/Title";
import Map from "../../components/Map/Map";
import { useAuth } from "../../hooks/useAuth";
export default function OrderTrackPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState();
  const { user } = useAuth();

  useEffect(() => {
    orderId &&
      trackOrderById(orderId).then((order) => {
        setOrder(order);
      });
  }, []);

  if (!orderId)
    return (
      <NotFound message="Pesanan tidak ditemukan!" linkText="Pergi ke Home" />
    );

  return (
    order && (
      <div className={classes.container}>
        <div className={classes.content}>
          <h1>Pesanan #{orderId}</h1>
          <div className={classes.header}>
            <div>
              <strong>Waktu Pemesanan</strong>
              <DateTime date={order.createdAt} />
            </div>
            <div>
              <strong>Nama</strong>
              {order.name}
            </div>
            <div>
              <strong>Alamat</strong>
              {order.address}
            </div>
            <div>
              <strong>Status Pembayaran</strong>
              {order.status}
            </div>
            {order.paymentId && (
              <div>
                <strong>Id Pembayaran</strong>
                {order.paymentId}
              </div>
            )}
          </div>

          <OrderItemsList order={order} />
        </div>

        <div>
          <Title title="Lokasi Anda" fontSize="1.6rem" />
          <Map location={order.addressLatLng} readonly={true} />
        </div>

        {order.status === "Belum dibayar" && user.isAdmin !== true &&  (
          <div className={classes.payment}>
            <Link to="/payment">Pergi ke halaman pembayaran</Link>
          </div>
        )}
      </div>
    )
  );
}
