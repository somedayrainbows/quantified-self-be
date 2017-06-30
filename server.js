var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.set('port', process.env.PORT || 3000);
app.locals.title = "Quantified Self"
app.locals.foods = {
  
}
