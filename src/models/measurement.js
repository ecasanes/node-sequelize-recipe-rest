const { DataTypes, Model, Sequelize } = require('sequelize');
const database = require('../utils/database');
const sequelize = database.open();

class Measurement extends Model {

    someMethod() {
        
    }

}

Measurement.init({
    measurement_id: {
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
    tableName: 'measurement',
    timestamps: false
});

module.exports = Measurement;