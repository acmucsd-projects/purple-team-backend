//dependencies
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const mongod = new MongoMemoryServer();

// Connect to the in-memory database

module.exports.connect = async () => {
  const uri = await mongod.getConnectionString();

  const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  await mongoose.connect(uri, mongooseOptions)
    .then(() => console.log("Connected to test mongoDB in-memory"));
  db = await mongoose.connection
  db.collections.events.createIndex({title: "text", location: "text", startTime: "text", tags: "text"});
  return db;
}


// Drop database, close connection and stop mongod
module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

//Remove all data for all db collections
module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections){
        const collection = collections[key];
        await collection.deleteMany();
    }
}