$(function () {
    var str = decodeURI(location.search).split("=")[1];
    $.get("/changearticle", {
        title: str
    }, function (data) {
        $("#theme").val(data[0].theme);
        $("#title").val(data[0].title);
        $("#subtitle").val(data[0].sub);
        $("#content").val(data[0].content);
    });
    //发送修改内容
    $("#send").on("click", function () {
        $.get("/changeblog", {
            title: str,
            theme: $("#theme").val(),
            title: $("#title").val(),
            sub: $("#subtitle").val(),
            content: $("#content").val(),
        }, function (data) {
            if (data == 1) {
                alert("修改成功");
            }
            if (data == 0) {
                alert("修改失败");
            }
        });
    });
});