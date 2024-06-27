const Series = require("../models/Series");
const Season = require("../models/Season");
const Episode = require("../models/Episode");
const router = require("express").Router();

router.post("/", async (req, res) => {
  console.log(req.body); // Log the received data

  const { title, desc, img, imgTitle, imgSm, trailer, genre, seasons } =
    req.body;

  try {
    // Ensure seasons is an array
    const seasonArray = Array.isArray(seasons) ? seasons : [];

    const seasonIds = await Promise.all(
      seasonArray.map(async (seasonData) => {
        if (typeof seasonData === "object") {
          // If it's an object, create episodes and season
          const episodeIds = await Promise.all(
            seasonData.episodes.map(async (episodeData) => {
              const newEpisode = new Episode(episodeData);
              const savedEpisode = await newEpisode.save();
              return savedEpisode._id;
            })
          );

          const newSeason = new Season({
            seasonNumber: seasonData.seasonNumber,
            episodes: episodeIds,
          });

          const savedSeason = await newSeason.save();
          return savedSeason._id;
        } else {
          // If it's an ID, simply return it
          return seasonData;
        }
      })
    );

    // Create the new series with the season IDs
    const newSeries = new Series({
      title,
      desc,
      img,
      imgTitle,
      imgSm,
      trailer,
      genre,
      seasons: seasonIds,
    });

    const savedSeries = await newSeries.save();
    res.status(201).json(savedSeries);
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json(err);
  }
});

// GET Series with populated seasons and episodes
router.get("/", async (req, res) => {
  try {
    const series = await Series.find();
    res.status(200).json(series.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all seasons of a series
router.get("/:seriesId/seasons", async (req, res) => {
  const { seriesId } = req.params;

  try {
    // Find the series by ID and populate the seasons
    const series = await Series.findById(seriesId).populate("seasons");

    if (!series) {
      return res.status(404).json({ message: "Series not found" });
    }

    // Return the populated seasons
    res.status(200).json(series.seasons);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
