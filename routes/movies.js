const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

// CREATE
router.post("/", async (req, res) => {
  console.log(req.body); // Log les données reçues
  const newMovie = new Movie(req.body);
  try {
    const savedMovie = await newMovie.save();
    return res.status(201).json(savedMovie); // Utilisation de return
  } catch (err) {
    console.error(err); // Log l'erreur
    return res.status(500).json(err); // Utilisation de return
  }
});

// UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updatedMovie); // Utilisation de return
    } catch (err) {
      return res.status(500).json(err); // Utilisation de return
    }
  } else {
    return res.status(403).json("You are not allowed!"); // Utilisation de return
  }
});

// DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      return res.status(200).json("The movie has been deleted..."); // Utilisation de return
    } catch (err) {
      return res.status(500).json(err); // Utilisation de return
    }
  } else {
    return res.status(403).json("You are not allowed!"); // Utilisation de return
  }
});

// GET
router.get("/find/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    return res.status(200).json(movie); // Utilisation de return
  } catch (err) {
    return res.status(500).json(err); // Utilisation de return
  }
});

// GET RANDOM
router.get("/random", async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    return res.status(200).json(movie); // Utilisation de return
  } catch (err) {
    return res.status(500).json(err); // Utilisation de return
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies.reverse()); // Utilisation de return
  } catch (err) {
    return res.status(500).json(err); // Utilisation de return
  }
});

module.exports = router;
