var express = require('express')
var router = express.Router()
var Food = require('../lib/models/food')

router.get('/api/v1/foods', function(request, response) {
  Food.all()
    .then(function(data) {
      if(data.rowCount == 0) {
        return response.status(422).send({ error: 'No records found' })
      }
      response.json(data.rows)
    })
})

router.get('/api/v1/foods/:id', function(request, response) {
  var id = request.params.id

  Food.find(id)
    .then(function(data) {
      if(data.rowCount == 0) { return response.sendStatus(404) }
      response.json(data.rows[0])
    })
})

router.post('/api/v1/foods', function(request, response) {
  var name = request.body.name
  var calories = request.body.calories

  // if (!name) {
  //   return response.status(422).send({
  //     error: 'No name property provided!'
  //   })
  // }

  Food.createFood(name, calories)
  .then(function() {
    Food.findLastFoodCreated()
    .then(function(data) {
      response.json(data.rows[0])
    })
  })

  //   if (error)
  //   response.send(error)
  //   response.json({ message: 'Food created!' })
  //   response.status(201).json({ id, name })
})

router.put('/api/v1/foods/:id', function (request, response) {
  var id = request.params.id
  var payload = request.body

  Food.update(id, payload)
    .then(function() {
      Food.find(id)
        .then(function(data) {
          response.json(data.rows[0])
        })
    })
})

router.delete('/api/v1/foods/:id', function (request, response) {
  var id = request.params.id

  Food.deactivate(id)
    .then(function() {
      Food.all()
        .then(function(data) {
          response.json(data.rows)
        })
    })
})

module.exports = router
