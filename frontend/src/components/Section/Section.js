import React from 'react';
import styles from './section.module.css';


const HeroSection = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.heroTextSection}>
            <h1 className={styles.heroTitle}>
              Jelajahi Koleksi
              <br />
              <span className={styles.heroTitleAccent}>Fashion Eksklusif</span>
            </h1>
            
            <p className={styles.heroDescription}>
              Butik dengan pilihan baju dan tas berkualitas
            </p>
            
            <button
              className={styles.heroButton}
              onClick={scrollToContent}
            >
              Lihat Produk
            </button>
          </div>
          
          <div className={styles.heroLogoSection}>
            <div className={styles.heroLogoWrapper}>
              <div className={styles.heroLogoBackground}></div>
              <img 
                src="./Gambar/gambarSection.png"
                alt="Butik FYV Logo"
                className={styles.heroLogo}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
