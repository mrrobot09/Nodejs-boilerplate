var express = require('express');
var router = express.Router();
let authRouter = require('../routes/auth.route');
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

app.use('/v1', authRouter);

module.exports = app;

