import { useParams } from "react-router-dom";
import classes from "./barangEdit.module.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { add, getByID, update } from "../../services/barangService";
import Title from "../../components/Title/Title";
import InputContainer from "../../components/InputContainer/InputContainer";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { uploadImage } from "../../services/uploadService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function BarangEditPage() {
  const { barangId } = useParams();
  const [imageUrl, setImageUrl] = useState();
  const isEditMode = !!barangId;

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!isEditMode) return;

    getByID(barangId).then((barang) => {
      if (!barang) return;
      reset(barang);
      setImageUrl(barang.imageUrl);
    });
  }, [barangId]);

  const submit = async (barangData) => {
    const barang = { ...barangData, imageUrl };

    if (isEditMode) {
      await update(barang);
      toast.success(`Item "${barang.name}" berhasil di update!`);
      return;
    }

    const newBarang = await add(barang);
    toast.success(`Item "${barang.name}" berhasil ditambahkan!`);
    navigate("/admin/editBarang/" + newBarang.id, { replace: true });
  };

  const upload = async (event) => {
    setImageUrl(null);
    const imageUrl = await uploadImage(event);
    setImageUrl(imageUrl);
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title title={isEditMode ? "Edit Item" : "Tambah Item"} />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <InputContainer label="Pilih Gambar">
            <input type="file" onChange={upload} accept="image/jpeg" />
          </InputContainer>
          {imageUrl && (
            <a href={imageUrl} className={classes.image_link} target="blank">
              <img src={imageUrl} alt="uploaded" />
            </a>
          )}

          <Input
            type="text"
            label="Nama"
            {...register("name", { required: true, minLength: 5 })}
            error={errors.name}
          />
          <Input
            type="number"
            label="Harga"
            {...register("price", { required: true })}
            error={errors.price}
          />
          <Input
            type="text"
            label="Tags"
            {...register("tags")}
            error={errors.tags}
          />
          <Input
            type="text"
            label="Stok"
            {...register("origins", { required: true })}
            error={errors.origins}
          />
          <Input
            type="text"
            label="Deskripsi"
            {...register("descriptions", { required: true })}
            error={errors.descriptions}
          />
          <Button
            type="submit"
            backgroundColor="#009e84"
            text={isEditMode ? "Edit" : "Tambah"}
          />
        </form>
      </div>
    </div>
  );
}
