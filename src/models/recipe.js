const { DataTypes, Model, Sequelize } = require('sequelize');
const database = require('../utils/database');
const sequelize = database.open();

class Recipe extends Model {

    someMethod() {
        
    }

}

Recipe.init({
    recipe_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    description: {
        type: DataTypes.STRING
    },
    recipe_order: {
        type: DataTypes.INTEGER
    },
    image_url: {
        type: DataTypes.STRING
    },
    is_pinned: {
        type: DataTypes.INTEGER
    }
},{
    sequelize,
    tableName: 'recipe',
    modelName: 'Recipe',
    timestamps: false
});

module.exports = Recipe;