const mongoose = require("mongoose");

const SeasonSchema = new mongoose.Schema(
  {
    seasonNumber: { type: Number, required: true },
    episodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Episode" }] // Tableau d'IDs d'épisodes
  },
  { timestamps: true }
);

module.exports = mongoose.model("Season", SeasonSchema);
