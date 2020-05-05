//dependencies
const routes = require('express').Router();

const { Event } = require('../database/models/eventsModel');
const { getDatabase } = require('../database/mongo');
const dbHandler = require('../test/db-handler')

// GET JSON of all events
routes.get('/all', async (req, res, next) => {

    Event.find(function (err, events) {
        if (err) {
          console.log('error ', err.res);
        }
        else {
          res.status(200).json(events);
        }
      })
});


// POST a new event to the database
routes.post('/event', (request, res) => {
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
    var event = Event.find({ $text: { $search: request.params.query}}, function(err, events){
      if (err) {
        console.log('error ', err);
      }
      else {
        res.status(200).json(events);
      }
    });
})


module.exports = routes;