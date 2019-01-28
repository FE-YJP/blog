$(function () {
    var user = $("#username");
    var psw = $("#password");
    //用户名正则验证字母开头,4-16位
    var userreg = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
    //密码正则验证4-16任意字母数字
    var pswreg = /^[a-zA-Z0-9]{4,10}$/;
    user.on("change", function () {
        if (!userreg.test(user.val())) {
            $(".userinfo").addClass("show");
        } else {
            $(".userinfo").removeClass("show");
        }
    });
    psw.on("change", function () {
        if (!pswreg.test(psw.val())) {
            $(".pswinfo").addClass("show");
        } else {
            $(".pswinfo").removeClass("show");
        }
    });
    $("#btn").on("click", function (e) {
        e.preventDefault();
        //正则验证用户名.密码
        if (user.val() && psw.val()) {
            $.post("/users/signup", {
                username: $("#username").val(),
                password: $("#password").val(),
            }, function (data) {
                if (data == 0) {
                    alert("用户名重复请重试");
                } else {
                    alert("注册成功");
                    location.assign("./signin");
                }
            });
        } else {
            alert("用户名、密码不能为空");
        }

    });
});