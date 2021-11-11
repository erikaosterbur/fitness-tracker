const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require('./models');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const opts = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false};
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", opts);

db.Workout.create({})
  .then(dbWorkout => {
    console.log(dbWorkout);
  })
  .catch(({ message }) => {
    console.log(message);
  });

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"));
});
  
