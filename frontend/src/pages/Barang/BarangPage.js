import React, { useEffect, useState } from "react";
import classes from "./barangPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { getByID } from "../../services/foodService";
import StarRating from "../../components/StarRating/StarRating";
import Tags from "../../components/Tags/Tags";
import Price from "../../components/Price/Price";
import { useCart } from "../../hooks/useCart";
import NotFound from "../../components/NotFound/NotFound";
export default function BarangPage() {
  const [barang, setBarang] = useState({});
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(barang);
    navigate("/cart");
  };

  useEffect(() => {
    getByID(id).then(setBarang);
  }, [id]);
  return (
    <>
      {!barang ? (
        <NotFound message="Barang tidak ditemukan !" linkText="Pergi ke Home" />
      ) : (
        <div className={classes.container}>
          <img
            className={classes.image}
            src={`${barang.imageUrl}`}
            alt={barang.name}
          />

          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{barang.name}</span>
              <span
                className={`${classes.favorite} ${
                  barang.favorite ? "" : classes.not
                }`}
              >
                ❤
              </span>
            </div>
            <div className={classes.rating}>
              <StarRating stars={barang.stars} size={25} />
            </div>
            <div className={classes.origins}>
              {barang.origins?.map((origin) => (
                <span key={origin}>{origin}</span>
              ))}
            </div>
            <div className={classes.tags}>
              {barang.tags && (
                <Tags
                  tags={barang.tags.map((tag) => ({ name: tag }))}
                  forFoodPage={true}
                />
              )}
            </div>
            {/* <div className={classes.cook_time}>
              <span>
                Time to cook about <strong>{barang.descriptions}</strong> minutes
              </span>
            </div> */}
            <div className={classes.price}>
              <Price price={barang.price} />
            </div>
            <button onClick={handleAddToCart}>Tambah ke keranjang</button>
          </div>
        </div>
      )}
    </>
  );
}
