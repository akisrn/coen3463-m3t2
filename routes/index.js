var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/kickstarters', function(req, res, next) {
  res.render('kickstarters', { title: 'Kickstarters List' });
});

module.exports = router;
