// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const eventRoutes = require('./routes/eventRouter');
const dotenv = require('dotenv')
dotenv.config();

const {getDatabase} = require('./database/mongo');  //MongoDatabase
const dbHandler = require('./test/db-handler') //In-memory testing mongoDB
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV != "test") {
    //const database = dbHandler.connect();
    const database = getDatabase()
}

//Express app and port
const app = express();
const port = process.env.PORT

//Configure app to use bodyParser
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(cors());
app.use(morgan('combined'));

//All routes regarding events
app.use('/events', eventRoutes);

app.get('/', function (req, res){
    return res.status(200).send({message: "Welcome to the ACM Backend Server"});
});
module.exports = app;
