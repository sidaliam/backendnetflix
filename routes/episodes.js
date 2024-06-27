const Episode = require("../models/Episode");
const router = require("express").Router();

//CREATE EPISODE
router.post("/", async (req, res) => {
    console.log(req.body); // Log les données reçues
    const newEpisode = new Episode(req.body);
    try {
        const savedEpisode = await newEpisode.save();
        res.status(201).json(savedEpisode);
    } catch (err) {
        console.error(err); // Log l'erreur
        res.status(500).json(err);
    }
});

module.exports = router; // Assurez-vous d'exporter le router
