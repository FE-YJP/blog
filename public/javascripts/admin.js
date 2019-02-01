$(function () {
    if ($.cookie("username") == $.trim($("#adminname").text())) {
        $(document).on("click", "#layout", function () {
            $.removeCookie("username");
        });
        $.get("/admin/admin", function (data) {
            data.common.forEach(function (item) {
                var common =
                    `
                <tr>
                    <td>${item.username}</td>
                    <td>${item.password}</td>
                    <td>
                        <button data-id="${item.username}" data-user="users" type="button" class="btn btn-danger" >删除</button>
                    </td>
                </tr>
                `;
                $("#commonusers").append(common);
                $("#commonusers").css("visibility", "visible");
            });
            data.admin.forEach(function (item) {
                var admin =
                    `
                <tr>
                    <td>${item.username}</td>
                    <td>${item.password}</td>
                    <td>
                        <button data-id="${item.username}" data-user="admin" type="button" class="btn btn-danger">删除</button>
                    </td>
                </tr>
                `;
                $("#adminusers").append(admin);
            });
            data.vip.forEach(function (item) {
                var vip =
                    `
                <tr>
                    <td>${item.username}</td>
                    <td>${item.password}</td>
                    <td>
                        <button data-id="${item.username}" data-user="vip" type="button" class="btn btn-danger">删除</button>
                    </td>
                </tr>
                `;
                $("#vipusers").append(vip);
            });

        });
        $("#common").on("click", function () {
            $("#commonusers").show().css("visibility", "visible").siblings().hide();
            $(this).addClass("active").siblings().removeClass("active");
        });
        $("#vip").on("click", function () {
            $("#vipusers").show().css("visibility", "visible").siblings().hide();
            $(this).addClass("active").siblings().removeClass("active");
        });
        $("#admin").on("click", function () {
            $("#adminusers").show().css("visibility", "visible").siblings().hide();
            $(this).addClass("active").siblings().removeClass("active");
        });
        $("#blog").on("click", function () {
            $(this).addClass("active").siblings().removeClass("active");
            $("#blogs").show().css("visibility", "visible").siblings().hide();
        });
        //删除
        $(document).on("click", "button.btn-danger", function () {
            $(this).parent().parent().remove();
            $.post("/admin/delete", {
                col: $(this).attr("data-user"),
                username: $(this).attr("data-id"),
            }, function (data) {
                if (data == 1) {
                    alert("删除成功");
                } else {
                    alert("删除失败");
                }
            });
        });
        //添加用户
        $(document).on("click", "button.addusers", function () {
            var _this = this;
            var addname = $(_this).parent().parent().find("input[type='text']");
            var addpsw = $(_this).parent().parent().find("input[type='password']");
            if (addname.val() && addpsw.val()) {
                $.post("/admin/add", {
                    col: $(_this).attr("data-id"),
                    username: addname.val(),
                    password: addpsw.val(),
                }, function (data) {
                    if (data == 1) {
                        var str =
                            `
                        <tr>
                        <td>${addname.val()}</td>
                        <td>${addpsw.val()}</td>
                        <td>
                        <button data-id="${addname.val()}" data-user="${$(_this).attr("data-id")}" type="button" class="btn btn-danger">删除</button>
                        </td>
                        </tr>
                        `;
                        $(_this).parent().parent().parent().append(str);
                        alert("添加成功");
                    } else {
                        alert("添加失败")
                    }
                });
            } else {
                alert("不能为空");
            }
        });
        //搜索用户
        $("#search").on("click", function (e) {
            e.preventDefault();
            $.post("/admin/search", {
                username: $(this).prev().val(),
            }, function (data) {
                if (data != 0) {
                    var str = `
                <tr>
                <td>${data.col}</td>
                <td>${data.username}</td>
                <td>${data.password}</td>
                </tr>
                `;
                    $("#result").find("tr").eq(0).after(str);
                } else {
                    var str = `
                <tr>
                <td colspan="3">无该用户</td>
                </tr>
                `;
                    $("#result").find("tr").eq(0).after(str);
                }

            });
        });
        //清空结果
        $("#clearresult").on("click", function () {
            $("#result").find("tr").eq(0).siblings().remove();
        });
    } else {
        alert("请登录管理员");
        location.href = "/users/admin";
    }
});