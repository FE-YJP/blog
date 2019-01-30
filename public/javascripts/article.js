$(function () {
    if ($.cookie("username")) {
        $("#send").on("click", function () {
            var theme = $("#theme").val();
            var title = $("#title").val();
            var subtitle = $("#subtitle").val();
            var content = $("#content").val();
            if (theme && title && content) {
                $.post("/users/article", {
                    username: $.cookie("username"),
                    theme: theme,
                    title: title,
                    sub: subtitle,
                    content: content,
                    createtime: new Date().toLocaleString(),
                }, function (data) {
                    if (data == 1) {
                        var art = confirm("发表成功,是否查看");
                        if (art) {
                            location.assign("/detail");
                        }
                    }
                });
            } else {
                alert("主题,标题,内容不能为空");
            }
        });
    } else {
        alert("请登录");
    }
})