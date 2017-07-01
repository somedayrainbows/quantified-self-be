var assert = require('chai').assert
var app = require('../server')
var request = require('request')

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

  after(function(){
    this.server.close()
  })

  it('exists', function() {
    assert(app)
  })

  describe('GET /api/foods/:id', function() {
    this.timeout(10000000)

    beforeEach(function(done) {
      Food.createFood("").then(function() { done() })
    })

    afterEach(function(done) {
      Food.emptyFoodsTable().then(function() {
        done()
      })
    })

  })


})
