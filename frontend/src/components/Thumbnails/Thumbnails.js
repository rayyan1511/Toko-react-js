import React from 'react';
import { Link } from 'react-router-dom';
import Price from '../Price/Price';
import StarRating from '../StarRating/StarRating';
import classes from './thumbnails.module.css';
export default function Thumbnails({ barangg }) {
  return (
    <ul className={classes.list}>
      {barangg.map(barang => (
        <li key={barang.id}>
          <Link to={`/barang/${barang.id}`}>
            <img
              className={classes.image}
              src={`${barang.imageUrl}`}
              alt={barang.name}
            />
            <div className={classes.content}>
              <div className={classes.name}>{barang.name}</div>
              <span
                className={`${classes.favorite} ${
                  barang.favorite ? '' : classes.not
                }`}
              >
                ❤
              </span>
              <div className={classes.stars}>
                <StarRating stars={barang.stars} />
              </div>
              {/* <div className={classes.product_item_footer}>
                <div className={classes.origins}>
                  {barang.origins.map(origin => (
                    <span key={origin}>{origin}</span>
                  ))}
                </div>
                <div className={classes.cook_time}>
                  <span>🕒</span>
                  {barang.descriptions}
                </div>
              </div> */}
              <div className={classes.price}>
                <Price price={barang.price} />
              </div>
            </div>
            </Link>
        </li>
      ))}
    </ul>
  );
}
