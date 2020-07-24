var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', {user: req.session.user});
});


router.get('/sucess', function(req, res, next) {
    res.render('sucess', {user: req.session.user});
});

module.exports = router;
