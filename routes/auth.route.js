var express = require('express');
var router = express.Router();
let auth = require('../controllers/v1/user-controller/auth.controller');
/* GET users listing. */
router.route('/login').post(auth.signIn);
router.route('/register').post(auth.signUp);
router.route('/changePassword').put(auth.changePassword);


module.exports = router;
