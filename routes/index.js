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
      if (err) throw err;
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
      if (err) throw err;
      res.send(result);
    });
  });
});
//搜索博客
router.get("/search", (req, res) => {
  var title = req.query.title;
  mongodb.connect(url, (err, db) => {
    if (err) throw err;
    var dbase = db.db("mydb");
    var cols = dbase.collection("article");
    cols.find({
      title: title,
    }).toArray((err, result) => {
      if (err) throw err;
      if (result.length == 0) {
        res.send("0");
      } else {
        res.send(result);
      }
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
//修改博客页面
router.get("/change", function (req, res) {
  res.render("change", {
    isVip: req.session.isVip,
    isAdmin: req.session.isAdmin,
    isLogin: req.session.isLogin,
    username: req.session.username
  });
});
//显示要修改的博客内容
router.get("/changearticle", (req, res) => {
  var title = req.query.title;
  mongodb.connect(url, (err, db) => {
    if (err) throw err;
    var dbase = db.db("mydb");
    var cols = dbase.collection("article");
    cols.find({
      title: title
    }).toArray((err, result) => {
      if (err) throw err;
      if (result.length != 0) {
        res.send(result);
      } else {
        res.send("0");
      }
    });
  });
});
//修改博客
router.get("/changeblog", (req, res) => {
  mongodb.connect(url, (err, db) => {
    if (err) throw err;
    var whereStr = {
      title: req.query.title
    }; //查询条件
    var updateStr = {
      $set: {
        "theme": req.query.theme,
        "title": req.query.title,
        "sub": req.query.sub,
        "content": req.query.content,
      }
    };
    var dbase = db.db("mydb");
    var cols = dbase.collection("article");
    cols.updateOne(whereStr, updateStr, (err, result) => {
      if (err) throw err;
      if (result) {
        res.send("1");
      } else {
        res.send("0");
      }
    });
  });
});
//删除博客
router.get("/deleteblog", (req, res) => {
  mongodb.connect(url, (err, db) => {
    if (err) throw err;
    var whereStr = {
      title: req.query.title
    }; //查询条件
    var dbase = db.db("mydb");
    var cols = dbase.collection("article");
    cols.deleteOne(whereStr, (err, result) => {
      if (err) throw err;
      if (result) {
        res.send("1");
      } else {
        res.send("0");
      }
    });
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