const { DataTypes, Model, Sequelize } = require('sequelize');
const sqliteDB = require('../utils/sqlite');
const sequelize = sqliteDB.open();

const Recipe = require('./recipe')
const Measurement = require('./measurement')
const Item = require('./item');

class RecipeItem extends Model {

    someMethod() {
        
    }

}

RecipeItem.init({
    recipe_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    recipe_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Recipe,
            key: 'recipe_id'
        }
    },
    item_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Item,
            key: 'item_id'
        }
    },
    measurement_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Measurement,
            key:'measurement_id'
        }
    },
    image_url: {
        type: DataTypes.STRING
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    recipe_item_order: {
        type: DataTypes.INTEGER
    },
    alternative_of_id: {
        type: DataTypes.INTEGER
    }
},{
    sequelize,
    tableName: 'recipe_item',
    timestamps: false
});

module.exports = RecipeItem;