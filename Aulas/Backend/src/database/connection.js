const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

//exportando a connection string
module.exports = connection;