var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/users', function(req, res, next) {
    res.render('users', {email: req.url.email});
});

router.get('/test', function(req, res, next) {
    res.render('test', { title: 'Express' });
});

router.get('/sucess', function(req, res, next) {
    res.render('sucess', { title: 'Express' });
  });

module.exports = router;
