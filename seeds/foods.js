
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
    .then(function() {
      return Promise.all([
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?,?,?)',
          ['Banana', 15, new Date()]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?,?,?)',
          ['Egg', 65, new Date()]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?,?,?)',
          ['Toast', 100, new Date()]
        ),
      ])
    });
};
