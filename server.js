const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const opts = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false};
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", opts);

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});