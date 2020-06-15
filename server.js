// server.js
const next = require('next')
const express = require('express')
const app = express()

//Import express utilities
const {session} = require('next-session')
const bodyParser = require('body-parser')

//Configure next application
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

//Import MongoDB utilities
const {ObjectId, MongoClient} = require('mongodb')

//Import security utils
const bcrypt = require('bcrypt')

//Import passport utilities
const passport = require('passport')
const local = require('passport-local')
const localStrategy = local.Strategy

//--------------------------------------------
//DATABASE CONFIGURATION

const mongoClient = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = () => {
  return new Promise (async (resolve) => {
    if (!mongoClient.isConnected()) await mongoClient.connect();
    const dbClient = mongoClient;
    const db = mongoClient.db('bookMate');
    resolve(db);
  });
}

//--------------------------------------------
//PASSPORT CONFIGURATION

const authenticateUser = async (username, password, done) => {
  return await database().then(db => db.collection('users').findOne({username: username})).then(async (user) => {
    if (user) {  
      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (e) {
        return done(e);
      }
    } else {
      return done(null, false);
    }
  });
}

passport.use(new localStrategy(authenticateUser));

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async(id, done) => {
  const user = await database().then(db => db.collection('users').findOne({_id: ObjectId(id)}));
  const {password, ...serializedUser} = user; 
  return done(null, serializedUser);
});

//--------------------------------------------
//EXPRESS CONFIGURATION

app.set('PORT', process.env.PORT || 3000);

app.use(session({name: 'bookMate'}));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())


//Check if user is a guest
app.use((req, res, next) => {
  if (!req.user && (!req.headers.cookie || !req.session.user)) {
    res.cookie('bookMate', req.session.id, {httpOnly: true, secure: !dev});
    req.session.user = { 
      _id: ObjectId(),
      details: {
        "First Name": "", 
        "Last Name": "", 
        "Email Address": "", 
        "Number": "", 
        "Address": "", 
      },
      bookings: [],
    }
    req.session.currentBooking = {
      bookDate: {
        start: "",
        end: ""
      },
      locId: "",
      property: {},
      room: {},
    }
  }
  return next();
})

nextApp.prepare().then(() => {

  app.post('/api/authentication/login', passport.authenticate('local'), (req, res, next) => {
    res.end();
  });

  app.all('*', (req, res) => {
    return handle(req, res);
  });

  app.listen(app.get('PORT'), err => {
    if (err) throw err
    console.log('> Ready on http://localhost:'+app.get('PORT'))
  });
})