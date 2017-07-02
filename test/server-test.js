var assert = require('chai').assert
var app = require('../server')
var request = require('request')
var Food = require('../lib/models/food')

describe('Server', function() {

  before(function(done) {
    this.port = 7878
    this.server = app.listen(this.port, function(error, result) {
      if (error) { return done(error) }
      done()
    })

    this.request = request.defaults({
      baseUrl: 'http://localhost:7878'
    })
  })

  after(function() {
    this.server.close()
  })

  it('exists', function() {
    assert(app)
  })
})

describe('GET /', function() {

  it('returns a 200', function(done) {
    this.request.get('/', function(error, response) {
      if (error) { done(error) }
      assert.equal(response.statusCode, 200)
      done()
    })
  })

  it('has a body with the name of the application', function(done) {
    var title = app.locals.title

    this.request.get('/', function(error, response) {
      if (error) { done(error) }
      assert(response.body.includes(title), `"${response.body}" does not include "${title}".`)
      done()
    })
  })
})

describe('POST /api/foods', function() {
  beforeEach(function() {
    app.locals.foods = {}
  })
  it('does not return a 404', function(done) {
    this.request.post('/api/foods', function(error, response) {
      if (error) { done(error) }
      assert.notEqual(response.statusCode, 404)
      done()
    })
  })

  it('should receive and store data', function(done) {
    var foods = {
      name: 'Pineapples'
    }
    this.request.post('/api/foods', { form: foods }, function(error, response) {
      if (error) { done(error) }

      var foodCount = Object.keys(app.locals.foods).length

      assert.equal(foodCount, 1)
      done()
    })
  })
})

describe('GET /api/foods/:id', function() {
  this.timeout(10000000)
  beforeEach(function(done) {
    Food.createFood("Banana", 15, new Date())
    .then(function() { done() })
    })

    afterEach(function(done) {
      Food.emptyFoodsTable().then(function() { done()
    })
  })

  it('returns a 404 if the resource is not found', function(done) {
    this.request.get('/api/foods/456', function(error, response) {
      if (error) { done(error) }
      assert.equal(response.statusCode, 404)
      done()
    })
  })

  it('has the id, name and calories from the resource', function(done) {
    var ourRequest = this.request
    Food.findFirst()
    .then(function(data) {
      var id = data.rows[0].id
      var name = data.rows[0].name
      var calories = data.rows[0].calories
      var created_at = data.rows[0].created_at
      ourRequest.get('/api/secrets/' + id, function(error, response) {
        if (error) { done(error) }

        var parsedFood = JSON.parse(response.body)
        assert.equal(parsedFood.id, id)
        assert.equal(parsedFood.name, name)
        assert.equal(parsedFood.calories, calories)
        assert.ok(parsedFood.created_at)
        done()
      })
    })
  })
})
