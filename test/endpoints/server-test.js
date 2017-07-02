var assert = require('chai').assert
var app = require('../../server')
var request = require('request')
var pry = require('pryjs')
var Food = require('../../lib/models/food')


describe('Server', function() {
  before(function(done) {
    this.port = 7878
    this.server = app.listen(this.port, function(error, result) {
      if(error) { return done(error) }
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


  describe('GET /', function() {
    it('should return a 200', function(done) {
      this.request.get('/', function(error, response) {
        if(error) { done(error) }

        assert.equal(response.statusCode, 200)
        done()
      })
    })
  })


  describe('GET /api/v1/foods/:id', function() {
    this.timeout(10000000)

    beforeEach(function(done) {
      Food.createFood('banana', 200, true)
      .then(function() {
        Food.createFood('taco', 400, false)
        .then(function() { done() })
      })
    })

    afterEach(function(done) {
      Food.emptyFoodsTable().then(function() { done() })
    })


    it('should return a 404 if the resource is not found', function(done) {
      this.request.get('/api/v1/foods/100000', function(error, response) {
        if(error) { done(error) }

        assert.equal(response.statusCode, 404)
        done()
      })
    })

    it('should find a food by id', function(done) {
      var id = 1

      this.request.get('/api/v1/foods/' + id, function(error, response) {
        if(error) { done(error) }

        var parsedFood = JSON.parse(response.body)

        assert.equal(parsedFood.id, id)
        assert.equal(parsedFood.name, 'banana')
        assert.equal(parsedFood.calories, 200)
        assert.equal(parsedFood.active, true)
        assert.ok(parsedFood.created_at)
        assert.ok(parsedFood.updated_at)
        done()
      })
    })

    it('should find a different food by id', function(done) {
      var id = 2

      this.request.get('/api/v1/foods/' + id, function(error, response) {
        if(error) { done(error) }

        var parsedFood = JSON.parse(response.body)
        assert.equal(parsedFood.id, id)
        assert.equal(parsedFood.name, 'taco')
        assert.equal(parsedFood.calories, 400)
        assert.equal(parsedFood.active, false)
        assert.ok(parsedFood.created_at)
        assert.ok(parsedFood.updated_at)
        done()
      })
    })
  })
})
