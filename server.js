const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const db = require('./db');
const path = require('path');
require('dotenv').config();
const massive = require('massive');

const dbConnection = massive(process.env.POSTGRES_URI);

// Create a new Express application.
const app = express();

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(
  'local-register',
  new Strategy({ passReqToCallback: true }, (req, username, password, cb) => {
    const dbInstance = req.app.get('db');
    db.users.registerByUsername(
      dbInstance,
      username,
      password,
      req.body.displayname,
      (err, user) => {
        if (err) return cb(err);
        if (!user) return cb(null, false);
        return cb(null, user);
      }
    );
  })
);

passport.use(
  'local-login',
  new Strategy({ passReqToCallback: true }, (req, username, password, cb) => {
    const dbInstance = req.app.get('db');
    db.users.findByUsername(dbInstance, username, (err, userObj) => {
      if (err) return cb(err);
      if (!userObj) return cb(null, false);
      if (userObj.password !== password) return cb(null, false);
      return cb(null, userObj);
    });
  })
);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((req, id, cb) => {
  const dbInstance = req.app.get('db');
  db.users.findById(dbInstance, id, (err, user) => {
    if (err) {
      return cb(err);
    }
    return cb(null, user);
  });
});

app.use(express.static(path.join(__dirname, '/client/build')));

app.use(require('cookie-parser')());
app.use(require('body-parser').json());
app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365
    }
  })
);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes.

app.post('/auth/login', (req, res, next) => {
  passport.authenticate('local-login', (err, user) => {
    if (err) return res.send('Error on local-login');
    if (!user) return res.status(400).json({ error: 'Incorrect credentials' });
    req.logIn(user, (errLogin) => {
      if (errLogin) {
        return res.send('login error');
      }
      const { id, displayname, username } = user;
      return res.status(200).json({ id, displayname, username });
    });
  })(req, res, next);
});

app.post('/api/register', (req, res, next) => {
  passport.authenticate('local-register', (err, user) => {
    if (err) return res.send('Error on local-register');
    if (!user) {
      return res
        .status(400)
        .json({ error: 'Username has already been taken. Please pick another username' });
    }
    req.logIn(user, (errLogin) => {
      if (errLogin) {
        return res.send('login error');
      }
      const { id, displayname, username } = user;
      return res.status(200).json({ id, displayname, username });
    });
  })(req, res, next);
});

app.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// returns user object or empty object if not authenticated
app.get('/auth/current_user', (req, res) => {
  // do not want to be sending out password
  if (req.user) {
    return res.send({
      id: req.user.id,
      username: req.user.username,
      displayname: req.user.displayname,
      emails: req.user.emails
    });
  }
  return res.send({});
});

// client side rendering with react
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

dbConnection.then((dbInstance) => {
  app.set('db', dbInstance);
  app.listen(5000, () => {
    console.log('Listening on port 5000');
  });
});
