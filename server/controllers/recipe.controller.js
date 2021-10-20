const { Recipe } = require('../models/recipe.model')

module.exports = {
    // CREATE
    createRecipe: (req, res) => {
        Recipe.create(req.body)
            .then(newRecipe => res.json({ recipe: newRecipe }))
            .catch(err => res.status(400).json(err));
    },

    // GET ALL 
    getAllRecipes: (req, res) => {
        Recipe.find().sort({ name: 'asc' })
            .then(allRecipes => res.json({ allRecipes: allRecipes }))
            .catch(err => res.json(err));
    },

    // GET ONE: IF ID IS WRONG, SHOW ERROR MESSAGES
    getRecipe: (req, res) => {
        Recipe.findById(req.params.id)
            .then(oneRecipe => res.json(oneRecipe))
            .catch(err => res.json(err));
    },

    // UPDATE BY ID
    updateRecipe: (req, res) => {
        Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .then(result => res.json({ result: result }))
            .catch(err => res.status(400).json(err));
    },

    // DELETE BY ID
    deleteRecipe: (req, res) => {
        Recipe.findByIdAndDelete(req.params.id)
            .then(result => res.json({ result: result }))
            .catch(err => res.json(err))
    }
}