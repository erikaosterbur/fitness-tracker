const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
      type: Date,
      default: Date.now,
    },
    exercises: [
      {
        type: {
          type: String,
          required: "Enter the type of exercise you completed"
        },
        name: {
          type: String,
          trim: true,
          required: "Enter a name for your exercise"
        },
        duration: {
          type: Number,
          required: "How long was the duration of your workout?"
        },
        weight: {
          type: Number,
        },
        reps: {
          type: Number,
        },
        sets: {
          type: Number,
        },
        distance: {
          type: Number,
        },
      },
    ],
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;