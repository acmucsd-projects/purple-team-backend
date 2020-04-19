var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Event model consisting of the event title, description, start and end time, checkIn code, and splash URL
var eventSchema = new Schema(
    {
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    checkIn: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: false
    }
})

const Event = mongoose.model("Event", eventSchema);

module.exports = {Event};