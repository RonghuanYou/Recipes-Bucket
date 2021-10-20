const { createRecipe, getAllRecipes, getRecipe, updateRecipe, deleteRecipe } = require("../controllers/recipe.controller")

module.exports = function (app) {
    // GET ALL
    app.get('/api', getAllRecipes)

    // CREATE
    app.post('/api/new', createRecipe)

    // GET ONE
    app.get('/api/:id', getRecipe)

    // UPDATE
    app.put('/api/edit/:id', updateRecipe)

    // DELETE
    app.delete('/api/:id', deleteRecipe)
}


