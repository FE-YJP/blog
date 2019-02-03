var express = require('express');
var router = express.Router();
//引入数据库
var mongodb = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";

//管理员登录
router.post("/adminlogin", function (req, res) {
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
                req.session.username = data.username;
                req.session.isAdmin = true;
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
});

//显示用户数据
router.get('/admin', function (req, res, next) {
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
                });
            } else {
                res.send("0");
            }
        });

    });
});
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