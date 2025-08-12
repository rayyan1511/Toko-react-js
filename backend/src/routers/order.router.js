import { Router } from "express";
import handler from "express-async-handler";
import auth from "../middleware/auth.mid.js";
import { BAD_REQUEST, UNAUTHORIZED } from "../constants/httpStatus.js";
import { OrderModel } from "../models/order.models.js";
import { OrderStatus } from "../constants/orderStatus.js";
import { UserModel } from "../models/user.model.js";
import midtransClient from "midtrans-client";

const router = Router();
router.use(auth);

router.post(
  "/create",
  handler(async (req, res) => {
    const order = req.body;

    if (order.items.length <= 0)
      res.status(BAD_REQUEST).send("Keranjang anda kosong");

    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    const newOrder = new OrderModel({ ...order, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
  })
);

router.put(
  "/pay",
  handler(async (req, res) => {
    const { paymentId } = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if (!order) {
      res.status(BAD_REQUEST).send("Pesanan tidak ditemukan");
      return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
  })
);

router.get(
  "/track/:orderId",
  handler(async (req, res) => {
    const { orderId } = req.params;
    const user = await UserModel.findById(req.user.id);

    const filter = {
      _id: orderId,
    };

    if (!user.isAdmin) {
      filter.user = user._id;
    }

    const order = await OrderModel.findOne(filter);

    if (!order) return res.send(UNAUTHORIZED);

    return res.send(order);
  })
);

router.get(
  "/newOrderForCurrentUser/",
  handler(async (req, res) => {
    const order = await getNewOrderForCurrentUser(req);
    if (order) res.send(order);
    else res.status(BAD_REQUEST).send();
  })
);

router.get('/allstatus', (req, res) => {
  const allStatus = Object.values(OrderStatus);
  res.send(allStatus);
});

router.get(
  "/:status?",
  handler(async (req, res) => {
    const status = req.params.status;
    const user= await UserModel.findById(req.user.id);
    const filter = {};

    if (!user.isAdmin) filter.user = user._id;
    if (status) filter.status = status;
    
    const orders = await OrderModel.find(filter).sort('-createdAt');
    res.send (orders);
  })
);



router.post(
  "/midtrans/create-snap-token",
  handler(async (req, res) => {
    const order = await getNewOrderForCurrentUser(req);
    if (!order) {
      return res.status(BAD_REQUEST).send("Pesanan tidak ditemukan");
    }

    // Konfigurasi Midtrans
    let snap = new midtransClient.Snap({
      isProduction: false, // true kalau sudah live
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    // Ambil data user dari DB
    const user = await UserModel.findById(req.user.id);

    let parameter = {
      transaction_details: {
         order_id: "ORDER-" + order._id + '-' + Date.now(),
        gross_amount: order.totalPrice,
      },
      customer_details: {
        first_name: order.name || "Pelanggan",
        email: user?.email || "noemail@example.com",
        phone: order.phone || "08123456789",
      },
    };

    try {
      const snapToken = await snap.createTransaction(parameter);
      res.json({ token: snapToken.token });
    } catch (error) {
      console.error(error);
      res.status(500).send("Gagal membuat token Midtrans");
    }
  })
);




const getNewOrderForCurrentUser = async (req) =>
  await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });

export default router;
