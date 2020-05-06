//dependencies
const routes = require('express').Router();

const { Event } = require('../database/models/eventsModel');
const { getDatabase } = require('../database/mongo');
const dbHandler = require('../test/db-handler')
var ObjectId = require('mongodb').ObjectID;

// GET JSON of all events
routes.get('/all', async (req, res, next) => {
  Event.find(function(err, events) {
    if (err) {
      console.log('error ', err.res);
    } else {
      res.status(200).json(events);
    }
  });
});

// POST a new event to the database
routes.post('/event', (request, res) => {
<<<<<<< HEAD
  if (!request.body || request.body == {}) {
    return res.send('no request body');
  }
  var event = new Event({
    title: request.body.title,
    location: request.body.location,
    startTime: request.body.startTime,
    endTime: request.body.endTime,
    checkIn: request.body.checkIn,
    tags: request.body.tags,
    url: request.body.url
  }).save((err, response) => {
    if (err) res.status(400).send(err);
    res.status(200).send(response);
  });
});

// @route    DELETE event
// @desc     Delete an event
// @access   Private
routes.delete('/event', async (req, res) => {
  try {
    // Remove event
    await Event.findOneAndRemove({ event: req.body.id });
=======
  if (!request.body || request.body == {}){
    return res.send("no request body")
  }
  var event = new Event({
      title: request.body.title,
      location: request.body.location,
      startTime: request.body.startTime,
      endTime: request.body.endTime,
      checkIn: request.body.checkIn,
      url: request.body.url
  }).save((err, response) => {
      if (err) res.status(400).send(err)
      res.status(200).send(response)
  })
    
});

// GET specific events from the database via a "query" (title search, description, time, etc.)
routes.get("/event/:query", (request, res) => {
    if (request.body && request.params.query == "id"){
      var event = Event.find({ _id: new ObjectId(request.body._id)}, function(err, events){
        if (err) {
          console.log('error ', err);
        }
        else {
          res.status(200).json(events);
        }
      });
    }
    else {
      var event = Event.find({ $text: { $search: request.params.query}}, function(err, events){
        if (err) {
          console.log('error ', err);
        }
        else {
          res.status(200).json(events);
        }
      });
    }
})
>>>>>>> unit test for post requests

    res.json({ msg: 'Event deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET specific events from the database via a "query" (title search, description, time, etc.)
routes.get('/event/:query', (request, res) => {
  var event = Event.find({ $text: { $search: request.params.query } }, function(
    err,
    events
  ) {
    if (err) {
      console.log('error ', err);
    } else {
      res.status(200).json(events);
    }
  });
});

module.exports = routes;
