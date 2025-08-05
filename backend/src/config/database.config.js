import { connect, set } from "mongoose";
import { UserModel } from "../models/user.model.js";
import { BarangModel } from "../models/barang.model.js";
import { sample_users } from "../data.js";
import { sample_foods } from "../data.js";
import bcrypt from "bcryptjs";
const PASSWORD_HASH_SALT_ROUNDS = 10;

set("strictQuery", true);

export const dbconnect = async () => {
  try {
    connect(process.env.MONGO_URI);
    await seedUsers();
    await seedBarangs();
    console.log("Koneksi Database Berhasil");
  } catch (error) {
    console.log(error);
  }
};

async function seedUsers() {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    console.log("Users seed is already done!");
    return;
  }

  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }

  console.log("Users seed is done!");
}

async function seedBarangs() {
    const barangs = await BarangModel.countDocuments();
    if (barangs > 0) {
      console.log('Barang seed is already done!');
      return;
    }
  
    for (const barang of sample_foods) {
      barang.imageUrl = `/barang/${barang.imageUrl}`;
      await BarangModel.create(barang);
    }
  
    console.log('Barang seed Is Done!');
  }
