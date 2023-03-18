const express = require('express');
const birds = require('./birds');
const app = express();
const PORT = 3000;
const expect = require('chai').expect;
// Makes it easy to send API calls to our server
const request = require('supertest');

let router = express.Router();

router.route('/').get(function(req, res) {
    return res.json({goodCall: true});
  });

router.route('/secret').get(function(req,res){
    return res.json({answer: "Secret"});
})
app.use(router);


app.get('/', (req,res) =>{
    res.send("Hello World");
})

app.get('/prut', (req,res,next) => {
    console.log("I'm about to fart");
    next()
}, (req,res) => {
    res.redirect('/secret');
})

app.all('/secret', (req,res,next) => {
    res.send("secret")
    next();
})



// UNIT TESTS
describe('Our application', function() {
    let date;
  
    // Timeout for tests that take time
    this.timeout(5000);
  
    // Called once before any of the tests in this block begin.
    before(function(done) {
      // Any asynchronous action with a callback.
      app.listen(3000, function(err) {
        if (err) { return done(err); }
        done();
      });
    });
  
    // Called once before each of the tests in this block.
    beforeEach(function() {
      date = new Date();
    });
  
    // Called after all of the tests in this block complete.
    after(function() {
      console.log("Our applicationa tests done!");
    });
  
    // Called once after each of the tests in this block.
    afterEach(function() {
      console.log("The date for that one was", date);
    });

    it('Test connection is established', function(done){
        request(app)
            .get('/')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/).expect(200, function(err, res) {
                if(err){
                    return done(err);
                }
                callStatus = res.body.goodCall;
                expect(callStatus).to.equal(true);

                done();
            })

    })

    it('Test connection to secret', function(done){
        request(app)
            .get('/secret')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/).expect(200, function(err, res) {
                if(err){
                    return done(err);
                }
                answer = res.body.answer;
                expect(answer).to.equal("Secret");

                done();
            })

    })
  
    it('should understand basic mathematical principles', function() {
      // We want tests to pass.
      if (5 == 3) {
        // Hope we don't get here.
        throw new Error("Oh no.");
      }
    });
  
    it('should understand basic truths', function() {
      // We want tests to pass.
      if (false) {
        // Hope we don't get here.
        throw new Error("Oh no.");
      }
    });
  
    describe('(deeper)', function() {
  
      // Called once before any of the tests in this block begin.
      before(function() {
        console.log("Begin going deeper!")
      });
  
      it('should perform basic math', function() {
        // We want tests to pass.
        if (1+1 != 2) {
          // Hope we don't get here.
          throw new Error("Oh no.");
        }
      });
  
      it('should perform basic counting', function() {
        // We want tests to pass.
        if ('abc'.length != 3) {
          // Hope we don't get here.
          throw new Error("Oh no.");
        }
      });

      it('expecting this arent equal what they should', function(){

        expect(5).to.not.equal(3);
        expect(6).to.equal(6);
      })
  
    });
  
  });