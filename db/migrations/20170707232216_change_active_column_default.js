exports.up = function(knex, Promise) {
  let alterQuery = `ALTER TABLE foods ALTER COLUMN active SET DEFAULT true`
  return knex.raw(alterQuery)
};

exports.down = function(knex, Promise) {
  let downQuery = `ALTER TABLE foods ALTER COLUMN active DROP DEFAULT`
  return knex.raw(downQuery)
};
