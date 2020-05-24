//dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//mongodb database: "splashes"
const uri = process.env.MONGO_URI;

let db = null;

//Set up mongoose connection
async function startDatabase() {
  try {
    await mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => console.log('connected to mongo database'));
  } catch (error) {
    console.log(error);
  }
  db = mongoose.connection;

  // Clear previous indexes
  db.collections.events.dropIndexes();
  // Set up new text index for collection "events," allowing for keyword search
  db.collections.events.createIndex({
    title: "text",
    location: "text",
    startTime : "text",
    tags: "text"
  });
}

async function getDatabase() {
  if (!db) await startDatabase();
  return db;
}

module.exports = {
  getDatabase,
  startDatabase
};
