//Mark Bryan 100569292 and Leon Chow 100617197 This web application allows the user to sign up and login in 
//to the website. Their information is stored in a database with session tracking and verification. The user
//can add a listing and press the magnifying glass to display a table of listnings that they have added.
//The user can also navigate to the about page which gives more information, as well as changing their
//login information and first and last name, which will show the changes in the database. Also uses pug
//for all the page layouts.

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
  secret: 'apollo slackware prepositional expectations'
}));

// utility code
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

// User schema
var userSchema = new Schema({
  email: {type: String,
          unique: true,
          index: true},
  name: String,
  lastName: String,
  hashedPassword: String
}, {collection: 'users'});
var User = mongoose.model('user', userSchema);

// MyListing schema
var listingSchema = new Schema({
  listingTitle: String,
  description: String,
  street: String,
  city: String,
  province: String,
  postalCode: String,
  country: String,
  contact: String, 
}, {collection: 'listings'});
var Listing = mongoose.model('listing', listingSchema);


var currentUsername;

// routes

app.get("/", function (req, res){
  res.redirect('/index');
});

// Index or login page
app.get("/index", function (req, res){
  res.render('loginPage');
});

// Sign Up form
app.get('/signup', function(req, res) {
  res.render('signUpPage');
});

// Sign In form
app.get('/signin', function(req, res) {
  res.render('signInPage');
});

// Update account information post 
app.post('/processMyAcct', function(req, res) {

  var name = req.body.myAcctName;
  var lastName = req.body.myAcctLastName;
  var password = req.body.acctPassword;
  var hashedPassword = bcrypt.hashSync(password);
  var email = req.body.myAcctEmail;

  var userData = {
      name: name,
      lastName: lastName,
      hashedPassword: hashedPassword,
      email: email
    };
      
  User.find({email: email}).then(function(results) {
    if (results.length > 0) {
    // update the user with the new information
      User.update({email: email},
                userData,
                {multi: false},
                function(error, numAffected) {
        if (error || numAffected < 1) {
          console.log('Unable to update student!');
        } else {
          console.log("Saved changes!");
        }
      });
    } else {
      console.log('Unable to update student!');
    }
  });
  currentUsername = email;
  res.render('myAcctPage');
});


// Process Sign Up
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
        currentUsername = email;
        req.session.username = email;
        res.render('userPage', {email: email});
      }
    }
  });
});


// About page
app.get('/about', function(req, res) {
  res.render('aboutPage');
});

// User page or the page after user logins successfully
app.get('/userpage', function(req, res) {
  res.render('userPage');
});

// Form for creating a homestay listing
app.get('/listplace', function(req, res) {
  res.render('listPage');
});


// Process Listing
app.post('/processListing', function(req, res) {
  var listingTitle = req.body.listingTitle;
  var description = req.body.listingDescription;
  var street = req.body.listingStreetName;
  var city = req.body.listingCity;
  var province = req.body.listingProvince;
  var postalCode = req.body.listingPostalCode;
  var country = req.body.listingCountry;
  var contact = req.body.listingContact;

  var newListing = new Listing({listingTitle: listingTitle, description: description, street: street, city: city, province: province, postaCode: postalCode, country: country, contact: contact});

  newListing.save(function(error) {
    if (error) {
      console.log('Unable to create listing: ' + error);
      res.render('userPage', {userPageErrorMessage: 'Unable to create listing.'});
    } else {
      res.render('userPage', {listingTitle: listingTitle, description: description, street: street, city: city, province: province, postaCode: postalCode, country: country, contact: contact});
    }
  });
});


// Display search results from the search bar while not Log in
app.post('/listingNotLogIn', function(request, response) {
  var searchCity = request.body.searchPlace;
  Listing.find({city: searchCity}).then(function(results) {
    response.render('listingNotLogIn', {title: 'Search Result', listings: results});
  });

});

// Display search results from the search bar while Log in
app.post('/listingLogIn', function(request, response) {
  var searchCity = request.body.searchPlace;
  Listing.find({city: searchCity}).then(function(results) {
    response.render('listingLogIn', {title: 'Search Result', listings: results});
  });
});

// Form for editing the account information
app.get('/myaccount', function(req, res) {
  res.render('myAcctPage');
});


// Log Out page is the same as the Log In / Sign In / Sign Up page
app.get('/logout', function(req, res) {
  req.session.username = '';
  currentUsername = '';
  res.redirect('/');
});


app.listen(3004, function() {
  console.log('Listening on port 3004');
});
