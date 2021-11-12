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

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.get('/api/workouts', (req, res) => {
  db.Workout.aggregate([{$addFields: {totalDuration: {$sum: "$exercises.duration"}}}])
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
      res.status(400).json(err);
  });
});

app.post('/api/workouts', ({body}, res) => {
  db.Workout.create(body)
  .then(dbWorkout => {
      res.json(dbWorkout);
  })
  .catch(err => {
      res.json(err);
  });
});

app.put('/api/workouts/:id', (req, res) => {
  db.Workout.findOneAndUpdate({_id: req.params.id}, { $push: { exercises: req.body } }, { new: true })
  .then(dbWorkout => {
      res.json(dbWorkout);
  })
  .catch(err => {
      res.status(400).json(err);
  });
});

app.get('/api/workouts/range', (req, res) => {
  db.Workout.aggregate([{$addFields: {totalDuration: {$sum: "$exercises.duration"}}}])
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
      res.status(400).json(err);
  });
})
