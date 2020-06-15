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

//Configure Stripe utilities
const stripe = require('stripe')(process.env.STRIPE_KEY, {
  maxNetworkRetries: 2,
});

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
      paymentId: "",
    }
  }
  return next();
})

nextApp.prepare().then(() => {

  app.post('/api/authentication/login', passport.authenticate('local'), (req, res) => {
    res.end();
  });

  app.get('/api/payment/billing', async (req, res) => {
    //Get user details
    const {room, property, locId} = req.session.currentBooking;
    const {_id, details} = req.user || req.session.user;
    //Generate billing information
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(req.session.currentBooking.room.price*100),
      currency: "php",
      metadata: {integration_check: 'accept_a_payment'},
    });
    //Validate if request is from a valid client
    if (room._id && property._id && locId && _id && details["First Name"]) {
      req.session.currentBooking.paymentId = paymentIntent.client_secret;
      req.session.currentBooking[paymentIntent.client_secret] = false;
      res.json({status: 'ok', secret: paymentIntent.client_secret, msg: ""});
    } else {
      res.json({status: 'err', secret: null, msg: "Invalid request. Try again."});
    }
  });

  app.get('/api/payment/verify/:id', (req, res) => {
    if (req.params.id===req.session.currentBooking.paymentId) {
      req.session.currentBooking[req.session.currentBooking.paymentId] = true;
      res.json({status: 'ok', msg: ''});
    } else {
      res.json({status: 'err', msg: 'Something went wrong. Contact the administrator.'});
    }
  });

  app.all('*', (req, res) => {
    return handle(req, res);
  });

  app.listen(app.get('PORT'), err => {
    if (err) throw err
    console.log('> Ready on http://localhost:'+app.get('PORT'))
  });
})