// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Cylon      = require('cylon')

// DB setup
var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database

// Initialize the robot
var Cylon = require('cylon');

// define the robot
var robot = Cylon.robot({
  // change the port to the correct one for your Arduino
  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/ttyACM0' }
  },

  devices: {
    led: { driver: 'led', pin: 13 }
  },

  work: function(my) {
    every((1).second(), my.led.toggle);
  }
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8090;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
Cylon.robot({
  // connections: {
  //   arduino: { adaptor: 'firmata', port: '/dev/ttyACM0' }
  // },
  //
  // devices: {
  //   led: { driver: 'led', pin: 13 },
  //   button: { driver: 'button', pin: 2 }
  // },

  work: function(my) {
    // led on
    router.get('/led/on', function(req, res) {
      console.log("this turns on the led");
      //  my.led.toggle();
        res.json({ message: 'turing led on' });
    });
    // led ff
    router.get('/led/off', function(req, res) {
      console.log("this turns on the led");
      //  my.led.toggle();
      res.json({ message: 'turing led off' });
    });

    // servo
    router.get('/servo/:position', function(req, res) {
          res.json({ message: 'moving servo to postion ' + req.params.position});
    });
  }
}).start();

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
