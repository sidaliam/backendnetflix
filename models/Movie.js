const mongoose = require("mongoose");

const SubtitleSchema = new mongoose.Schema({
  src: { type: String, required: true },
  srcLang: { type: String, required: true },
  label: { type: String, required: true },
});

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: Number },
    genre: { type: String },
    isSeries: { type: Boolean, default: false },
    subtitles: [SubtitleSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
