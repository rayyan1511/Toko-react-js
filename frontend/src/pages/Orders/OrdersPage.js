import React, { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import { getAll, getAllStatus } from "../../services/orderService";
import classes from "./orderPage.module.css";
import Title from "../../components/Title/Title";
import DateTime from "../../components/DateTime/DateTime";
import Price from "../../components/Price/Price";
import NotFound from "../../components/NotFound/NotFound";
const initialState = {};
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ALL_STATUS_FETCHED":
      return { ...state, allStatus: payload };
    case "ORDERS_FETCHED":
      return { ...state, orders: payload };
    default:
      return state;
  }
};

export default function OrdersPage() {
  const [{ allStatus, orders }, dispatch] = useReducer(reducer, initialState);

  const { filter } = useParams();
  useEffect(() => {
    getAllStatus().then((status) => {
      dispatch({ type: "ALL_STATUS_FETCHED", payload: status });
    });
    getAll(filter).then((orders) => {
      dispatch({ type: "ORDERS_FETCHED", payload: orders });
    });
  }, [filter]);

  return (
    <div className={classes.container}>
      <Title
        title="Daftar Pesanan"
        margin="1.5rem 0 0 .2rem"
        fontSize="1.9rem"
      />
      {allStatus && (
        <div className={classes.all_status}>
          <Link to="/orders" className={!filter ? classes.selected : ''}>
            Semua
          </Link>
          {allStatus.map( state => (
            <Link
              key={state}
              className={state === filter ? classes.selected : ""}
              to={`/orders/${state}`}
            >
              {state}
            </Link>
          ))}
        </div>
      )}

    {orders?.length === 0 && (
        <NotFound
          linkRoute={filter ? '/orders' : '/'}
          linkText={filter ? 'Lihat Semua' : 'Pergi ke Home'}
        />
      )}

      {orders &&
        orders.map((order) => (
          <div key={order.id} className={classes.order_summary}>
            <div className={classes.header}>
              <span>{order.id}</span>
              <span>
                <DateTime date={order.createdAt} />
              </span>
              <span>{order.status}</span>
            </div>
            <div className={classes.items}>
              {order.items.map((item) => (
                <Link key={item.barang.id} to={`/barang/${item.barang.id}`}>
                  <img src={item.barang.imageUrl} alt={item.barang.name} />
                </Link>
              ))}
            </div>
            <div className={classes.footer}>
              <div>
                <Link to={`/track/${order.id}`}>Lihat Pesanan</Link>
              </div>
              <div>
                <span className={classes.price}>
                  <Price price={order.totalPrice} />
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
