//dependencies
const { MongoMemoryServer } = require('mongodb-memory-server');
const { Event } = require('../database/models/eventsModel');
const request = require("supertest");
const dbHandler = require('./db-handler');
const app = require("../app");
var ObjectId = require('mongodb').ObjectID;

//const mongod = new MongoMemoryServer();
jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

//const mongoose = require('mongoose');

//let connection;
let db;

var mockEvent = new Event({
  title: "watch garrett chug ketchup",
  location: "Garrett's House",
  startTime: new Date(2020, 5, 25, 15, 0, 0, 0),
  endTime: new Date(2020, 5, 25, 17, 0, 0, 0),
  checkIn: "ketchupChug",
  url: "google.com"
})

var mockEvent2 = new Event({
  title: "building a cat cafe with stanley",
  location: "qualcomm room",
  startTime: new Date(2020, 5, 15, 12, 0, 0, 0),
  endTime: new Date(2020, 5, 15, 15, 0, 0, 0),
  checkIn: "snuCafe",
  url: "roblox.com"
})
  
describe('routes', () => {

  afterEach(async () => {
    await dbHandler.clearDatabase();
    //await db.collection('events').deleteMany({});
  });

  beforeAll(async () => {
    db = await dbHandler.connect();
    
    /*const uri = await mongod.getUri();
    const port = await mongod.getPort();
    const dbPath = await mongod.getDbPath();
    const dbName = await mongod.getDbName();

    try {
      await mongoose.connect(uri, {
        useNewUrlParser:true,
        useUnifiedTopology: true
      })
      .then(() => console.log("connected to test mongo database"))
    }
    catch (error) {
        console.log(error);
    }
    db = await mongoose.connection*/
    
  });
 
  afterAll(async () => {
    await dbHandler.closeDatabase();
    /*await mongoose.disconnect();
    await mongod.stop();
    await db.close();*/
  });


  test("It should response the GET method at root", async done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: "Welcome to the ACM Backend Server"})
        done();
      })
  })

  test("test posting an event to /events/event", async () => {
    //const events = db.collection('events');
    const response = await request(app)
      .post("/events/event")
      .send(mockEvent)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    const events = db.collections['events']
    
    const getRes = await request(app)
      .get("/events/event/id")
      .send({_id: ObjectId(response.body._id)})
      .set('Accept', 'application/json')
    const localFind = await events.find({_id: ObjectId(response.body._id)}).next()

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(getRes.body[0])
    expect(JSON.stringify(response.body)).toEqual(JSON.stringify(localFind))
  })

  test("test getting two events from /events/event", async () => {
    //const events = db.collection('events');
    const response = await request(app)
      .post("/events/event")
      .send(mockEvent)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    const response2 = await request(app)
      .post("/events/event")
      .send(mockEvent2)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    const events = db.collections['events']
    
    const getRes = await request(app)
      .get("/events/event/")
      .set('Accept', 'application/json')


    var jsonArr = [response.body, response2.body]
    
    expect(response.statusCode).toBe(200);
    expect(jsonArr).toEqual(getRes.body)
    expect(jsonArr.length).toEqual(2)
  })

  test("test getting all from /events/event", async () => {
    //const events = db.collection('events');
    const response = await request(app)
      .post("/events/event")
      .send(mockEvent)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    const response2 = await request(app)
      .post("/events/event")
      .send(mockEvent2)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    const events = db.collections['events']
    
    const getRes = await request(app)
      .get("/events/event/")
      .set('Accept', 'application/json')


    var jsonArr = [response.body, response2.body]
    
    expect(response.statusCode).toBe(200);
    expect(jsonArr).toEqual(getRes.body)
  })

  test("should insert a user into collection", async done => {
      function callback(insertedEvent, mockEvent){
        try {
          expect(JSON.stringify(insertedEvent)).toEqual(JSON.stringify(mockEvent));
          done();
        }
        catch (error){
          done(error);
        }
      }
      const events = db.collection('events');

      var mockEvent = new Event({
          title: "watch garrett chug ketchup",
          location: "Garrett's House",
          startTime: new Date(2020, 5, 25, 15, 0, 0, 0),
          endTime: new Date(2020, 5, 25, 17, 0, 0, 0),
          checkIn: "ketchupChug",
          url: "google.com"
      })

      await events.insertOne(mockEvent, async function(err){
        if (err) return;

        var objectId = mockEvent._id;
        const insertedEvent = await events.findOne({_id: objectId});
        callback(insertedEvent, mockEvent);
      })
  });
});

//set up text index for collection "events," allowing for keyword search




