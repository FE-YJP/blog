var express = require('express');
var router = express.Router();
//引入数据库
var mongodb = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
/* GET users listing. */

//管理员登录界面
router.get("/admin", function (req, res) {
  req.session.isAdmin = true;
  res.render("signin", {
    isAdmin: req.session.isAdmin,
  });
});

//vip注册普通用户加入vip
router.post("/vip", function (req, res) {
  mongodb.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("mydb");
    var vipusers = dbase.collection("vip");
    var users = dbase.collection("users");
    vipusers.find({
      username: req.session.username
    }).toArray(function (err, result) {
      if (err) throw err;
      if (result.length != 0) {
        //已经是vip用户
        res.send("0");
      } else {
        users.find({
          username: req.session.username
        }).toArray(function (err, re) {
          if (err) throw err;
          console.log(re[0]);
          if (re.length != 0) {
            //存vip用户
            vipusers.insertOne(re[0], function (err, resu) {
              if (err) throw err;
              req.session.isVip = true;
              res.send("1");
            });
          } else {
            //账号重新登陆
            res.send("0");
          }
        });
      }
    });
  });
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
    var userscols = dbase.collection("users");
    var vipcols = dbase.collection("vip");
    vipcols.find(data).toArray(function (err, result) {
      if (err) throw err;
      if (result.length !== 0) {
        //存session
        req.session.username = data.username;
        req.session.isLogin = true;
        req.session.isVip = true
        //用户存在
        res.send("1");

      } else {
        userscols.find(data).toArray(function (err, vs) {
          if (err) throw err;
          if (vs != 0) {
            //存session
            req.session.username = data.username;
            req.session.isLogin = true;
            req.session.isVip = false
            //用户存在
            res.send("1");
          } else {
            //用户不存在
            res.send("0");
          }

        });

      }
      db.close();
    });
  });
})
//发表文章
router.post("/article", function (req, res) {
  var data = req.body;
  console.log(data);
  mongodb.connect(url, (err, db) => {
    if (err) throw err;
    let dbase = db.db("mydb");
    let article = dbase.collection("article");
    article.find({
      title: data.title
    }).toArray((err, re) => {
      if (err) throw err;
      if (re.length == 0) {
        article.insertOne(data, (err, result) => {
          if (err) throw err;
          res.send("1");
        });
      } else {
        //标题重复
        res.send("0");
      }
    });

  });
});

module.exports = router;