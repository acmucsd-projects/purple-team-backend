//dependencies
const { MongoMemoryServer } = require('mongodb-memory-server');
const { Event } = require('../database/models/eventsModel');
const request = require("supertest");
const dbHandler = require('./db-handler');
const app = require("../app");

const mongod = new MongoMemoryServer();


const mongoose = require('mongoose');

  let connection;
  let db;


  
describe('insert', () => {

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
    console.log("Closing...")
    await dbHandler.closeDatabase();
    console.log("Closed")
    /*await mongoose.disconnect();
    await mongod.stop();
    await db.close();*/
  });


  test("It should response the GET method", async done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      })
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




