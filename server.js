var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var Food = require('./lib/models/food')


app.set('port', process.env.PORT || 7878);
app.locals.title = "Quantified Self"
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(request, response) {
  response.send(app.locals.title);
})

app.get('/api/v1/foods', function(request, response) {
  Food.all()
    .then(function(data) {
      if(data.rowCount == 0) {
        return response.status(422).send({ error: 'No records found' })
      }
      response.json(data.rows)
    })
})

app.get('/api/v1/foods/:id', function(request, response) {
  var id = request.params.id

  Food.find(id)
    .then(function(data) {
      if(data.rowCount == 0) { return response.sendStatus(404) }
      response.json(data.rows[0])
    })
})

app.put('/api/v1/foods/:id', function (request, response) {
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

app.delete('/api/v1/foods/:id', function (request, response) {
  var id = request.params.id

  Food.destroy(id)
    .then(function() {
      Food.find(id)
        .then(function(data) {
          if(data.rowCount == 0) {
            return response.status(204).send({ success: 'Record was successfully deleted' })
          }
        })
    })
})

if(!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(app.locals.title + " is running on " + app.get('port') + ".")
  })
}

module.exports = app
