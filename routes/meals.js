var express = require('express')
var router = express.Router()
var Meal = require('../lib/models/meal')


router.get('/api/v1/meals/:id', function(request, response) {
  var id = request.params.id

  Meal.find(id)
    .then(function(data) {
      if(data.rowCount == 0) { return response.sendStatus(404) }
      response.json(data.rows[0])
    })
})

module.exports = router
