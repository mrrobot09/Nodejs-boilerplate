'use strict';

const config = require('../config/constant');
const Sequelize = require('sequelize');

const db = new Sequelize({
    host: config.DB_HOST,
    database: config.DB_DATABASE,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    dialect: 'mysql',
    pool: {
        maxConnections: 300,
        acquire: 30000,
        idle: 10000
    }

});


db
    .authenticate()
    .then(() => {
        console.log('\n\tConnection has been established successfully.');
    })
    .catch(err => {
        console.log(err);
        console.error('Unable to connect to the database:');
    });


module.exports = db;
