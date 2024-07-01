const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const episodeRoute = require("./routes/episodes");
const seasonRoute = require("./routes/season");
const seriesRoute = require("./routes/series");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://localhost:3000",
    "http://192.168.100.5:3000",
    "http://localhost:4000",
    "https://netflixclonadmin.onrender.com",
    "http://netflixclonadmin.onrender.com",
    "https://localhost",
    "https://clonenetflixtest.onrender.com"
  ], // Remplacez par le domaine de votre frontend déployé
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "*",
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);
app.use("/api/episodes", episodeRoute);
app.use("/api/seasons", seasonRoute);
app.use("/api/series", seriesRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
