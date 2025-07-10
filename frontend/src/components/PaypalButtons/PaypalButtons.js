import {
    PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import React, { useEffect } from "react";
import { useLoading } from "../../hooks/useLoading";
import { pay } from "../../services/orderService";
import { useCart } from "../../hooks/useCart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function PaypalButtons({ order }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "Ad2Nzd13SP9wSTIKdE3qgKg-TFoLDVZJ8cJxarSnAUsz5_jbC0weMXKnv-GojnkUNne9gFGO3A1Mf4MT",
      }}
    >
      <Buttons order={order} />
    </PayPalScriptProvider>
  );
}

function Buttons({ order }) {
  const {clearCart} = useCart();
  const [{ isPending }] = usePayPalScriptReducer();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  useEffect(() => {
    isPending ? showLoading() : hideLoading();
  });

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: order.totalPrice,
          },
        },
      ],
    });
  };


  const onApprove = async (data, actions) => {
    try {
        const payment = await actions.order.capture();
        const orderId = await pay(payment.id);
        clearCart();
        toast.success('Pembayaran Berhasil di Simpan', 'Success');
        navigate ('/track/'+ orderId);
    } catch(error) {
        toast.error('Pembayaran Gagal di Simpan', 'Error');
    }
  }

  const onError = err => {
    toast.error('Pembayaran Gagal', 'Error');
  }

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}
    />
  );
}
