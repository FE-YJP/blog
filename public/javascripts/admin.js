$(function () {
    if ($.cookie("username") == $.trim($("#adminname").text())) {
        $(document).on("click", "#layout", function () {
            $.removeCookie("username");
        });
        //默认显示数据
        function GetData(data, type, obj) {
            data[type].forEach(function (item) {
                var str =
                    `
                <tr>
                    <td>${item.username}</td>
                    <td>${item.password}</td>
                    <td>
                        <button data-id="${item.username}" data-user="users" type="button" class="btn btn-danger" >删除</button>
                    </td>
                </tr>
                `;
                obj.append(str);
            });
        }

        $.get("/admin/admin", function (data) {
            GetData(data, "common", $("#commonusers"));
            GetData(data, "admin", $("#adminusers"));
            GetData(data, "vip", $("#vipusers"));
            $("#commonusers").css("visibility", "visible");
        });
        //显示当前页
        function ShowCurrent(obj, cur) {
            obj.show().css("visibility", "visible").siblings().hide();
            cur.addClass("active").siblings().removeClass("active");
        }

        $("#common").click(function () {
            ShowCurrent($("#commonusers"), $(this))
        });
        $("#vip").click(function () {
            ShowCurrent($("#vipusers"), $(this))
        });
        $("#admin").click(function () {
            ShowCurrent($("#adminusers"), $(this))
        });
        $("#blog").click(function () {
            ShowCurrent($("#blogs"), $(this))
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