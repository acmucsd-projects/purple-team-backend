const mongoose = require('mongoose');
const config = require('../../config.json');

//mongodb database: "splashes"
const uri = "mongodb+srv://brilam8:" + config.mongoPass + "@splash-pages-eqhd7.mongodb.net/splashes?retryWrites=true&w=majority";

let db = null;

//Set up mongoose connection
async function startDatabase(){
    try {
        await mongoose.connect(uri, {
            useNewUrlParser:true,
            useUnifiedTopology: true
        })
        .then(() => console.log("connected to mongo database"))
    }
    catch (error) {
        console.log(error);
    }
    db = mongoose.connection
    
    //set up text index for collection "events," allowing for keyword search
    db.collections.events.createIndex({title: "text", description: "text", startTime: "text", checkIn: "text"});
}

async function getDatabase(){
    if (!db) await startDatabase();
    return db;
}

module.exports = {
    getDatabase,
    startDatabase,
};