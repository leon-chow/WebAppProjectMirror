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

// Update account information
app.post('/processMyAcct', function(req, res) {
  
  id = req.id;
  name = req.body.myAcctName;
  lastName = req.body.myAcctLastName;
  
  password = req.body.acctPassword;
  hashedPassword = bcrypt.hashSync(password);
  email = req.body.myAcctEmail;
  console.log(id);

  var userData = {id: id,
      name: name,
      lastName: lastName,
      hashedPassword: hashedPassword,
      email: email};
      
  User.find({email: email}).then(function(results) {
    if (results.length > 0) {
    // update the student
      User.update({id: id},
                userData,
                {multi: false},
                function(error, numAffected) {
      if (error || numAffected != 1) {
        console.log('Unable to update student!');
      }
      });
    }
  });
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
  // req.session.username = '';
  res.render('userPage');
});

// Form for creating a homestay listing
app.get('/listplace', function(req, res) {
  // req.session.username = '';
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
      // req.session.username = email;
      res.render('userPage', {listingTitle: listingTitle, description: description, street: street, city: city, province: province, postaCode: postalCode, country: country, contact: contact});
    }
  });

 
});


// Form for editing a the account information
app.get('/myaccount', function(req, res) {
  // req.session.username = '';
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
