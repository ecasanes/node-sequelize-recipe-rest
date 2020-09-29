const express = require('express');
const helpers = require('../utils/helpers');
const auth = require('../middleware/auth');
const recipe = require('../models/recipe');

const app = new express.Router();

// GET - recipes - get all recipes
app.get('/recipes', async (req, res) => {

    // TODO: ?query=

    try {
        return res.send({
            recipes: []
        });
    } catch (e) {
        helpers.log(e);
    }

})

// GET - recipes/:id - get specific recipe by id
app.get('/recipes/:id', async (req, res) => {

    try {
        return res.send({
            recipe: {}
        });
    } catch (e) {
        helpers.log(e);
    }

})

// PUT - recipes/:id - update specific recipe by id
app.put('/recipes/:id', async (req, res) => {

    try {
        res.send({
            recipe: {}
        });
    } catch (e) {
        helpers.log(e);
    }

})

// POST - recipes - create new recipe with image - with items with image and alternatives and ordering
app.post('/recipes', async (req, res) => {

    const body = req.body;

    try {
        const result = await recipe.create(body);
        return res.status(201).send()
    } catch (error) {
        helpers.log(error);
        return res.status(400).send(error);
    }

});

/**
 * TODO:
 * 
 * stand-alone tables
 * recipe (recipe_id, name, description, image, is_pinned, order)
 * item (item_id, name, description, image)
 * measurement (measurement_id, name, description) [e.g. pc, slice, grams, kilos]
 *
 * related tables
 * recipe_item (recipe_item_id, recipe_id, item_id, quantity, measurement_id, order, alternative_of_id, image)
 * 
 * save for last table functions
 * user
 * 
 * 
 */

module.exports = app;