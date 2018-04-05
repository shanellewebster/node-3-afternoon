// requiring all the packaged installed in terminal.
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

// requiring for use of file checkForSession (MIDDLEWARE)
const checkForSession = require('./middlewares/checkForSession');

//CONTROLLERS
//creating an endpoint that calls js file associated with it.
const swag_controller = require('./controllers/swag_controller');
const auth_controller = require('./controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');

//create express application
const app = express();
//add bodyParser so we can read JSON from the request body
app.use( bodyParser.json());
// add session so we can create sessions. session needs a configuration object as the first argument. The object should have a secret, resave, and saveUninitialized property. Secret is required. The rest are not. Secret can be any string you like that is stored in your .env file and resave and saveUninitialized should equal true.
app.use(session({
    secret: process.env.SESSION_SECRET,
    //decides whether to save a session that was not changed.
    resave: false,
    //if you want to track.
    saveUninitialized: true
    // COULD ADD MAXAGE HERE:
}));

//adding checkForSession BELOW 
app.use(checkForSession);

// to serve up the build folder in /build.
app.use( express.static( `${__dirname}/../build` ) );


//make a GET endpoint at /api/swagthat calls the read method on our swag_controller.
app.get('/api/swag', swag_controller.read);

// AUTHORIZATION ENDPOINTS
app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/user', auth_controller.getUser);

//CART ENDPOINTS
app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);

//SEARCH ENDPOINT
app.get('/api/search', search_controller.search);

//app listening
const port = process.env.port || 3000;
app.listen( port, () => {console.log(`Server listening on port ${port}`);});