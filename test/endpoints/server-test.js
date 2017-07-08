var assert = require('chai').assert
var app = require('../../server')
var request = require('request')
var Food = require('../../lib/models/food')
var Meal = require('../../lib/models/meal')


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


  describe('GET /api/v1/foods', function() {
    beforeEach(function(done) {
      Food.createFood('banana', 200)
        .then(function() {
          Food.createFood('taco', 400)
            .then(function() {
              Food.createFood('cheetos', 150)
                .then(function() { done() })
            })
        })
    })
    // beforeEach(() => knex.migrate.rollback()
    //   .then(() => knex.migrate.latest())
    //   .then(() => knex.seed.run())
    // );
    //
    // afterEach(function(done) {
    //   knex.migrate.rollback()
    //   .then(function() {
    //     done();
    //   });
    // });
    afterEach(function(done) {
      Food.emptyFoodsTable().then(function() { done() })
    })

    it('returns a list of all foods', function(done) {
      this.request.get('/api/v1/foods', function(error, response) {
        if (error) { done(error) }

        var allFood = JSON.parse(response.body)

        assert.equal(allFood.length, 3)
        assert.equal(allFood[0].name, 'banana')
        assert.equal(allFood[2].name, 'cheetos')
        assert.equal(allFood[1].calories, 400)
        assert.ok(allFood[1].created_at)
        assert.ok(allFood[2].updated_at)
        assert.isUndefined(allFood[10])
        done()
      })
    })
  })


  describe('GET /api/v1/foods/:id', function() {
    beforeEach(function(done) {
      Food.createFood('banana', 200)
        .then(function() {
          Food.createFood('taco', 400)
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
        assert.equal(parsedFood.active, true)
        assert.ok(parsedFood.created_at)
        assert.ok(parsedFood.updated_at)
        done()
      })
    })
  })

  describe('POST /api/v1/foods', function() {
    beforeEach(function(done) {
      Food.createFood('banana', 200)
      .then(function() {
        Food.createFood('taco', 400)
        .then(function() { done() })
      })
    })

    afterEach(function(done) {
      Food.emptyFoodsTable().then(function() { done() })
    })

    it('should receive and store data', function(done) {
      var postOptions = {
          url: '/api/v1/foods',
          method: 'POST',
          json: true,
          body: {
            name: 'pasta',
            calories: 200
          }
      }

    this.request(postOptions, function(error, response) {
      if (error) { done(error) }

      assert.equal(response.body.id, 3)
      assert.equal(response.body.name, "pasta")
      assert.equal(response.body.calories, 200)
      assert.equal(response.body.active, true)
      assert.ok(response.body.created_at)
      done()
      })
    })
  })

  describe('PUT /api/v1/foods/:id', function() {
    beforeEach(function(done) {
      Food.createFood('banana', 200)
        .then(function() {
          Food.createFood('taco', 400)
            .then(function() { done() })
        })
    })

    afterEach(function(done) {
      Food.emptyFoodsTable().then(function() { done() })
    })

    it('should update a food\'s name', function(done) {
      var putOptions = {
        url: '/api/v1/foods/1',
        method: 'PUT',
        json: true,
        body: {
          name: 'steak'
        }
      }

      this.request(putOptions, function(error, response) {
        if(error) { done(error) }

        assert.equal(response.body.id, 1)
        assert.equal(response.body.name, 'steak')
        assert.equal(response.body.calories, 200)
        assert.equal(response.body.active, true)
        assert.ok(response.body.created_at)
        assert.notEqual(response.body.updated_at, response.body.created_at)
        done()
      })
    })

    it('should update a food\'s calories', function(done) {
      var putOptions = {
        url: '/api/v1/foods/2',
        method: 'PUT',
        json: true,
        body: {
          calories: 5000
        }
      }

      this.request(putOptions, function(error, response) {
        if(error) { done(error) }

        assert.equal(response.body.id, 2)
        assert.equal(response.body.name, 'taco')
        assert.equal(response.body.calories, 5000)
        assert.equal(response.body.active, true)
        assert.ok(response.body.created_at)
        assert.notEqual(response.body.updated_at, response.body.created_at)
        done()
      })
    })

    it('should update a food\'s name and calories', function(done) {
      var putOptions = {
        url: '/api/v1/foods/1',
        method: 'PUT',
        json: true,
        body: {
          name: 'tomato',
          calories: 7777
        }
      }

      this.request(putOptions, function(error, response) {
        if(error) { done(error) }

        assert.equal(response.body.id, 1)
        assert.equal(response.body.name, 'tomato')
        assert.equal(response.body.calories, 7777)
        assert.equal(response.body.active, true)
        assert.ok(response.body.created_at)
        assert.notEqual(response.body.updated_at, response.body.created_at)
        done()
      })
    })
  })


  describe('DELETE /api/v1/foods/:id', function() {
    beforeEach(function(done) {
      Food.createFood('banana', 200)
        .then(function() {
          Food.createFood('taco', 400)
            .then(function() { done() })
        })
    })

    afterEach(function(done) {
      Food.emptyFoodsTable().then(function() { done() })
    })


    it('should delete a food given an id', function(done) {
      var id = 1
      var ourRequest = this.request

      deleteOptions = {
        url: '/api/v1/foods/' + id,
        method: 'DELETE'
      }

      ourRequest(deleteOptions, function(error, response) {
        if(error) { done(error) }
        assert.equal(response.statusCode, 200)

        var parsedFood = JSON.parse(response.body)

        assert.equal(parsedFood.length, 2)
        assert.equal(parsedFood[0].name, 'taco')
        assert.equal(parsedFood[0].calories, 400)
        assert.equal(parsedFood[0].active, true)
        assert.ok(parsedFood[0].created_at)
        assert.ok(parsedFood[0].updated_at)

        ourRequest.get('api/v1/foods/1', function(error, response) {
          if(error) { done(error) }
          assert.equal(response.statusCode, 200)

          var deletedFood = JSON.parse(response.body)

          assert.equal(deletedFood.name, 'banana')
          assert.equal(deletedFood.calories, 200)
          assert.equal(deletedFood.active, false)
          assert.ok(deletedFood.created_at)
          assert.ok(deletedFood.updated_at)
          done()
        })
      })
    })

    describe('GET /api/v1/meals/:id', function() {
      beforeEach(function(done) {
        Meal.createMeal('Breakfast', 400)
          .then(function() {
            Meal.createMeal('Lunch', 600)
              .then(function() { done() })
          })
      })

      afterEach(function(done) {
        Meal.emptyMealsTable().then(function() { done() })
      })


      it('should return a 404 if the resource is not found', function(done) {
        this.request.get('/api/v1/meals/100000', function(error, response) {
          if(error) { done(error) }

          assert.equal(response.statusCode, 404)
          console.log('That meal doesn\'t exist.')
          done()
        })
      })

      it('should find a meal by id', function(done) {
        var id = 1

        this.request.get('/api/v1/meals/' + id, function(error, response) {
          if(error) { done(error) }

          var parsedMeal = JSON.parse(response.body)

          assert.equal(parsedMeal.id, id)
          assert.equal(parsedMeal.name, 'Breakfast')
          assert.equal(parsedMeal.goal_calories, 400)
          assert.ok(parsedMeal.created_at)
          done()
        })
      })

      it('should find a different meal by id', function(done) {
        var id = 2

        this.request.get('/api/v1/meals/' + id, function(error, response) {
          if(error) { done(error) }

          var parsedMeal = JSON.parse(response.body)

          assert.equal(parsedMeal.id, id)
          assert.equal(parsedMeal.name, 'Lunch')
          assert.equal(parsedMeal.goal_calories, 600)
          assert.ok(parsedMeal.created_at)
          done()
        })
      })
    })

  })
})
