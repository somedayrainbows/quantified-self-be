var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.set('port', process.env.PORT || 7878);
app.locals.title = "Quantified Self"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(require('./routes/foods'))
app.use(require('./routes/meals'))

app.use(function(request, response, next) {
  console.log('Something is happening...')
  next()
})

app.get('/', function(request, response) {
  response.send(app.locals.title);
})



if(!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(app.locals.title + " is running on " + app.get('port') + ".")
  })
}

module.exports = app
