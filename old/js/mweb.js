function msg(txt) {
    if (j("#msg").length == 0) {
        j("body").append("<div id=\"msg\" class=\"msg\"></div>")
    }
    j("#msg").hide();
    j("#msg").html(txt);
    j("#msg").fadeIn(800,
        function () {
            setTimeout("j('#msg').fadeOut(400)", 800)

        }
    );
}

function titlebar(txt, isback) {
    var cols1 = 3;
    if (isback == true) {
        cols1 = 3;
    } else {
        cols1 = 0;
    }
    var cols2 = 12 - cols1 * 2;
    if (j("#titlebar").length > 0) {
        j("body").remove();
    } else {
        var tb = "";
        tb += "<div id=\"titlebar\" class=\"nav navbar-fixed-top titlebar\">";
        if (cols1 > 0) {
            tb += "      <div class=\"col-xs-" + cols1 + " text-left\">&nbsp;&nbsp;<a href=\"javascript:history.back();\"><i class=\"iconfont pink\">&#xe60a;</i></a></div>";
        }
        tb += "      <h4 class=\"col-xs-" + cols2 + "\">" + txt + "</h4>";
        tb += "</div>";

        j("body").append(tb);
    }
    j("div.container:first").css({"margin-top": "40px"});
}

function rest(method, data, successCallback) {
    var code = arguments[3];
    var paras = {};
    paras.method = method;
    paras.data = JSON.stringify(data);
    paras.version = "1.0.0";
    paras.rnd = Math.random();
    j.ajax({
        type: "post",
        async: true,
        url: CONTEXT + "/rest.do",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: paras,
        dataType: "json",
        cache: false,
        beforeSend: function (xmlHttp) {
            xmlHttp.setRequestHeader("If-Modified-Since", "0");
            xmlHttp.setRequestHeader("Cache-Control", "no-cache");
        },
        success: function (data) {
            if (successCallback != null) {
                if (data.RESULT_CODE == 0) {
                    if (data.RESULT_DATA.code == 403000) {
                        j.cookie("token", null, {expires: 0, path: "/"});
                        localStorage.removeItem("token");
                        if (!code) {
                            location.href = "login.vhtml";
                        }
                    } else {
                        successCallback(data);
                        j('.loader-bg').hide();
                        j('#total').show();
                    }
                } else {
                    msg(data.RESULT_DATA.ERROR_TITLE);
                }
            }
        },
        error: function () {
            msg("系统请求错误!");
        }
    });
}

//识别码
function identify() {
    rest("membership.identify.get", {shopId: SHOPID}, function (data) {
        if (data.RESULT_DATA.code == 200) {
            var result = data.RESULT_DATA.result;
            if (result.code != null) {
                for (var i = 0; i < result.code; i++) {
                    j("#no" + i).html(result.code.charAt(i));
                }
                j("#alert").modal();
            }
        }
    });
}
//提交电话号码领券
function submit(id, key) {
    var value = j('#input').val();
    if (value == "") {
        msg("手机号码不能为空！")
    } else if (/^\s*1\d{10}\s*$/.test(value)) {
        rest(key, {phone: value, id: id}, function (data) {
            if (data.RESULT_DATA.code == 200) {
                window.location.href = "finish.vhtml";
            } else {
                msg(data.RESULT_DATA.message);
            }
        })
    } else {
        msg("请正确填写手机号码！")
    }
}
//点击兑换
function exchange(index) {
    var id = index.split("&");
    j("#count").html(id[0]);
    j('#exchange').modal({
        relatedTarget: this,
        onConfirm: function (options) {
            rest("benefit.exchange.post", {shopId: SHOPID, activityId: id[1], ruleId: id[2]}, function (data) {
                if (data.RESULT_DATA.code == 200) {
                    j('#my-confirm').modal();
                    j('#my-confirm .am-modal-btn:first').click(function () {
                        location.reload();
                    });
                }
                else {
                    window.location.href = "login.vhtml";
                }
            })
        }

    });
}
//领券
function getCounpon(obj) {
    rest("benefit.coupon.post", {activityId: obj.attr('id'), shopId: SHOPID}, function (data) {
        if (data.RESULT_DATA.code == 200) {
            j('#my-confirm').modal({
                relatedTarget: this,
                onConfirm: function () {
                    window.location = "power.vhtml";
                },
                onCancel: function () {
                    obj.addClass('am-disabled')
                }
            });
        } else {
            obj.addClass('am-disabled');
            msg(data.RESULT_DATA.message);
        }
    });
}
function cancel() {
    rest("check.cancel.post",{shopId:SHOPID},function () {
        j.cookie("table_id", "", {expires: 0, path: "/"});
        j.cookie("table_time", "", {expires: 0, path: "/"});
        j.cookie("check_id", "", {expires: 0, path: "/"});
        location.href = "index.vhtml";
    })

}