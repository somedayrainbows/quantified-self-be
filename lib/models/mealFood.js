const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)


function createMealFood(food_id, meal_id) {
  return database.raw('INSERT INTO meal_foods (food_id, meal_id, created_at) VALUES (?,?,?)', [food_id, meal_id, new Date()])
}

function emptyMealFoodsTable() {
  return database.raw('TRUNCATE meal_foods RESTART IDENTITY')
}

module.exports = {
  createMealFood: createMealFood,
  emptyMealFoodsTable: emptyMealFoodsTable
}
