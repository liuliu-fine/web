j(function () {
    j("#modal-alert").load("/mweb/modal.html");
    j("body").on("click", ".login", function () {
        window.location.href = "login.vhtml";
    });
    //识别码
    j("body").on("click", ".identify", function () {
        identify();
    });
    //免费领卡
    j("body").on("click", ".free", function () {
        var button1 = j(this);
        var id = button1.attr("id");
        rest("membership.post", {shopId: SHOPID}, function (data) {
            if (data.RESULT_DATA.code == 200) {
                j('#my-confirm').modal({
                    relatedTarget: this,
                    onConfirm: function () {
                        window.location = "power.vhtml";
                    },
                    onCancel: function () {
                        button1.addClass('am-disabled');
                    }
                });
            } else {
                msg("领取失败");
            }
        })
    });

    rest("membership.rules.get", {shopId: SHOPID}, function (data) {
            if (data.RESULT_DATA.code == 200) {
                var result = data.RESULT_DATA.result;
                if (result == null) {
                    j(".title-ing").hide();
                    j("#total").hide();
                }
                else {
                    var contain = "";
                    for (var i in result) {
                        var ruleText = "";
                        var type = j("#vip").html();

                        type = type.replace("@@title@@", result[i].toName);
                        if (result[i].ruleText == null) {
                            j('#special').hide();
                        } else {
                            for (var o in result[i].ruleText) {
                                var text = j("#activity-name").html();
                                text = text.replace("@@name@@", result[i].ruleText[o].name);
                                text = text.replace("@@time@@", result[i].ruleText[o].time);
                                ruleText += text;
                            }
                            type = type.replace(j("#activity-name").html(), ruleText);
                        }
                        if (result[i].strategy == null) {
                            type = type.replace(j('#upgrade').html(), "");
                            type = type.replace(j('#rule').html(), "");
                        } else {
                            var text1 = "";
                            for (var s in result[i].strategy) {
                                //按钮链接的url 不一样
                                var button = "";
                                var text_type = result[i].strategy[s].type;
                                var strategy = j('#upgrade').html();
                                strategy = strategy.replace("@@upgrade-name@@", result[i].strategy[s].content);
                                //判断是否登陆
                                if (TOKEN == "" || TOKEN == null || TOKEN == "null") {
                                    var text_map = {FREE: "领卡", BUY: "购买", CHARGE: "充值", POINT_EXCHANGE: "兑换"};
                                    button = text_type == "POINT" ? "" : "<button class='am-btn am-btn-xs am-u-sm-offset-2 am-u-sm-10 btn login'>" + text_map[text_type] + "</button>";
                                } else {
                                    switch (text_type) {
                                        case "FREE":
                                            button = "<button class='am-btn am-btn-xs am-disabled am-u-sm-offset-2 am-u-sm-10 btn free'>领卡</button>";
                                            break;
                                        case "BUY":
                                            button = "<button class='am-btn am-btn-xs am-disabled am-u-sm-offset-2 am-u-sm-10 btn identify'>购买</button>";
                                            break;
                                        case "CHARGE":
                                            button = "<button class='am-btn am-btn-xs am-disabled am-u-sm-offset-2 am-u-sm-10 btn identify'>充值</button>";
                                            break;
                                        case "POINT_EXCHANGE":
                                            button = "<button class='am-btn am-btn-xs am-disabled am-u-sm-offset-2 am-u-sm-10 btn exchange_button' onclick='exchange(\"" + result[i].strategy[s].amount + "&" + result[i].strategy[s].activityId + "&" + result[i].strategy[s].ruleId + "\")'>兑换</button>";
                                    }
                                }
                                if (result[i].strategy[s].usable) {
                                    button = button.replace('am-disabled', "");
                                }
                                strategy = strategy.replace(j('#button').html(), button);
                                text1 += strategy;
                            }
                            type = type.replace(j('#upgrade').html(), text1);
                        }
                        contain += type;

                    }
                    j("#vip").html(contain);
                }
            }    else{
                window.location.href = "login.vhtml";
            }
    })

});
