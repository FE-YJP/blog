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
  console.log(data);
  mongodb.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("mydb");
    var col = dbase.collection(data.col);
    col.find({
      username: data.username,
      password: data.password
    }).toArray(function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        col.insertOne({
          username: data.username,
          password: data.password
        }, function (err, result) {
          if (err) throw err;
          res.send("1");
          console.log("添加成功");
        });
      } else {
        res.send("0");
        console.log("用户存在")
      }
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
//搜索用户
router.post("/search", function (req, res) {
  var username = req.body.username;
  mongodb.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("mydb");
    var admin = dbase.collection("admin");
    var users = dbase.collection("users");
    var vip = dbase.collection("vip");
    admin.find({
      username: username
    }).toArray(function (err, result1) {
      if (err) throw err;
      if (result1 != 0) {
        result1[0].col = "admin";
        res.send(result1[0]);
      } else {
        vip.find({
          username: username
        }).toArray(function (err, result2) {
          if (err) throw err;
          if (result2 != 0) {
            result2[0].col = "vip";
            res.send(result2[0]);
          } else {
            users.find({
              username: username
            }).toArray(function (err, result3) {
              if (err) throw err;
              if (result3 != 0) {
                result3[0].col = "common";
                res.send(result3[0]);
              } else {
                res.send("0");
              }
            });
          }
        });
      }
    });
  });
});
module.exports = router;