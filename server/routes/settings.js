var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI)

/* GET home page. */
router.get('/', function(req, res, next) {
  db.get('settings').find()
  .then(function(data){
    console.log(data);
    if (data.length < 1) {
      db.get('settings').insert({
        warning: 50,
        critical: 500
      })
      .then(function(data){
        res.send(data)
      })
    } else {
      res.send(data)
    }
  })
});

module.exports = router;
