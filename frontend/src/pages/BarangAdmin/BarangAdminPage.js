import { useEffect, useState } from "react";
import classes from "./barangAdminPage.module.css";
import { Link, useParams } from "react-router-dom";
import { deleteById, getAll, search } from "../../services/barangService";
import NotFound from "../../components/NotFound/NotFound";
import Title from "../../components/Title/Title";
import Search from "../../components/Search/Search";
import Price from "../../components/Price/Price";
import { toast } from "react-toastify";

export default function BarangAdminPage() {
  const [barangg, setBarangg] = useState();
  const { searchTerm } = useParams();

  useEffect(() => {
    loadBarang();
  }, [searchTerm]);

  const loadBarang = async () => {
    const barangg = searchTerm ? await search(searchTerm) : await getAll();
    setBarangg(barangg);
  };

  const BarangNotFound = () => {
    if (barangg && barangg.length > 0) return;

    return searchTerm ? (
      <NotFound linkRoute="/admin/barang" linkText="Lihat Semua" />
    ) : (
      <NotFound linkRoute="/dashboard" linkText="Kembali ke dashboard!" />
    );
  };

  const deleteBarang = async barang => {
    const confirmed = window.confirm(`Hapus ${barang.name} ?`);
    if (!confirmed) return;

    await deleteById(barang.id);
    toast.success (`"${barang.name}" telah dihapus`);
    setBarangg(barangg.filter(b => b.id !== barang.id));
  }

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <Title title="Kelola Barang" margin="1rem auto" />
        <Search
          searchRoute="/admin/barang/"
          defaultRoute="/admin/barang"
          margin="1rem 0"
        />
        <Link to="/admin/addBarang" className={classes.add_barang}>
          Tambah Item +
        </Link>
        <BarangNotFound />
        {barangg &&
          barangg.map((barang) => (
            <div key={barang.id} className={classes.list_item}>
                <img src={barang.imageUrl} alt={barang.name} />
                <Link to={'/barang/' + barang.id}>{barang.name}</Link>
                <Price price={barang.price} />
                <div className={classes.actions}>
                   <Link to={'/admin/editBarang/' + barang.id}>Edit</Link> 
                   <Link onClick={() => deleteBarang(barang)}>Hapus</Link>
                </div>
            </div>
          ))}
      </div>
    </div>
  );
}
