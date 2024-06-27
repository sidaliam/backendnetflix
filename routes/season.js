const Season = require('../models/Season');
const Episode = require('../models/Episode');
const router = require("express").Router();

//CREATE Season
router.post("/", async (req, res) => {
    console.log(req.body); // Log les données reçues

    const { seasonNumber, episodes } = req.body;

    try {
        // Créez les épisodes et obtenez leurs IDs
        const episodeIds = await Promise.all(
            episodes.map(async episodeData => {
                if (typeof episodeData === 'object') {
                    const newEpisode = new Episode(episodeData);
                    const savedEpisode = await newEpisode.save();
                    return savedEpisode._id;
                }
                return episodeData; // Assurez-vous de retourner directement l'ID si c'est déjà un ID
            })
        );

        // Créez la nouvelle saison avec les IDs des épisodes
        const newSeason = new Season({
            seasonNumber,
            episodes: episodeIds, // Utilisez les IDs des épisodes créés ou fournis
        });

        const savedSeason = await newSeason.save();
        res.status(201).json(savedSeason);
    } catch (err) {
        console.error(err); // Log l'erreur
        res.status(500).json(err);
    }
});



// Route pour obtenir tous les épisodes d'une saison
router.get("/:seasonsid", async (req, res) => {
  const { seasonsid } = req.params;

  try {
    // Trouver la saison par ID et peupler les épisodes
    const season = await Season.findById(seasonsid).populate("episodes");

    if (!season) {
      return res.status(404).json({ message: "Season not found" });
    }

    // Retourner les épisodes peuplés
    res.status(200).json(season.episodes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


module.exports = router;
