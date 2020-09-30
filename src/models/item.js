const { DataTypes, Model, Sequelize } = require('sequelize');
const sqliteDB = require('../utils/sqlite');
const sequelize = sqliteDB.open();

class Item extends Model {

    someMethod() {
        
    }

}

Item.init({
    item_id: {
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
    image_url: {
        type: DataTypes.STRING
    }
},{
    sequelize,
    tableName: 'item',
    timestamps: false
});

module.exports = Item;