var query = window.location.search.substr(1);
if (query == 'vip') {
    j(".coupon").html("已领券");
}
j("header").append("<div class='am-header-right am-header-nav'><a href=\"index.vhtml\"><span style=\"background: #5099e8;padding: 5px;\" class=\"border-radius text-white am-text-xs am-padding-horizontal-xs\"><i class=\"iconfont\">&#xe602;</i>进店看看</span></a></div>");

if (TOKEN == "" || TOKEN == null || TOKEN == "null") {
    location.href = "index.vhtml";
}
j("#payment").click(function () {
    if (!j("#table").val()) {
        msg("桌号不能为空")
    } else {
        showPosition();
    }
});
//获取地理位置
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, function () {
            msg('定位失败.');
        }, { // 附带参数
            enableHighAccuracy: true// 提高精度(耗费资源)
        });
    }
    else {
        msg("设备不支持定位.");
    }
}

//取到信息
function showPosition(position) {
    // var init = [position.coords.longitude, position.coords.latitude];
    var init = [121.429313,31.253051];
    var json = {
        shopId: SHOPID,
        tableNo: j("#table").val(),
        latitude: init[1],
        longitude: init[0]
    }

    rest("check.post", json, function (data) {
        if (data.RESULT_DATA.code == 200) {
            var date = new Date();
            j.cookie("table_id", j("#table").val(), {path: "/"});
            j.cookie("table_time", date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(), {path: "/"});
            j.cookie("check_id", data.RESULT_DATA.result.id, {path: "/"});
            location.href = "payRequest.vhtml";
        } else {
            msg(data.RESULT_DATA.message);
            if (data.RESULT_DATA.code == 403007||data.RESULT_DATA.code == 403005) {
                j("#payment").parent().html('<div class="am-margin-bottom-sm">' + data.RESULT_DATA.message + '</div><button class="am-u-sm-10 am-u-sm-offset-1 am-btn am-radius am-disabled bg-grey text-white" id="payment">一键智付 </button>')
            }
        }
    })

}
if (j.cookie("table_id")) {
    j("#out").hide();
    j("#in").show();
}
rest("benefit.get", {shopId: SHOPID},
    function (data) {
        if (data.RESULT_DATA.code == 200) {
            var result = data.RESULT_DATA.result;

            j.cookie("relationId", result.relationId, {expires: 30, path: "/"});
            if (result.memberCardNo != null) {
                j("#member-info").hide();

            }
            //是会员
            if (result.memberCardNo != null) {
                j("#member-info").show();
                j("#member-uninfo").hide();
            } else {
                //有入会规则
                if (result.existMemberRule) {
                    j("#member-info").hide();
                    j("#member-uninfo").show();
                } else {
                    j('#top').hide();
                }
            }

            j("#section-coupon").show();
            j("#member-grade-name").html(result.memberGradeName);
            j("#member-card-no").html(result.memberCardNo);
            j("#member-charge").html("￥" + result.charge);
            j("#remainder").attr("href", "remainder.vhtml?" + result.charge);
            j("#point").attr("href", "pointRecord.vhtml?" + result.point);
            j("#member-point").html(result.point);

            if (result.couponCount > 0) {
                j("#member-coupon-count").html(result.couponCount);
            }

            var v = "";
            if (result.coupon == null) {
                j('#coupon-list').html(j('#img').html());
            }
            for (var o in result.coupon) {
                var coupon = result.coupon[o];
                var tmp = "";
                if (coupon.category == "901") {
                    tmp = j("#tmp-coupon-charge").html();
                    tmp = tmp.replace("@@name@@", coupon.name);
                    tmp = tmp.replace("@@startTime@@", coupon.startTime);
                    tmp = tmp.replace("@@endTime@@", coupon.endTime);
                    tmp = tmp.replace("@id@", "couponShow.vhtml#" + coupon.id);
                }
                if (coupon.category == "902") {
                    tmp = j("#tmp-coupon-consume").html();
                    tmp = tmp.replace("@@name@@", coupon.name);
                    tmp = tmp.replace("@@amount@@", coupon.amount);
                    tmp = tmp.replace("@@currentAmount@@", coupon.currentAmount ? "￥" + coupon.currentAmount + ".0" : "免费");
                    tmp = tmp.replace("@@startTime@@", coupon.startTime);
                    tmp = tmp.replace("@@endTime@@", coupon.endTime);
                    tmp = tmp.replace("@id@", "couponShow.vhtml#" + coupon.id);
                }
                v += tmp;
            }
            j("#coupon-list").append(v);
        }
        else {
            if (TOKEN == "" || TOKEN == null || TOKEN == "null") {
                location.href = "index.vhtml";
                return;
            }
            j('#my-popup').modal();
            j("#top").hide();
            j(".bg-grey-white.border").hide();
            j("#middle").hide();
            j('#img').show();
        }
    });
