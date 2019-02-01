$(function () {
    let html = $("#html");
    let css = $("#css");
    let js = $("#js");
    $.get('/html', function (data) {
        //页码
        var count = 1;
        data.forEach((item, index) => {
            var str =
                `
        <a href="/detail?title=${item.title}" class="list-group-item"><span class="ellipsis">${item.title}</span>
                <span class="pull-right">${item.createtime}</span></a>
        `;
            html.find("div").append(str);
            //分页
            if (index % 5 == 0) {
                var page = `
                <li><a href="#">${count}</a></li>
                `;
                $(".html").append(page);
                count++;
            }

        });
        //默认显示5条
        html.find("div").children().hide();
        for (let i = 0; i < 5; i++) {
            html.find("div").children().eq(i).show();
        }
        //第一页active
        $(".html").children().eq(0).addClass("active");
        //点击对应页码显示对应的列表
        $(".html").children().on("click", function () {
            var num = $(this).index();
            html.find("div").children().hide();
            for (let j = num * 5; j < num * 5 + 5; j++) {
                html.find("div").children().eq(j).show();
            }
            $(".html").children().removeClass("active");
            $(".html").children().eq(num).addClass("active");
        });
    });
    $.get('/css', function (data) {
        var count = 1;
        data.forEach((item, index) => {
            var str =
                `
        <a href="/detail?title=${item.title}" class="list-group-item"><span class="ellipsis">${item.title}</span>
                <span class="pull-right">${item.createtime}</span></a>
        `;
            css.find("div").append(str);
            //分页
            if (index % 5 == 0) {
                var page = `
                <li><a href="#">${count}</a></li>
                `;
                $(".css").append(page);
                count++;
            }
        });
        //默认显示5条
        css.find("div").children().hide();
        for (let i = 0; i < 5; i++) {
            css.find("div").children().eq(i).show();
        }
        //第一页active
        $(".css").children().eq(0).addClass("active");
        //点击对应页码显示对应的列表
        $(".css").children().on("click", function () {
            var num = $(this).index();
            css.find("div").children().hide();
            for (let j = num * 5; j < num * 5 + 5; j++) {
                css.find("div").children().eq(j).show();
            }
            $(".css").children().removeClass("active");
            $(".css").children().eq(num).addClass("active");
        });
    });
    $.get('/js', function (data) {
        var count = 1;
        data.forEach((item, index) => {
            var str =
                `
        <a href="/detail?title=${item.title}" class="list-group-item"><span class="ellipsis">${item.title}</span>
                <span class="pull-right">${item.createtime}</span></a>
        `;
            js.find("div").append(str);
            //分页
            if (index % 5 == 0) {
                var page = `
                <li><a href="#">${count}</a></li>
                `;
                $(".js").append(page);
                count++;
            }
        });
        //默认显示5条
        js.find("div").children().hide();
        for (let i = 0; i < 5; i++) {
            js.find("div").children().eq(i).show();
        }
        //第一页active
        $(".js").children().eq(0).addClass("active");
        //点击对应页码显示对应的列表
        $(".js").children().on("click", function () {
            var num = $(this).index();
            js.find("div").children().hide();
            for (let j = num * 5; j < num * 5 + 5; j++) {
                js.find("div").children().eq(j).show();
            }
            $(".js").children().removeClass("active");
            $(".js").children().eq(num).addClass("active");
        });

    });

});