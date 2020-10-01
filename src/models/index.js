const Item = require('./item');
const Measurement = require('./measurement')
const Recipe = require('./recipe');
const RecipeItem = require('./recipe-item');

Recipe.hasMany(RecipeItem, {foreignKey: 'recipe_id'});
RecipeItem.belongsTo(Recipe, {foreignKey: 'recipe_id'});

Measurement.hasMany(RecipeItem, {foreignKey: 'measurement_id'});
RecipeItem.belongsTo(Measurement, {foreignKey: 'measurement_id'});

Item.hasMany(RecipeItem, {foreignKey: 'item_id'});
RecipeItem.belongsTo(Item, {foreignKey: 'item_id'});

(async () => {

    try{
        await Recipe.sync();
        await Item.sync();
        await Measurement.sync();
        await RecipeItem.sync();
    }catch(error){
        console.log('error: ', error);
    }

})();


module.exports = {
    Item,
    Measurement,
    Recipe,
    RecipeItem,
};