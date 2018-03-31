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


// Process Sign UP
app.post('/processSignUp', function(req, res) {
  var name = req.body.signUpName;
  var lastName = req.body.signUpLastName;
  var email = req.body.signUpEmail;
  var password = req.body.signUpPwd;
  var hashedPassword = bcrypt.hashSync(password);

  var newUser = new User({name: name, lastName: lastName, email: email, hashedPassword: hashedPassword});

  newUser.save(function(error) {
    if (error) {
      console.log('Unable to Sign Up: ' + error);
      res.render('loginPage', {errorMessage: 'Unable to Sign Up.'});
    } else {
      req.session.username = email;
      res.render('userPage', {name: name, lastName: lastName, email: email, password: hashedPassword});
    }

  });
});

// Process Sign In
app.post('/processSignIn', function(req, res) {
  var email = req.body.signInEmail;
  var password = req.body.signInPwd;

  User.find({email: email}).then(function(results) {
    if (results.length == 0) {
      // Login failed
      res.render('loginPage');
    } else {
      // login success
      if (bcrypt.compareSync(password, results[0].hashedPassword)) {
        req.session.username = email;
        res.render('userPage', {email: email});
      }
    }
  });
});


app.listen(3004, function() {
  console.log('Listening on port 3004');
});
