import React from 'react';
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineWhatsapp } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Tentang Kami</h3>
          <p>
            Butik FYV adalah destinasi fashion terpercaya yang menyediakan koleksi tas 
            dan pakaian berkualitas tinggi. Kami berkomitmen untuk memberikan produk terbaik 
            dengan pelayanan yang memuaskan.
          </p>
        </div>

        <div className={styles.footerSection}>
          <h3>Hubungi Kami</h3>
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <MdOutlineMailOutline className={styles.contactIcon} />
              <p className={styles.contactText}>butikfyv@gmail.com</p>
            </div>
            <div className={styles.contactItem}>
              <MdOutlineWhatsapp className={styles.contactIcon} />
              <p className={styles.contactText}>+62 1234-5678-9100</p>
            </div>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3>Lokasi Kami</h3>
          <div className={styles.locationContainer}>
            <div className={styles.contactItem}>
              <MdOutlineLocationOn className={styles.contactIcon} />
              <p className={styles.contactText}>Cibubur Residence Cluster Pinewood Blok D7/18</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2025 Butik FYV. All rights reserved.</p>
      </div>
    </footer>
  );
}
