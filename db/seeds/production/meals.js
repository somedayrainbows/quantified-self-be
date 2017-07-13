exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY')
    .then(function () {
      return Promise.all([
        knex.raw(
          'INSERT INTO meals (name, goal_calories, created_at) VALUES (?, ?, ?)',
          ["Breakfast", 400, new Date()]
        ),
        knex.raw(
          'INSERT INTO meals (name, goal_calories, created_at) VALUES (?, ?, ?)',
          ["Lunch", 600, new Date()]
        ),
        knex.raw(
          'INSERT INTO meals (name, goal_calories, created_at) VALUES (?, ?, ?)',
          ["Dinner", 800, new Date()]
        ),
        knex.raw(
          'INSERT INTO meals (name, goal_calories, created_at) VALUES (?, ?, ?)',
          ["Snacks", 200, new Date()]
        )
      ])
    })
}
