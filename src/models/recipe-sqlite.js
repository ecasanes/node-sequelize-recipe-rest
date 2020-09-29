const database = require('../utils/sqlite');
const helpers = require('../utils/helpers');

const recipe = {};

recipe.create = async (requestBody) => {

    const sampleRecipe = {
        name: 'Test',
        description: null,
        recipe_order: null,
        is_pinned: null,
        image_url: null,
        items: [{
                item_id: null,
                name: 'Onion',
                description: null,
                image_url: null,
                quantity: 1,
                recipe_item_order: 0,
                measurement_id: null
            },
            {
                item_id: null,
                name: 'Pepper',
                description: null,
                image_url: null,
                quantity: 2,
                recipe_item_order: 1,
                measurement_id: null // TODO: measurement id and name for new entries
            }
        ]
    }

    const insertItemSQL = `INSERT INTO 
                            item (name, description, image_url) 
                            VALUES (?,?,?)`;

    const insertRecipeSQL = `INSERT INTO 
                                recipe (name, description, recipe_order, image_url, is_pinned) VALUES (?, ?, ?, ?, ?)`;

    const insertRecipeItemSQL = `INSERT INTO 
                                recipe_item (recipe_id, item_id, measurement_id, image_url, quantity, recipe_item_order, alternative_of_id) 
                                VALUES (?, ?, ?, ?, ?, ?, ?)`;

    // TODO: create measurement

    let db = await database.open();

    await new Promise((resolve, reject) => {

        db.serialize(() => {

            db.exec('BEGIN');

            const recipeParams = [
                requestBody.name,
                requestBody.description,
                requestBody.recipe_order,
                requestBody.image_url,
                requestBody.is_pinned
            ];

            const test = new Promise((resolve, reject) => {

                let success = true;

                db.run(insertRecipeSQL, recipeParams, (err) => {

                    helpers.log({
                        recipeParams,
                        err
                    }, 'error');

                    console.log('rollback initiated');
                    db.exec('ROLLBACK');
                    success = false;

                });

                if(success){
                    resolve('insert successful');
                }

                reject('rollback initiated');

            });

            test
                .then((result) => {
                    console.log(result);
                    return result;
                })
                .then((result) => {
                    console.log(result);
                    console.log('about to commit');
                    db.exec('COMMIT')
                    resolve(result);
                })
                .catch((error) => {
                    console.log('reject');
                    console.log(error)
                    reject();
                })


            
        });


    });

    console.log('about to close');
    db = await database.close();

}

recipe.edit = async () => {

}

module.exports = recipe;