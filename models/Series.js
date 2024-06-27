const mongoose = require("mongoose");

const SeriesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    genre: { type: String },
    isSeries: { type: Boolean, default: true },
    seasons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Season" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Series", SeriesSchema);
