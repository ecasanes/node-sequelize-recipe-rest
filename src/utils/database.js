const path = require('path');
const helpers = require('./helpers');
const sqlite3 = require('sqlite3');
const { Sequelize } = require('sequelize');

const dbName = 'recipe';

const ABS_PATH = path.join(__dirname, '../');
const dbPath = path.join(ABS_PATH, `/db/${dbName}.db`);

const database = {};

database.open = () => {

    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: dbPath
    });

    return sequelize;

}

module.exports = database;