var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.set('port', process.env.PORT || 3000)
app.locals.title = "Quantified Self"
app.locals.foods = {

}
app.user(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))

app.get('/api/foods/:id', function(request, response) {
  var id = request.params.id
  database.raw("SELECT * FROM foods WHERE id=?", [id])
  .then(function(data) {
    if (data.rowCount == 0) { return
      response.sendStatus(404) }
      response.json(data.row[0])
  })
})

if(!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}
