exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
    .then(function () {
      return Promise.all([
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["banana", 200, new Date(), new Date()]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["crepe", 230, new Date(), new Date()]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["croissant", 280, new Date(), new Date()]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["baguette", 200, new Date(), new Date()]
        )
      ])
    })
}
