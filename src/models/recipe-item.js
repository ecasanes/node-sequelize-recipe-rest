const { DataTypes, Model } = require('sequelize');
const database = require('../utils/database');
const sequelize = database.open();

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
    // recipe_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: Recipe,
    //         key: 'recipe_id'
    //     }
    // },
    // item_id: {
    //     type: DataTypes.INTEGER,
    //     // references: {
    //     //     model: Item,
    //     //     key: 'item_id'
    //     // }
    // },
    // measurement_id: {
    //     type: DataTypes.INTEGER,
    //     // references: {
    //     //     model: Measurement,
    //     //     key:'measurement_id'
    //     // }
    // },
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