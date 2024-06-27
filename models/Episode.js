const mongoose = require("mongoose");

const EpisodeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String },
    duration: { type: Number }, // durée en minutes
    video: { type: String }, // URL de la vidéo
    episodeNumber: { type: Number, required: true }, // numéro de l'épisode
  },
  { timestamps: true }
);

module.exports = mongoose.model("Episode", EpisodeSchema);
