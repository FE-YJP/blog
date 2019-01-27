var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    username: "xiaobai",
    isLogin: false
  });
});
router.get("/signup", function (req, res) {
  res.render("signup");
});
router.get("/signin", function (req, res) {
  res.render("signin");
});
module.exports = router;