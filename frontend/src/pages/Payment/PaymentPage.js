import React, { useState,  useEffect } from "react";
import classes from "./paymentPage.module.css";
import { getNewOrderForCurrentUser } from "../../services/orderService";
import Title from "../../components/Title/Title";
import OrderItemsList from "../../components/OrderItemsList/OrderItemsList";
import Map from "../../components/Map/Map";
import PaypalButtons from "../../components/PaypalButtons/PaypalButtons";


export default function PaymentPage() {
  const [order, setOrder] = useState();

  useEffect(() => {
    getNewOrderForCurrentUser().then((data) => setOrder(data));
  }, []);

  if (!order) return;

  return (
    <>
      
      <div className={classes.container}>
        <div className={classes.content}>
        <Title title="Detail Pesanan" fontSize="1.6 rem" />
        <div className={classes.summary}>
            <div>
              <h3>Nama:</h3>
              <span>{order.name}</span>
            </div>
            <div>
              <h3>Alamat:</h3>
              <span>{order.address}</span>
            </div>
          </div>
          <OrderItemsList order = {order}/>
        </div>
        <div className={classes.map}>
          <Title title="Lokasi Anda" fontSize="1.6rem" />
          <Map readonly={true} location={order.addressLatLng} />
        </div>

        <div className={classes.buttons_container}>
        <div className={classes.buttons}>
            
            <PaypalButtons order={order}/>
        </div>
        </div>
        
      </div>
      
    </>
  );
}
