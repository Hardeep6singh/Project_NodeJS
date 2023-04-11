const express = require('express')
const app = express()
const exphbs = require('express-handlebars'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var passport  = require('passport');

const port = 8000;

require('dotenv').config()
//const port = process.env.port;

app.use(express.static('public'));

app.engine('.hbs',exphbs.engine(
    {extname:'.hbs'}))

app.set('view engine','.hbs')

app.use(express.json())

//registering the bodyparser
app.use(bodyParser.urlencoded({extended:false}))


//Connecting to database
mongoose
    .connect(process.env.mongoDBUrl)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

//Importing the sales module 
const sales = require('./routes/api/sales')
app.use('/api/sales', sales) //Handling http requests to /api/sales path and associating it with sales module to handle the requests.

require('./strategies/jsonwtStrategy')(passport)

app.listen(port, () => console.log(`App running at port : ${port}`))