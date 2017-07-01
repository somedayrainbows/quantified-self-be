var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var pry = require('pryjs')

app.set('port', process.env.PORT || 7878);
app.locals.title = "Quantified Self"
app.locals.foods = {
  test: "foo"
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(request, response) {
  response.send(app.locals.title);
})

if(!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(app.locals.title + " is running on " + app.get('port') + ".")
  })
}


module.exports = app
