import { connect, set } from "mongoose";
import { UserModel } from "../models/user.model.js";
import { BarangModel } from "../models/barang.model.js";
import { sample_users } from "../data.js";
import { sample_foods } from "../data.js";
import bcrypt from "bcryptjs";

const PASSWORD_HASH_SALT_ROUNDS = 10;

// Cache connection untuk serverless
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

set("strictQuery", true);

export const dbconnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    };

    cached.promise = connect(process.env.MONGO_URI, opts)
      .then((mongoose) => {
        console.log("Database connection established");
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
    
    // Only seed in development
    if (process.env.NODE_ENV !== 'production') {
      await seedData();
    }
    
    console.log("Database connection successful");
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error("Database connection failed:", error);
    throw error;
  }
};

async function seedData() {
  try {
    await seedUsers();
    await seedBarangs();
  } catch (error) {
    console.error("Seeding error:", error);
  }
}

async function seedUsers() {
  try {
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
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}

async function seedBarangs() {
  try {
    const barangs = await BarangModel.countDocuments();
    if (barangs > 0) {
      console.log('Barang seed is already done!');
      return;
    }

    for (const barang of sample_foods) {
      barang.imageUrl = `/barang/${barang.imageUrl}`;
      await BarangModel.create(barang);
    }

    console.log('Barang seed is done!');
  } catch (error) {
    console.error("Error seeding barangs:", error);
  }
}