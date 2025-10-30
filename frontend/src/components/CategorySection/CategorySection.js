import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SlHandbag } from "react-icons/sl";
import { GiTravelDress } from "react-icons/gi";
import styles from './categorySection.module.css';

export default function CategorySection() {
  const navigate = useNavigate();

  return (
    <div className={styles.categorySection}>
      <h2 className={styles.title}>Kategori Produk</h2>
      <div className={styles.categoryContainer}>
        <div 
          className={styles.categoryCard}
          onClick={() => navigate('/tas')}
        >
          <div className={styles.imageContainer}>
            <SlHandbag className={styles.categoryIcon} />
          </div>
          <h3>Koleksi Tas</h3>
          <p>Jelajahi koleksi tas terbaik kami</p>
        </div>

        <div 
          className={styles.categoryCard}
          onClick={() => navigate('/baju')}
        >
          <div className={styles.imageContainer}>
            <GiTravelDress className={styles.categoryIcon} />
          </div>
          <h3>Koleksi Baju</h3>
          <p>Temukan gaya fashion terkini</p>
        </div>
      </div>
    </div>
  );
}
