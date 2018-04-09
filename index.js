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
mongoose.connect('mongodb://localhost:27017/homestayuser');
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

// utility code
//var usernames = [];
function userExists(toFind) {
  for (var i = 0; i < usernames.length; i++) {
    if (usernames[i] === toFind) {
      return true;
    }
  }
  return false;
}

// database schema
var Schema = mongoose.Schema;
var userSchema = new Schema({
  email: {type: String,
          unique: true,
          index: true},
  name: String,
  lastName: String,
  hashedPassword: String
}, {collection: 'users'});
var User = mongoose.model('user', userSchema);

// var studentSchema = new Schema({
//   sid: {type: String,
//         validate: [/^1[0-9]{8}$/, 'must be 9 digits'],
//         unique: true,
//         index: true},
//   firstName: String,
//   lastName: {type: String,
//              index: true},
//   gpa: {type: Number,
//         min: 0.0,
//         max: 4.3},
//   startDate: Date,
//   fullTime: Boolean
// }, {collection: 'students'});
// var Student = mongoose.model('student', studentSchema);




// routes


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


app.get("/", function (req, res){
  res.redirect('/index');
});

// Index or login page
app.get("/index", function (req, res){
  res.render('loginPage');
});


app.get('/signup', function(req, res) {
  req.session.username = '';
  res.render('signUpPage');
});

app.get('/signin', function(req, res) {
  res.render('signInPage');
});

app.get('/about', function(req, res) {
  req.session.username = '';
  res.render('aboutPage');
});

app.get('/userpage', function(req, res) {
  req.session.username = '';
  res.render('userPage');
});

app.get('/listplace', function(req, res) {
  req.session.username = '';
  res.render('listPage');
});

app.get('/myaccount', function(req, res) {
  req.session.username = '';
  res.render('myAcctpage');
});


// Log Out page is the same as the Log In / Sign In / Sign Up page
app.get('/logout', function(req, res) {
  req.session.username = '';
  res.redirect('/');
});


app.listen(3004, function() {
  console.log('Listening on port 3004');
});
