import { model, Schema } from "mongoose";

export const BarangSchema = new Schema(
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      tags: { type: [String] },
      favorite: { type: Boolean, default: false },
      stars: { type: Number, default: 3 },
      imageUrl: { type: String, required: true },
      origins: { type: [String], required: true },
      descriptions: { type: String, required: true },
    },
    {
      toJSON: {
        virtuals: true,
      },
      toObject: {
        virtuals: true,
      },
      timestamps: true,
    }
  );
  
  export const BarangModel = model('barangg', BarangSchema);