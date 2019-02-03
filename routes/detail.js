var express = require('express');
var router = express.Router();
var qs = require("querystring");
//引入数据库
var mongodb = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";

router.get('/', (req, res) => {
    res.render('detail', {
        username: req.session.username,
        isLogin: req.session.isLogin,
        isVip: req.session.isVip,
    });
});
router.get('/detail', (req, res) => {
    let data = req.query;
    let title = data.title;
    mongodb.connect(url, (err, db) => {
        if (err) throw err;
        var dbase = db.db("mydb");
        var cols = dbase.collection("article");
        cols.aggregate([{
            $lookup: {
                from: 'comment', // 右集合
                localField: 'title', // 左集合 join 字段
                foreignField: 'title', // 右集合 join 字段
                as: 'comments' // 新生成字段（类型array）
            }
        }]).toArray((err, result) => {
            if (err) throw err;
            result.forEach((item, index) => {
                if (item.title == title) {
                    res.send(item);
                }
            });
        });

    });
});
//提交评论
router.post('/', (req, res) => {
    let data = req.body;
    mongodb.connect(url, (err, db) => {
        if (err) throw err;
        var dbase = db.db("mydb");
        var cols = dbase.collection("comment");
        cols.insertOne(data, (err, result) => {
            if (err) throw err;
            if (result) {
                res.send("1");
            } else {
                res.send("0");
            }

        });
    });
});


module.exports = router;