var express = require('express')
var router = express.Router()
var Food = require('../lib/models/food')
var Meal = require('../lib/models/meal')
var MealFood = require('../lib/models/mealFood')


router.get('/api/v1/meals/:id', function(request, response) {
  var id = request.params.id

  Meal.find(id)
    .then(function(data) {
      if(data.rowCount == 0) { return response.sendStatus(404) }
      response.json(data.rows[0])
    })
})

router.post('/api/v1/meals/:id', function(request, response) {
  var idMeal = parseInt(request.params.id, 10)
  var name = request.body.name

  Meal.find(idMeal)
    .then(function(data) {
      if(data.rowCount == 0) { return response.sendStatus(404) }
    })

  Food.findByName(name)
    .then(function(data) {
      if(data.rowCount == 0) { return response.sendStatus(404) }

      var idFood = data.rows[0].id

      MealFood.createMealFood(idFood, idMeal)
        .then(function() {
          Meal.foods(idMeal)
            .then(function(data) {
              if(data.rowCount == 0) {return response.sendStatus(404)}

              response.json(data.rows)
            })
        })
    })
})

module.exports = router
