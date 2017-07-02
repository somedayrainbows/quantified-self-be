var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var Food = require("./lib/models/food")
var md5 = require('md5')


app.set('port', process.env.PORT || 7878)
app.locals.title = "Quantified Self"
app.locals.foods = {
  name: 'Banana'
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))

app.get('/', function(request, response) {
  response.send(app.locals.title)
})

app.get('/api/foods/:id', function(request, response) {
  var id = request.params.id
  Food.find(id)
  .then(function(data) {
    if (data.rowCount == 0) { return response.sendStatus(404) }
      response.json(data.row[0])
  })
})

app.post('/api/foods', function(request, response) {
  var id = Date.now()
  var name = request.body.name
  // var name = request.body.name
  // var calories = request.body.calories
  // var created_at = request.body.created_at
  // var message = request.data.rows[data.rows.length]
  // var id = md5(message)
  // example usage for md5:
  // var msg = “super secret code”;
  // var hash = md5(msg);

  if (!name) {
    return response.status(422).send({
      error: 'No name property provided'
    })
  }
  // } else if (!calories) {
  //   return response.status(422).send({
  //     error: 'No calories property provided'
  //   })
  // } else {
  //   id = md5(message)
    app.locals.foods[id] = name
    response.status(201).json({ id, name } )
})

if(!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app
