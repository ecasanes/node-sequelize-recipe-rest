const path = require('path');
const helpers = require('./helpers');
const sqlite3 = require('sqlite3');
const { Sequelize } = require('sequelize');

const ABS_PATH = path.join(__dirname, '../');
const dbPath = path.join(ABS_PATH, `/db/${dbName}.db`);



const dbName = 'recipe';
let db;

const database = {};

database.open = async () => {

    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: dbPath
    });

    return sequelize;

}









database.openOld = async () => {

    const ABS_PATH = path.join(__dirname, '../');
    const dbPath = path.join(ABS_PATH, `/db/${dbName}.db`);

    return new Promise((resolve, reject) => {
        db = new sqlite3.Database(dbPath, (err) => {
    
            if(err){
                helpers.log(err, 'error');
                reject(err);
            }
        
        });

        helpers.log('Connected successfully to ' + dbPath);
        resolve(db);
    });

};

database.getDbOld = async () => {

    if(!db){
        helpers.log('Database not even opened. caution...', 'error');
    }

    return db;
}

database.closeOld = async () => {

    if(!db){
        helpers.log('Database not even opened. aborting...')
        return;
    }
    
    if(db){

        return new Promise((resolve, reject) => {
            db.close((err) => {
                if(err) {
                    helpers.log(err);
                    reject(err);
                }
                console.log('Database successfully closed');
                db = null;
                resolve(null);
            })
        })
    }
}

database.queryOld = async (queryString, params = []) => {

    await database.open();
    const results = await database.queryRaw(queryString, params);
    await database.close();

    return results;

}

database.queryRawOld = async (queryString, params = []) => {

    //const db = database.open();

    db.serialize(() => {
        db.all(queryString, params, (err, rows) => {

            if(err){
                helpers.log(err, 'error');
            }

            return rows;

        });
    });

    //database.close();

}

module.exports = database;