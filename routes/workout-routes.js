const router = require("express").Router();
const Workout = require("../models/Workout.js");
const Exercise = require("../models/Exercise.js");

router.get('/api/workouts', (req, res) => {
    Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.post('/api/workouts', ({body}, res) => {
    Exercise.create(body)
    .then(({_id}) => Workout.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});


router.put('/api/workouts/:id', ({body}, res) => {
    Workout.update(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});


router.get('/api/workouts/range', (req, res) => {
    Workout.find(req.params.id)
    .then(dbWorkout => {

    })
})









module.exports = router;