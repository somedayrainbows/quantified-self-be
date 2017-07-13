exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
    .then(function () {
      return Promise.all([
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["Banana", 200, new Date(), new Date()]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["Crepe", 230, new Date(), new Date()]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["Croissant", 280, new Date(), new Date()]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["Baguette", 200, new Date(), new Date()]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["Yogurt", 150, new Date(), new Date()]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["Sandwich", 330, new Date(), new Date()]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["Soup", 200, new Date(), new Date()]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["Caviar", 200, new Date(), new Date()]
        )
      ])
    })
}
