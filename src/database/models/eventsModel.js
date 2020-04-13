var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Event model consisting of the event title, start and end time, and checkIn code
var eventSchema = new Schema(
    {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
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
//eventSchema.index({title: "text", description: "text", startTime: "text", checkIn: "text"})
const Event = mongoose.model("Event", eventSchema);

module.exports = {Event};