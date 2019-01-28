var express = require('express');
var router = express.Router();
//引入数据库
var mongodb = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
/* GET users listing. */
//显示用户数据
router.get('/', function (req, res, next) {
  mongodb.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("mydb");
    var common = dbase.collection("users");
    var vip = dbase.collection("vip");
    var admin = dbase.collection("admin");
    var data = {};
    common.find({}).toArray(function (err, result) {
      if (err) throw err;
      data.common = result;
    });
    vip.find({}).toArray(function (err, result) {
      if (err) throw err;
      data.vip = result;
    });
    admin.find({}).toArray(function (err, result) {
      if (err) throw err;
      data.admin = result;
      res.send(data);
    });
    db.close();
  });
});
//删除用户数据
router.post("/delete", function (req, res) {
  var data = req.body;
  mongodb.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("mydb");
    var col = dbase.collection(data.col);
    console.log(data.col);

    col.deleteOne({
      username: data.username
    }, function (err, result) {
      if (err) throw err;
      res.send("1");
      // console.log("删除成功");
    });
  });
});
//添加用户数据
router.post("/add", function (req, res) {
  var data = req.body;
  mongodb.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("mydb");
    var col = dbase.collection(data.col);
    col.insertOne(data, function (err, result) {
      if (err) throw err;
      res.send("1");
      console.log("添加成功");
    });
  });
});
//管理员登录界面
router.get("/admin", function (req, res) {
  req.session.isAdmin = true;
  res.render("signin", {
    isAdmin: req.session.isAdmin,
  });
});
//管理员登录
router.post("/admin", function (req, res) {
  var data = req.body;
  mongodb.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("mydb");
    var cols = dbase.collection("admin");
    cols.find(data).toArray(function (err, result) {
      if (err) throw err;
      if (result.length !== 0) {
        //存session
        req.session.admin = data.username;
        req.session.isAdmin = true;
        //用户存在
        res.send("1");

      } else {
        //用户不存在
        res.send("0");
      }
      db.close();
    });
  });
});
//vip注册普通用户加入vip
router.get("/vip", function (req, res) {
  res.send("vip");
});
//注册
router.post("/signup", function (req, res) {
  var data = req.body;
  mongodb.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("mydb");
    var cols = dbase.collection("users");
    cols.find({
      username: data.username
    }).toArray(function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        //可以注册
        res.send("1");
        //存数据库
        cols.insertOne(data, function (err, result) {
          if (err) throw err;
          console.log("存储成功");
        });
      } else {
        //用户已存在
        res.send("0");
      }
      db.close();
    });
  });
})
//登录
router.post("/signin", function (req, res) {
  var data = req.body;
  mongodb.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("mydb");
    var cols = dbase.collection("users");
    cols.find(data).toArray(function (err, result) {
      if (err) throw err;
      if (result.length !== 0) {
        //存session
        req.session.username = data.username;
        req.session.isLogin = true;
        //用户存在
        res.send("1");

      } else {
        //用户不存在
        res.send("0");
      }
      db.close();
    });
  });
})
module.exports = router;