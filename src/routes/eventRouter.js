//dependencies
const routes = require('express').Router();
const data = require('../../exampleData.json');
const { Event } = require('../database/models/eventsModel');
const { getDatabase } = require('../database/mongo');

// GET JSON of all events
routes.get('/all', async (req, res, next) => {

    Event.find(function (err, messages) {
        if (err) {
          console.log('error ', err.res);
        }
        else {
          console.log(messages);
          res.status(200).json(messages);
        }
      })
});


// POST a new event to the database
routes.post('/event', (request, res) => {
    console.log(request.body);
    if (!request.body || request.body == {}){
      return res.send("no request body")
    }
    var event = new Event({
        title: request.body.title,
        description: request.body.description,
        startTime: request.body.startTime,
        endTime: request.body.endTime,
        checkIn: request.body.checkIn,
        url: request.body.url
    }).save((err, response) => {
        if (err) res.status(400).send(err)
        res.status(200).send(response)
    })
    
});

routes.get("/event/:query", (request, res) => {
    var event = Event.find({ $text: { $search: request.params.query}}, function(err, messages){
      if (err) {
        console.log('error ', err);
      }
      else {
        res.status(200).json(messages);
      }
    });
})


module.exports = routes;