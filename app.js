const PORT = process.env.PORT || 3001;

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
//var mongoose = require('mongoose');
var request = require('request');
//const MONGOURL = process.env.MONGODB_URI || 'mongodb://localhost/shopping-cart';
//const MONGOURL = "mongodb://mike:mike@ds023624.mlab.com:23624/heroku_cm9gzvsh"
//mongoose.connect(MONGOURL, err => {
//    console.log(err || 'Connected to MongoDB');
//});
var app = express();
//const wiki = new Wiki();
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api', (req,res) => {
//    console.log(req.body.searchterm)
    request('https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=20&gsrsearch=\''+req.body.searchterm+'\'', (err,data) => {
            //console.log(err,data)
            res.send(data.body)
            })
    
    //res.send('Hello');
});
app.use('/', (req,res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});




var server = http.createServer(app);
server.listen(PORT, err => {
    console.log(err || `Server listening on port ${PORT}`);
});
