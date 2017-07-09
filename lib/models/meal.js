const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)


function all() {
  return database.raw('SELECT * FROM meals')
}

function createMeal(name, goal_calories) {
  return database.raw(
    'INSERT INTO meals (name, goal_calories, created_at) VALUES (?,?,?)',
    [name, goal_calories, new Date()]
  )
}

function emptyMealsTable() {
  return database.raw('TRUNCATE meals RESTART IDENTITY')
}

function find(id) {
  return database.raw('SELECT * FROM meals WHERE id=?', [id])
}

function findByName(name) {
  return database.raw('SELECT * FROM meals WHERE name=?', [name])
}

function destroy(id) {
  return database.raw('DELETE FROM meals WHERE id=?', [id])
}

function foods(meal_id) {
  return database.raw(
    `SELECT f.*
    FROM meals AS m
    INNER JOIN meal_foods AS mf ON m.id = mf.meal_id
    INNER JOIN foods AS f ON mf.food_id = f.id
    WHERE m.id=?`, [meal_id]
  )
}

module.exports = {
  all: all,
  createMeal: createMeal,
  emptyMealsTable: emptyMealsTable,
  find: find,
  findByName: findByName,
  destroy: destroy,
  foods: foods
}
