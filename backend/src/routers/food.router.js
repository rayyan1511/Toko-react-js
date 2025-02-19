import { Router } from "express";
import { BarangModel } from "../models/barang.model.js";
import handler from "express-async-handler";

const router = Router();

router.get(
  "/",
  handler(async (req, res) => {
    const barangg = await BarangModel.find({});
    res.send(barangg);
  })
);

router.get(
  "/tags",
  handler(async (req, res) => {
    const tags = await BarangModel.aggregate([
        {
            $unwind: '$tags',
        }, 
        {
            $group: {
                _id: '$tags',
                count: { $sum: 1 },
            },
        },
        {
            $project: {
              _id: 0,
              name: '$_id',
              count: '$count',
            },
        },  
    ]).sort({count: -1});

    const all = {
        name: 'All',
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
    const searchRegex = new RegExp(searchTerm, 'i');

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
    const barang =  await BarangModel.findById(barangId);
    res.send(barang);
  })
);

export default router;
