var assert = require('chai').assert
var app = require('../server')
var request = require('request')
var pry = require('pryjs')

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



})
