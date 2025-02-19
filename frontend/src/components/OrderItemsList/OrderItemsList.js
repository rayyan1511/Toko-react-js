import React from "react";
import { Link } from 'react-router-dom';
import Price from '../Price/Price';
import classes from './orderItemsList.module.css'; 

export default function OrderItemsList({ order }) {
    return (
        <table className={classes.table}>
          <tbody>
            <tr>
              <td colSpan="5">
                <h3>Barang Pesanan:</h3>
              </td>
            </tr>
            {order.items.map(item => (
              <tr key={item.barang.id}>
                <td>
                  <Link to={`/barang/${item.barang.id}`}>
                    <img src={item.barang.imageUrl} alt="Gambar Barang Pesanan" />
                  </Link>
                </td>
                <td>{item.barang.name}</td>
                <td>
                  <Price price={item.barang.price} />
                </td>
                <td>{item.quantity}</td>
                <td>
                  <Price price={item.price} />
                </td>
              </tr>
            ))}
    
            <tr>
              <td colSpan="3"></td>
              <td>
                <strong>Total :</strong>
              </td>
              <td>
                <Price price={order.totalPrice} />
              </td>
            </tr>
          </tbody>
        </table>
      );
    }