const mongoose = require('mongoose')

// create a new schema
const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Recipe name is required"],
    },

    summary: {
        type: String,
        required: [true, "Summary is required"],
    },

    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [20, "Description must be at least 20 characters long"]
    },

    time :{
        type: String,
        required: [true, "Time is required"],
    },

    img: {
        type: String
    },
    creator_id: {
        type: String,
        default: "0"
    }
}, { timestamps: true })

// instantiate the schema and export it
module.exports.Recipe = mongoose.model('Recipes', RecipeSchema);