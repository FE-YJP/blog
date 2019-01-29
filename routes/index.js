var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.session);
  res.render('index', {
    username: req.session.username,
    isLogin: req.session.isLogin,
    isVip: req.session.isVip,
  });
});
//注册
router.get("/signup", function (req, res) {
  // req.session.isAdmin = false;
  // req.session.isVip = false;
  res.render("signup", {
    isVip: req.session.isVip,
    isAdmin: req.session.isAdmin,
  });
});
//管理员界面
router.get("/admin", function (req, res) {
  res.render("admin", {
    isAdmin: req.session.isAdmin,
    admin: req.session.admin
  });
});
//登录
router.get("/signin", function (req, res) {
  req.session.isAdmin = false;
  req.session.isVip = false;
  res.render("signin", {
    isVip: req.session.isVip,
    isAdmin: req.session.isAdmin,
    isLogin: req.session.isLogin
  });
});
//写博客页面
router.get("/article", function (req, res) {
  res.render("article", {
    isVip: req.session.isVip,
    isAdmin: req.session.isAdmin,
    isLogin: req.session.isLogin,
    username: req.session.username
  });
});
//注销
router.get("/layout", function (req, res) {
  req.session.username = null;
  req.session.admin = null;
  req.session.isLogin = false;
  req.session.isAdmin = false;
  res.render('signin', {
    isAdmin: req.session.isAdmin,
  });
});
module.exports = router;