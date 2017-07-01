const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)


function createFood(name, calories, active) {
  return database.raw(
    'INSERT INTO foods (name, calories, active, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
    [name, calories, active, new Date, new Date]
  )
}

function emptyFoodsTable() {
  return database.raw('TRUNCATE foods RESTART IDENTITY')
}

module.exports = {
  createFood: createFood,
  emptyFoodsTable: emptyFoodsTable
}
