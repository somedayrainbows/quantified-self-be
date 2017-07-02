const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)
var pry = require('pryjs')


function createFood(name, calories, active) {
  return database.raw(
    'INSERT INTO foods (name, calories, active, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
    [name, calories, active, new Date(), new Date()]
  )
}

function emptyFoodsTable() {
  return database.raw('TRUNCATE foods RESTART IDENTITY')
}

function find(id) {
  return database.raw('SELECT * FROM foods WHERE id=?', [id])
}

module.exports = {
  createFood: createFood,
  emptyFoodsTable: emptyFoodsTable,
  find: find
}
