$(function () {
    //默认显示
    let html = $("#html");
    let css = $("#css");
    let js = $("#js");

    function Get_default(url, Tabpanes, Page) {
        $.get(url, function (data) {
            //页码
            var count = 1;
            data.forEach((item, index) => {
                var str =
                    `
            <a href="/detail?title=${item.title}" class="list-group-item">
            <span class="ellipsis">用户名:${item.username}</span>
            <span class="ellipsis">${item.title}</span>
            <span class="ellipsis">${item.createtime}</span>
            <button data-id="${item.title}" class="btn btn-info change_article">修改</button>
            <button data-id="${item.title}" class="btn btn-warning delete_article">删除</button>
            </a>
            `;
                Tabpanes.find("div").append(str);
                //分页
                if (index % 5 == 0) {
                    var page = `
                    <li><a href="#">${count}</a></li>
                    `;
                    Page.append(page);
                    count++;
                }

            });
            //默认显示5条
            Tabpanes.find("div").children().hide();
            for (let i = 0; i < 5; i++) {
                Tabpanes.find("div").children().eq(i).show();
            }
            //第一页active
            Page.children().eq(0).addClass("active");
            //点击对应页码显示对应的列表
            Page.children().on("click", function () {
                var num = $(this).index();
                Tabpanes.find("div").children().hide();
                for (let j = num * 5; j < num * 5 + 5; j++) {
                    Tabpanes.find("div").children().eq(j).show();
                }
                Page.children().removeClass("active");
                Page.children().eq(num).addClass("active");
            });
        });
    }
    Get_default("/html", html, $('.html'));
    Get_default("/css", css, $('.css'));
    Get_default("/js", js, $('.js'));
    $(document).on("click", "#search_article_btn", function () {
        var con = $("#search_article").val();
        $.get('/search', {
            title: con,
        }, function (data) {
            if (data == 0) {
                var str = `
                <a href="javascript:;" class="list-group-item">没有结果</a>
                `;
                $(".article").append(str);
            } else {
                data.forEach((item) => {
                    var str =
                        `
            <a href="/detail?title=${item.title}" class="list-group-item">
            <span class="ellipsis">用户名:${item.username}</span>
            <span class="pull-right">标题名:${item.title}</span></a>
            `;
                    $(".article").append(str);
                });
            }

        });
    });
    //清空博客列表
    $(document).on("click", "#cleararticle", function () {
        $(".article").html("");
    });
    //跳转修改页面
    $(document).on("click", ".change_article", function () {
        location.assign('/change?title=' + $(this).attr("data-id"));
        return false;
    });
    //删除博客
    $(document).on("click", ".delete_article", function () {
        $(this).parent().remove();
        $.get("/deleteblog", {
            title: $(this).attr("data-id"),
        }, function (data) {
            if (data == 1) {
                alert("删除成功");
            }
            if (data == 0) {
                alert("删除失败");
            }
        });
        return false;
    })
});