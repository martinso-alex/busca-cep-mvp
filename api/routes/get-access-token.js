var express = require('express');
var router = express.Router();

var auth = require('../middleware/auth');

router.get('/:password', auth.get_access_token);

module.exports = router;

