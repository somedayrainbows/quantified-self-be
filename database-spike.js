const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

database.raw(
  'INSERT INTO foods (name, calories, created_at) VALUES (?,?,?)', ["Avocado", 20, new Date()]
).then(function() {
  database.raw('SELECT * FROM foods')
  .then(function(data) {
    console.log(data.rows)
    process.exit()
  })
})
