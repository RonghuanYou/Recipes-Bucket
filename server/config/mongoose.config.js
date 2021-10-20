const mongoose = require("mongoose")
const DB = "recipes"

// connect mongoose lib to MongoDB
mongoose.connect("mongodb://localhost/" + DB)
    .then(() => console.log(`connected to mongodb ${DB} database`))
    .catch(err => console.log(`error connecting to ${DB} database`, err))