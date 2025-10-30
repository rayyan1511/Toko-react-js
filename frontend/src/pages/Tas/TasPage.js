import React, { useEffect, useState } from 'react';
import { getAllByTag, search } from '../../services/barangService';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import Search from '../../components/Search/Search';
import classes from './TasPage.module.css';
import { useParams } from 'react-router-dom';

export default function TasPage() {
  const [barangg, setBarangg] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    loadBarang(searchTerm);
  }, [searchTerm]);

  const loadBarang = async (term = '') => {
    if (term) {
      const searchResults = await search(term);
      // Filter search results to only include items with 'Tas' tag
      const filteredResults = searchResults.filter(item => 
        item.tags && item.tags.includes('Tas')
      );
      setBarangg(filteredResults);
    } else {
      const results = await getAllByTag('Tas');
      setBarangg(results);
    }
  };

  return (
    <div className={classes.container}>
      <h1>Koleksi Tas</h1>
      <div className={classes.searchContainer}>
        <Search 
          searchRoute="/tas/search/"
          defaultRoute="/tas"
          defaultSearch={searchTerm}
        />
      </div>
      {barangg.length === 0 ? (
        <div className={classes.noItemsContainer}>
          <div className={classes.noItems}>Barang Tidak Ditemukan</div>
          <button 
            className={classes.clearButton}
            onClick={() => {
              loadBarang();
              window.location.href = '/tas';
            }}
          >
            Kembali
          </button>
        </div>
      ) : (
        <div className={classes.thumbnailsContainer}>
          <Thumbnails barangg={barangg} />
        </div>
      )}
    </div>
  );
}

