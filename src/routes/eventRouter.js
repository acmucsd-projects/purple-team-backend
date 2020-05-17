//dependencies
const routes = require('express').Router();

const { Event } = require('../database/models/eventsModel');
const { getDatabase } = require('../database/mongo');
const dbHandler = require('../test/db-handler')
const ObjectId = require('mongodb').ObjectID;

// POST a new event to the database
routes.post('/event', (request, res) => {
  if (!request.body || request.body == {}) {
    return res.send('no request body');
  }
  const event = new Event({
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
    await Event.findOneAndDelete({ event: req.body.id });
    res.json({ msg: 'Event deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET all events from the database
routes.get("/event", (request, res) => {
  Event.find(function (err, events) {
    if (err) {
      console.log('error ', err.res);
    }
    else {
      res.status(200).json(events);
    }
  })
})

// GET all events from the database
routes.get("/event", (request, res) => {
  Event.find(function (err, events) {
    if (err) {
      console.log('error ', err.res);
    }
    else {
      res.status(200).json(events);
    }
  })
})

// GET specific events from the database via a "query" (title search, description, time, etc.)
routes.get("/event/:query", (request, res) => {
    if (request.body && request.params.query == "id"){
      const event = Event.find({ _id: new ObjectId(request.body._id)}, function(err, events){
        if (err) {
          console.log('error ', err);
        }
        else {
          res.status(200).json(events);
        }
      });
    }
    else {
      const event = Event.find({ $text: { $search: request.params.query}}, function(err, events){
        if (err) {
          console.log('error ', err);
        }
        else {
          res.status(200).json(events);
        }
      });
    }
})

module.exports = routes;
