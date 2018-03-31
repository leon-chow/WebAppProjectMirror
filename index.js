// import modules
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var uuid = require('uuid/v1');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var assert = require('assert');

// configure database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/homestay');
                 //,{useMongoClient: true});

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// configure view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// configure sessions
app.use(session({
  genid: function(req) {
    return uuid();
  },
  resave: false,
  saveUninitialized: false,
  //cookie: {secure: true},
  secret: 'apollo slackware prepositional expectations'
}));








// routes

// redirect "/" to "/index"
app.get("/", function (req, res){
  res.redirect('/index');
});

// Index or login page
app.get("/index", function (req, res){
  res.render('loginPage');
});

//  route for signup page
app.get('/signup', function(req, res) {
  res.render('signUpPage');
});

//  route for signin page
app.get('/signin', function(req, res) {
  res.render('signInPage');
});

//  route for about page
app.get('/about', function(req, res) {
  res.render('aboutPage');
});

//  route for userpage or successful signin
app.get('/userpage', function(req, res) {
  res.render('userPage');
});

//  route for listing a place
app.get('/listplace', function(req, res) {
  res.render('listPage');
});

//  route for editing user account info
app.get('/myaccount', function(req, res) {
  res.render('myAcctpage');
});


//  route for logging out
app.get('/logout', function(req, res) {
  res.redirect('/');
});




app.listen(3004, function() {
  console.log('Listening on port 3004');
});
