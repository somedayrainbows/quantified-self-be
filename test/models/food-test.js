var Food = require('../../lib/models/food')
var assert = require('chai').assert
process.env.NODE_ENV = 'test'


describe('Food', function() {
  beforeEach(function(done) {
    Food.createFood('pizza', 1000)
      .then(function() { done() })
  })

  afterEach(function(done) {
    Food.emptyFoodsTable()
      .then(function() { done() })
  })

  describe('methods', function() {
    it('.all', function(done) {
      Food.createFood('cheeseburger', 800)
        .then(function() {
          Food.all()
            .then(function(data) {
              assert.equal(data.rows.length, 2)
              assert.equal(data.rows[0].id, 1)
              assert.equal(data.rows[0].name, 'pizza')
              assert.equal(data.rows[0].active, true)
              assert.equal(data.rows[0].calories, 1000)
              assert.ok(data.rows[0].created_at)
              assert.ok(data.rows[0].updated_at)
              assert.equal(data.rows[1].id, 2)
              assert.equal(data.rows[1].name, 'cheeseburger')
              assert.equal(data.rows[1].active, true)
              assert.equal(data.rows[1].calories, 800)
              assert.ok(data.rows[1].created_at)
              assert.ok(data.rows[1].updated_at)
              done()
            })
        })
    })

    it('.find(id)', function(done) {
      var id = 1

      Food.find(id)
        .then(function(data) {
          assert.equal(data.rows.length, 1)
          assert.equal(data.rows[0].id, 1)
          assert.equal(data.rows[0].name, 'pizza')
          assert.equal(data.rows[0].active, true)
          assert.equal(data.rows[0].calories, 1000)
          assert.ok(data.rows[0].created_at)
          assert.ok(data.rows[0].updated_at)
          done()
        })
    })
  })
})
