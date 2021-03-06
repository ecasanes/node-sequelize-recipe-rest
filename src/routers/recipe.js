const express = require('express');
const helpers = require('../utils/helpers');
const database = require('../utils/database');
const {Recipe, Item, Measurement, RecipeItem} = require('../models');
const sequelize = database.open();

const app = new express.Router();

// GET - recipes - get all recipes
app.get('/recipes', async (req, res) => {

    const body = req.body;

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

    const body = req.body;
    const params = req.params;

    const recipeID = params.id;

    try {

        const result = await sequelize.transaction(async (t) => {

            // FIXME: add measurement

            const recipe = await Recipe.update({
                name: body.name,
                description: body.description,
                recipe_order: body.recipe_order,
                image_url: body.image_url,
                is_pinned: body.is_pinned
            }, {
                transaction: t,
                where: {
                    recipe_id: recipeID
                }
            });

            console.log('recipe: ', {recipe})

            for (const item of body.items) {

                let currentItem;

                if(item.item_id !== null){

                    const currentItemDetails = await Item.findOne({
                        where: {
                            item_id: item.item_id
                        }
                    });

                    console.log('currentItemDetails: ', currentItemDetails);

                    const itemWithSameUpdatedName = await Item.findOne({
                        where: sequelize.where(sequelize.fn('lower', sequelize.col('name')), item.name.toLowerCase())
                    });

                    // means item is new and still not from the list
                    if(!itemWithSameUpdatedName){

                        currentItem = await Item.create({
                            name: item.name,
                            description: item.description,
                            image_url: item.image_url
                        }, {
                            transaction: t
                        });

                    }else{

                        currentItem = await Item.update({
                            name: item.name,
                            description: item.description,
                            image_url: item.image_url
                        }, {
                            transaction: t,
                            where: {
                                item_id: item.item_id
                            }
                        });

                    }

                }else{

                    currentItem = await Item.create({
                        name: item.name,
                        description: item.description,
                        image_url: item.image_url
                    }, {
                        transaction: t
                    });

                }

                const itemID = currentItem.item_id;
                console.log('item id: ', itemID);

                let recipeItem;

                if(item.recipe_item_id !== null){

                    recipeItem = await RecipeItem.update({
                        recipe_id: recipeID,
                        item_id: itemID,
                        measurement_id: null,
                        image_url: item.image_url,
                        quantity: item.quantity,
                        recipe_item_order: item.recipe_item_order,
                        alternative_of_id: item.alternative_of_id
                    }, {
                        transaction: t,
                        where: {
                            recipe_item_id: item.recipe_item_id
                        }
                    });

                }else{

                    recipeItem = await RecipeItem.create({
                        recipe_id: recipeID,
                        item_id: itemID,
                        measurement_id: null,
                        image_url: item.image_url,
                        quantity: item.quantity,
                        recipe_item_order: item.recipe_item_order,
                        alternative_of_id: item.alternative_of_id
                    }, {
                        transaction: t
                    });

                }

                const recipeItemID = recipeItem.recipe_item_id;
                console.log('recipe item id: ', recipeItemID);

            }

            console.log('transaction successful. about to commit...');
            
            return res.status(201).send(recipe);

        });

    } catch (error) {

        // If the execution reaches this line, an error occurred.
        // The transaction has already been rolled back automatically by Sequelize!

        console.log('an error occured with the transaction. rolling back...', error);
        return res.status(400).send(error);

    }



})

// POST - recipes - create new recipe with image - with items with image and alternatives and ordering
app.post('/recipes', async (req, res) => {

    const body = req.body;

    /**
     * 
     * NOTE TO SELF: I found this repo - https://github.com/MertNacar/YetenekSenin/blob/dependabot/npm_and_yarn/mobile/acorn-5.7.4/server/src/APIs/home.js
     * wherein the logic resides in the actual routes
     * find another one that is much organized
     * 
     * */


    try {

        const result = await sequelize.transaction(async (t) => {

            // TODO: create recipe
            // TODO: get the recipe id
            // TODO: create items
            // TODO: get the item ids
            // TODO: create recipe_item from (recipe_id, item_id)

            // FIXME: add measurement

            const recipe = await Recipe.create({
                name: body.name,
                description: body.description,
                recipe_order: body.recipe_order,
                image_url: body.image_url,
                is_pinned: body.is_pinned
            }, {
                transaction: t
            });

            const recipeID = recipe.recipe_id;
            console.log('recipe_id: ', recipeID);

            for (const item of body.items) {

                const currentItem = await Item.create({
                    name: item.name,
                    description: item.description,
                    image_url: item.image_url
                }, {
                    transaction: t
                });

                const itemID = currentItem.item_id;
                console.log('item id: ', itemID);

                const recipeItem = await RecipeItem.create({
                    recipe_id: recipeID,
                    item_id: itemID,
                    measurement_id: null,
                    image_url: item.image_url,
                    quantity: item.quantity,
                    recipe_item_order: item.recipe_item_order,
                    alternative_of_id: item.alternative_of_id
                }, {
                    transaction: t
                });

                const recipeItemID = recipeItem.recipe_item_id;
                console.log('recipe item id: ', recipeItemID);

            }

            console.log('transaction successful. about to commit...');
            
            return res.status(201).send(recipe);

        });

    } catch (error) {

        // If the execution reaches this line, an error occurred.
        // The transaction has already been rolled back automatically by Sequelize!

        console.log('an error occured with the transaction. rolling back...', error);
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