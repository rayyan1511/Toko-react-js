import { Router } from "express";
import { BarangModel } from "../models/barang.model.js";
import handler from "express-async-handler";
import admin from "../middleware/admin.mid.js";

const router = Router();

router.get(
  "/",
  handler(async (req, res) => {
    const barangg = await BarangModel.find({});
    res.send(barangg);
  })
);

router.post(
  "/",
  admin,
  handler(async (req, res) => {
    const { name, price, tags, favorite, imageUrl, origins, descriptions } =
      req.body;

    const barang = new BarangModel ({
        name,
        price,
        tags: tags.split ? tags.split(",") : tags,
        favorite,
        imageUrl,
        origins: origins.split ? origins.split(',') : origins,
        descriptions,
    })

    await barang.save();

    res.send(barang);
  })
);

router.put(
  "/",
  admin,
  handler(async (req, res) => {
    const { id, name, price, tags, favorite, imageUrl, origins, descriptions } =
      req.body;

    await BarangModel.updateOne(
      { _id: id },
      {
        name,
        price,
        tags: tags.split ? tags.split(",") : tags,
        favorite,
        imageUrl,
        origins: origins.split ? origins.split(',') : origins,
        descriptions,
      }
    );

    res.send();
  })
);

router.delete(
  "/:barangId",
  admin,
  handler(async (req, res) => {
    const { barangId } = req.params;
    await BarangModel.deleteOne({ _id: barangId });
    res.send();
  })
);

router.get(
  "/tags",
  handler(async (req, res) => {
    const tags = await BarangModel.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: "All",
      count: await BarangModel.countDocuments(),
    };

    tags.unshift(all);

    res.send(tags);
  })
);

router.get(
  "/search/:searchTerm",
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, "i");

    const barangg = await BarangModel.find({ name: { $regex: searchRegex } });
    res.send(barangg);
  })
);

router.get(
  "/tag/:tag",
  handler(async (req, res) => {
    const { tag } = req.params;
    const barangg = await BarangModel.find({ tags: tag });
    res.send(barangg);
  })
);

router.get(
  "/:barangId",
  handler(async (req, res) => {
    const { barangId } = req.params;
    const barang = await BarangModel.findById(barangId);
    res.send(barang);
  })
);

export default router;
