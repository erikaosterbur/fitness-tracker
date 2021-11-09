const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
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
        required: "How long was your workout?"
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
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;