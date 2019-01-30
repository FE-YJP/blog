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
        cols.find({
            "title": title
        }).toArray((err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });
});



module.exports = router;