// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const eventRoutes = require('./routes/eventRouter');
const {getDatabase} = require('./database/mongo');

//Express app and port
const app = express();
const port = process.env.PORT || 3000

//Configure app to use bodyParser
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(cors());
app.use(morgan('combined'));

//All routes regarding events
app.use('/events', eventRoutes);

const database = getDatabase()

app.get('/', function (req, res){
    return res.send("Welcome to the ACM Backend Server");
});

app.listen(port, () =>{
    console.log("Listening on port "+port);
});

