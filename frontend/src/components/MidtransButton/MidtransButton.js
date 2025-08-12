import React from "react";
import axios from "axios";
import { useCart } from "../../hooks/useCart";
import { toast } from "react-toastify";    
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";



export default function MidtransButton({ order }) {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const { data } = await axios.post("/api/orders/midtrans/create-snap-token");
      const snapToken = data.token;

      // Panggil Midtrans Snap
      window.snap.pay(snapToken, {
        onSuccess: async (result) => {
          await axios.put("/api/orders/pay", { paymentId: result.transaction_id });
          clearCart();
          toast.success("Pembayaran Berhasil");
          navigate("/track/" + order._id);
        },
        onPending: (result) => {
          toast.info("Menunggu pembayaran...");
        },
        onError: () => {
          toast.error("Pembayaran gagal");
        },
        onClose: () => {
          toast.info("Pembayaran dibatalkan");
        }
      });
    } catch (error) {
      console.error(error);
      toast.error("Gagal memproses pembayaran");
    }
  };

  return (
    // <button className={classes.button} onClick={handlePayment} >
    //   Bayar Pesanan
    // </button>
    <Button
      text="Bayar Pesanan"
      width="20rem"
      height="3rem"
      backgroundColor = '#040226'
      onClick={handlePayment}
    />
  );
}