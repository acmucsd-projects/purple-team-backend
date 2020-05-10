// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const eventRoutes = require('./routes/eventRouter');
const dotenv = require('dotenv')
dotenv.config();

<<<<<<< HEAD
const {getDatabase} = require('./database/mongo');  // MongoDatabase
const dbHandler = require('./test/db-handler') // In-memory testing mongoDB

=======
const {getDatabase} = require('./database/mongo');  //MongoDatabase
const dbHandler = require('./test/db-handler') //In-memory testing mongoDB
>>>>>>> 97055fc08ed800d99afe2bf718870ab90f2b72b3
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

<<<<<<< HEAD
app.get('/', function (req, res){
    return res.status(200).send({message: "Welcome to the ACM Backend Server"});
});
module.exports = app;
=======


app.get('/', function (req, res){
    return res.status(200).send({message: "Welcome to the ACM Backend Server"});
});

module.exports = app;

/*app.listen(port, () =>{
    console.log("Listening on port "+port);
});*/

>>>>>>> 97055fc08ed800d99afe2bf718870ab90f2b72b3
