var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var md5 = require('md5')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))

app.set('port', process.env.PORT || 3000)
app.locals.title = "Quantified Self"
app.locals.foods = {
  wowowow: 'I am a banana'
}

app.get('/', function(request, response) {
  response.send(app.locals.title)
})

app.get('/api/foods/:id', function(request, response) {
  var id = request.params.id
  database.raw("SELECT * FROM foods WHERE id=?", [id])
  .then(function(data) {
    if (data.rowCount == 0) { return
      response.sendStatus(404) }
      response.json(data.row[0])
  })
})

app.post('/api/foods', function(request, response) {
  var message = request.body.message
  var id = md5(message)

  if (!message) {
    return response.status(422).send({
      error: 'No message property provided'
    })
  } else {
    id = md5(message)
    app.locals.foods[id] = message
    response.status(201).json({ id, message} )
  }
})

if(!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app
