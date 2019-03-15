const sequelize = require('sequelize');
const config = require('../config/database');

const main = new sequelize(
    config.main.database, 
    config.main.user, 
    config.main.password, {
        dialect: 'mysql',
        host: config.main.host,
        operatorsAliases: false,
        logging: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const other = new sequelize(
    config.other.database, 
    config.other.user, 
    config.other.password, {
        dialect: 'mysql',
        host: config.other.host,
        operatorsAliases: false,
        logging: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

function model(name) 
{   
    switch (name) 
    {
        case 'main': return main;
        case 'other': return other;
        default: return main.import(__dirname + '/' + name);
    }
}

module.exports = model;