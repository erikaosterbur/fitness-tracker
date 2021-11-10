const router = require('express').Router();

const exerciseRoutes = require('./exercise-routes');
const workoutRoutes = require('./workout-routes');

router.use('/workouts', workoutRoutes);
router.use('/exercises', exerciseRoutes);


module.exports = router;





