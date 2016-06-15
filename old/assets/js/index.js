j(function () {
    
    //
    // rest("auth.shop.post",{"shopId":SHOPID},function (data) {
    //     location.href = data.RESULT_DATA.result.url;
    //
    // });
    //
    rest("shop.get", {shopId: SHOPID},
        function (data) {
            if (data.RESULT_DATA.code == 200) {
                var result = data.RESULT_DATA.result;
                //有效文字赋值
                if (result.originalPicUrl != null) {
                    j("#shop").css({backgroundImage: "url(" + result.originalPicUrl + ")"});
                    j("#bg").attr('src', result.originalPicUrl);
                }
                j("title").html(result.name);
                j("#menu-name").html(result.name);
                j("#shop-name").html(result.name);
                j("#shop-avgprice").html("￥" + result.avgprice + "/位");
                j("#shop-table").html(result.boxNum + "包厢 " + result.tableNum + "散台");
                j("#shop-biztime").html(result.beginTime + "到" + result.closeTime);
                j("#shop-opentime").html("开业日期：" + result.openingDay);

                j("#shortcut-bar-shop-name").html(result.name);

                j("#shop-address").html(result.address);
                j("#shop-phone").html(result.tel);
                j("#shop-tel").attr("href", "tel:" + result.tel);
                j("#shop-num").html("其他" + result.shopNum + "家门店");
                //头像
                if (result.customerNum == 0) {
                    j("#wanglai").html('<div class="am-padding-lg am-u-sm-offset-1 am-u-sm-11" style="background: url(\'/mweb/assets/images/modal.png\') no-repeat;background-size: 40px;40px">'
                        + '<div class="text-grey am-text-sm am-padding-left" >参与本店活动，第1位上宾等你来占哦~</div>'
                        + '</div>');
                } else {
                    if (result.customerNum < 4) {
                        j("#over").hide();
                    }
                    var length = result.customerNum > 3 ? 3 : result.customerNum;
                    for (var i = 0; i < length; i++) {
                        if (result.customerUrl && result.customerUrl[i]) {
                            j('#user-avatar').append("<img class='am-radius am-margin-right-sm' alt='头像'" +
                                "src=\"" + result.customerUrl[i] + "\" width='40' height='40'/>")
                        }
                    }
                    j('#user-num').html(result.customerNum + "人");
                }
                //活动赋值
                if (result.memberGrade != null) {  //is member
                    j('#vip').show();
                    j('#no-vip').hide();
                    j('#vip .name').html(JSON.parse(j.cookie("user"))["nickname"] + '，您现在是' + result.memberGrade.name);
                } else if (result.memberActivity != null) {
                    j('#no-vip .time').html(result.memberActivity.time);
                    j('#no-vip .name').text(result.memberActivity.name);
                    j('#no-vip .participants').html(result.memberActivity.participants + "人加入");
                } else {
                    j('#no-vip').hide();
                }
                if (result.exchangeActivity != null) {
                    j('#exchange-activity .time').html(result.exchangeActivity.time);
                    j('#exchange-activity .name').text(result.exchangeActivity.name);
                    j('#exchange-activity .participants').html(result.exchangeActivity.participants + "人兑换");
                } else {
                    j('#exchange-activity').hide();
                }
                if (result.activities != null) {
                    for (var i in result.activities) {
                        var url = encodeURIComponent(result.activities[i].name);
                        j('#activities').append(
                            '<a href=\"activity.vhtml?' + result.activities[i].activityId + '&' + url + '&' + result.activities[i].activityCategory + '\">'
                            + ' <div class="am-g am-padding-vertical">'
                            + ' <div class="am-u-sm-1 am-text-left">'
                            + '<svg class="icon"><use xlink:href="/mweb/assets/i/sprite.svg#' + result.activities[i].activityCategory + '2"></use></svg>'
                            + '</div>'
                            + '<div class="am-u-sm-10 am-padding-left am-text-sm">' + result.activities[i].name
                            + ' <div class="am-text-xs text-grey">' + result.activities[i].time + '</div>'
                            + '</div>'
                            + '<div class="am-u-sm-1 text-grey am-text-xs">'
                            + '<div class="am-fr activity-arrow am-margin-top-xs"><i class="iconfont">&#xe605;</i>'
                            + '</div>'
                            + '</div>'
                            + '</div>'
                            + '</a>'
                            + '<hr/>'
                        );
                    }
                }
                else {
                    j('#activity-title').hide();
                }

                if (result.activeActivities != null) {
                    for (var i in result.activeActivities) {
                        var button = '';
                        var text = "领取";
                        if (result.activeActivities[i].activityCategory == "COUPONFREE") {
                            if (TOKEN == "" || TOKEN == null || TOKEN == "null") {
                                button = "<button class='am-btn am-btn-xs button1 login'>领取</button>";
                            } else {
                                button = '<button type="button" class="am-btn am-btn-xs button1 getCounpon" id="' + result.activeActivities[i].activityId + '">领取'
                                    + '    </button>';
                            }
                        } else if (result.activeActivities[i].activityCategory == "CHARGE") {
                            text = "充值"
                        }
                        var url1 = encodeURIComponent(result.activeActivities[i].name);
                        j('#activeActivities').append(
                            '<hr/>'
                            + '<div class="am-g am-padding-vertical">'
                            + '<a href=\"activity.vhtml?' + result.activeActivities[i].activityId + '&' + url1 + '&' + result.activeActivities[i].activityCategory + '\">'
                            + '<div class="am-u-sm-1">'
                            + '<svg class="icon"><use xlink:href="/mweb/assets/i/sprite.svg#' + result.activeActivities[i].activityCategory + '2"></use></svg>'
                            + '</div>'
                            + '</a>'
                            + '<a href=\"activity.vhtml?' + result.activeActivities[i].activityId + '&' + url1 + '&' + result.activeActivities[i].activityCategory + '\">'
                            + '<div class="am-u-sm-7 am-padding-right-0 am-padding-left am-text-sm">'
                            + result.activeActivities[i].name
                            + '<div class="am-text-xs text-grey">' + result.activeActivities[i].time + '</div>'
                            + '</div>'
                            + '</a>'
                            + '<div class="am-u-sm-4 text-grey am-text-xs am-text-right am-padding-right-xl" style="line-height:2rem ">'
                            + '<div class="am-text-truncate">' + result.activeActivities[i].participants + '人' + text + '</div>'
                            + button
                            + '<div class="am-fr activity-arrow"><i class="iconfont">&#xe605;</i></div>'
                            + '</div>'
                            + '</div>'
                        );

                    }
                }

                if (j('#activeActivities .am-g').size() < 3) {
                    j('#more').hide();
                } else {
                    j('#more').click();
                }
            }
            else {
                location.href = "error.vhtml";
            }
        });
    rest("user.get", {},
        function (data) {
            if (data.RESULT_DATA.code == 200) {
                var result = data.RESULT_DATA.result;
                j('#power').attr('href', 'power.vhtml?vip');
                //cache
                j.cookie("user", JSON.stringify(result), {expires: 30, path: "/"});
                //未登录元素隐藏
                j('#headerDiv .unlogic').hide();
                j('#unlogic1').hide();
                j('#headerDiv .logic').show();
                j('#logic1').show();
                j("#user-name").html(result.nickname);
                j("#user-name1").html(result.nickname);
                j("#user-name2").html(result.nickname);
                if (result.birthday == null) {
                    j("#user-birth").html("<a href=\"birthdayedit.vhtml\">补全生日</a>");
                    j("#user-birth1").html("<a href=\"birthdayedit.vhtml\">补全生日</a>");
                } else {
                    j("#user-birth").html("你的生日<br/>" + result.birthday);
                    j("#user-birth1").html("你的生日<br/>" + result.birthday);
                }
            }
        }, 1);

    j("#modal-confirm").load("/mweb/modal.html#my-confirm");
    j("body").on("click", ".login", function () {
        window.location.href = "login.vhtml";
    });
    j('#more').on('click', function () {
        j(this).text().length != 6 ? j(this).text("更多优惠 ▼") : j(this).text("收起 ▲");
        j('#activeActivities .am-g').each(function (index) {
            if (index > 1) {
                j(this).slideToggle(300);
                j(this).next().slideToggle(300);
            }
        });
    });
    j("body").on("click", ".getCounpon", function () {
        var button = j(this);
        getCounpon(button);
    });
});
function logout() {
    rest("user.logout", {},
        function (data) {
            if (data.RESULT_DATA.code == 200) {
                j.cookie("token", null, {expires: 0, path: "/"});
                localStorage.removeItem("token");
                window.location.reload();
            }
        });
}

var preScroll = 0;
j(window).scroll(function () {
    var yScroll = self.pageYOffset;
    if (yScroll > 5) {
        j('#headerDiv').removeClass('am-hide');

    } else {
        j('#headerDiv').addClass('am-hide');

    }
    preScroll = yScroll;
});
