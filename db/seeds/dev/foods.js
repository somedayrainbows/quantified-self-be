exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
  .then(function () {
    return Promise.all([
      knex.raw(
        'INSERT INTO foods (name, calories, active, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
        ["banana", 200, true, new Date(), new Date()]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, active, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
        ["baguette", 500, false, new Date(), new Date()]
      )
    ])
  })
}
