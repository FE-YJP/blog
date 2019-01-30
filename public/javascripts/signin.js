$(function () {
    $("#btn").on("click", function (e) {
        e.preventDefault();
        $.post("/users/signin", {
            username: $("#username").val(),
            password: $("#password").val()
        }, function (data) {
            console.log(data);
            if (data == 0) {
                alert("用户或密码不正确,请重试");
            }
            if (data == 1) {
                $.cookie("username", $("#username").val());
                alert("登陆成功");
                location.assign("/");
            }
        })
    });
    $("#admin").on("click", function (e) {
        console.log($("#username").val());
        e.preventDefault();
        $.post("/admin/adminlogin", {
            username: $("#username").val(),
            password: $("#password").val()
        }, function (data) {
            console.log(data);
            if (data == 0) {
                alert("用户或密码不正确,请重试");
            }
            if (data == 1) {
                $.cookie("username", $("#username").val(), {
                    path: "/"
                });
                alert("登陆成功");
                location.assign("/admin");
            }
        })
    });
});