const database = require('./utils/database');

const app = {};

app.init = async () => {
    
    // app.initDb();

}

app.initDb = async () => {

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

    const createRecipeTableSQL = `
        CREATE TABLE IF NOT EXISTS recipe (
            recipe_id    INTEGER       PRIMARY KEY AUTOINCREMENT,
            name         VARCHAR (255) DEFAULT NULL UNIQUE,
            description  TEXT          DEFAULT NULL,
            recipe_order INTEGER       DEFAULT NULL,
            image_url    TEXT          DEFAULT NULL,
            is_pinned    INTEGER       DEFAULT NULL
        );    
    `;

    const createItemTableSQL = `
        CREATE TABLE IF NOT EXISTS item (
            item_id      INTEGER       PRIMARY KEY AUTOINCREMENT,
            name         VARCHAR (255) DEFAULT NULL UNIQUE,
            description  TEXT          DEFAULT NULL,
            image_url    TEXT          DEFAULT NULL
        );    
    `;

    const createMeasurementTableSQL = `
        CREATE TABLE IF NOT EXISTS measurement (
            measurement_id      INTEGER       PRIMARY KEY AUTOINCREMENT,
            name                VARCHAR (255) DEFAULT NULL UNIQUE,
            description         TEXT          DEFAULT NULL,
            image_url           TEXT          DEFAULT NULL
        );    
    `;

    const createRecipeItemTableSQL = `
        CREATE TABLE IF NOT EXISTS recipe_item (
            recipe_item_id      INTEGER         PRIMARY KEY AUTOINCREMENT,
            recipe_id           INTEGER         DEFAULT NULL,
            item_id             INTEGER         DEFAULT NULL,
            measurement_id      INTEGER         DEFAULT NULL,
            image_url           VARCHAR (255)   DEFAULT NULL,
            quantity            DECIMAL (10,2)  DEFAULT 0,
            recipe_item_order   INTEGER         DEFAULT NULL,
            alternative_of_id   INTEGER         DEFAULT NULL,
            FOREIGN KEY (recipe_id)
                REFERENCES recipe (recipe_id)
                    ON DELETE SET NULL
                    ON UPDATE NO ACTION,
            FOREIGN KEY (item_id)
                REFERENCES item (item_id)
                    ON DELETE SET NULL
                    ON UPDATE NO ACTION,
            FOREIGN KEY (measurement_id)
                REFERENCES measurement (measurement_id)
                    ON DELETE SET NULL
                    ON UPDATE NO ACTION,
            FOREIGN KEY (alternative_of_id)
                REFERENCES item (item_id)
                    ON DELETE SET NULL
                    ON UPDATE NO ACTION
        );    
    `;

    const sequelize = await database.open();

    await database.queryRaw(createRecipeTableSQL);
    await database.queryRaw(createItemTableSQL);
    await database.queryRaw(createMeasurementTableSQL);
    await database.queryRaw(createRecipeItemTableSQL);

    await database.close();


}

module.exports = app;