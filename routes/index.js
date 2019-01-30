var express = require('express');
var router = express.Router();
//引入数据库
var mongodb = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    username: req.session.username,
    isLogin: req.session.isLogin,
    isVip: req.session.isVip,
  });
});
//获取文章列表
router.get('/html', (req, res) => {
  mongodb.connect(url, (err, db) => {
    if (err) throw err;
    var dbase = db.db("mydb");
    var cols = dbase.collection("article");
    cols.find({
      "theme": "html"
    }).toArray((err, result) => {
      res.send(result);
    });
  });
});
router.get('/css', (req, res) => {
  mongodb.connect(url, (err, db) => {
    if (err) throw err;
    var dbase = db.db("mydb");
    var cols = dbase.collection("article");
    cols.find({
      "theme": "css"
    }).toArray((err, result) => {
      res.send(result);
    });
  });
});
router.get('/js', (req, res) => {
  mongodb.connect(url, (err, db) => {
    if (err) throw err;
    var dbase = db.db("mydb");
    var cols = dbase.collection("article");
    cols.find({
      "theme": "javascript"
    }).toArray((err, result) => {
      res.send(result);
    });
  });
});
//注册
router.get("/signup", function (req, res) {
  req.session.isAdmin = false;
  req.session.isVip = false;
  res.render("signup", {
    isVip: req.session.isVip,
    isAdmin: req.session.isAdmin,
  });
});
//管理员界面
router.get("/admin", function (req, res) {
  res.render("admin", {
    isAdmin: req.session.isAdmin,
    username: req.session.username
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