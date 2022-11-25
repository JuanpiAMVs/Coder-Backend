const knexConfig = require('../config')
const knex = require('knex')(knexConfig)

knex.schema.createTable('products', table => {
    table.increments('id'),                     // crea una clave auto-incremental con el nombre id
    table.string('name').notNullable()          // no permite name como nulo     
    table.string('code'),         
    table.float('price'),
    table.integer('stock')
}).then(() => {
    console.info('Table created');
}).catch(err => {
    console.error(err)
}).finally(() => {
    knex.destroy();
})