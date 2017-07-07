const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)


function all() {
  return database.raw('SELECT * FROM foods')
}

function createFood(name, calories, active) {
  return database.raw(
    'INSERT INTO foods (name, calories, active, created_at, updated_at) VALUES (?,?,?,?,?)',
    [name, calories, active, new Date(), new Date()]
  )
}

function emptyFoodsTable() {
  return database.raw('TRUNCATE foods RESTART IDENTITY')
}

function find(id) {
  return database.raw('SELECT * FROM foods WHERE id=?', [id])
}

function findByName(name) {
  return database.raw('SELECT * FROM foods WHERE name=?', [name])
}

function update(id, payload) {
  var name = payload.name
  var calories = payload.calories

  switch(true) {
    case (Object.keys(payload).length == 2):
      return database.raw('UPDATE foods SET name=?, calories=?, updated_at=? WHERE id=?', [name, calories, new Date(), id])
      break
    case (typeof name !== 'undefined'):
      return database.raw('UPDATE foods SET name=?, updated_at=? WHERE id=?', [name, new Date(), id])
      break
    case (typeof calories !== 'undefined'):
      return database.raw('UPDATE foods SET calories=?, updated_at=? WHERE id=?', [calories, new Date(), id])
      break
  }
}

function destroy(id) {
  return database.raw('DELETE FROM foods WHERE id=?', [id])
}

module.exports = {
  all: all,
  createFood: createFood,
  emptyFoodsTable: emptyFoodsTable,
  find: find,
  update: update,
  findByName: findByName,
  destroy: destroy
}
