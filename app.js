var express = require('express');

var app = express();
var multer = require('multer')
var constants = require('constants');
var constant = require('./config/constants');


var port = process.env.PORT || 8042;
var sql = require('mssql')
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var now = new Date();

var configDB = require('./config/database.js');
sql.connect(configDB.url)

require('./config/passport')(passport); // pass passport for configuration

//set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

//view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
//app.set('view engine', 'ejs'); // set up ejs for templating

app.use(session({
    secret: 'I Love India...',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./config/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json({ type: '*/*' }));

app.use(async function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    var d = {
        name: req.body.name.replace(/'/g, "\\'"),
        email: req.body.email.replace(/'/g, "\\'"),
        source: req.body.source.replace(/'/g, "\\'"),
        idHero: parseInt(req.body.idHero)
    };

    const result = await sql.query`INSERT INTO avengers.register(id_hero, name, email, source) VALUES (${d.idHero}, ${d.name}, ${d.email}, ${d.source})`;

    res.json({});
});

//launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).render('404', {title: "Sorry, page not found", session: req.sessionbo});
});

app.use(function (req, res, next) {
    res.status(500).render('404', {title: "Sorry, page not found"});
});
exports = module.exports = app;