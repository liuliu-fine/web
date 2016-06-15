j(function () {
    var query = decodeURIComponent(window.location.search.substr(1));
    query = query.split('&');
    //简介的图标文字
    j('#img').attr("src", "/mweb/assets/i/" + query[2] + ".svg");
    j('#title').html(query[1]);
    //领券的样式加载
    j("#modal-confirm").load("/mweb/modal.html");

//识别码
    j("#charge").click(function () {
        identify();
    });

//领券
    j("body").on("click", ".getCoupon", function () {
        getCounpon(j(this));
    });

    rest("activity.get", {activityId: query[0], shopId: SHOPID}, function (data) {
        if (data.RESULT_DATA.code == 200) {
            var result = data.RESULT_DATA.result;
            var map = {
                COUPONFREE: "送券",
                CHARGE: "充值",
                DISCOUNT: "打折",
                SPECIAL_PRICE: "特价",
                COUPON: "消费返券",
                POINT: "积分",
                POINTCONSUME: "积分抵现",
                CHARGECONSUME: "充值卡使用"
            };

            if (result.get != null) {
                for (var i in result.get) {
                    //标题
                    j("#am-name").text(map[result.get[0].activityCategory]);
                    //显示领取按钮
                    if (result.get[0].activityCategory == "COUPONFREE") {
                        j('#getCoupon').show();
                        j('#getCoupon').find('.getCoupon').attr('id', result.get[0].activityId);
                    }
                    //显示充值按钮
                    if (result.get[0].activityCategory == "CHARGECONSUME" || result.get[0].activityCategory == "CHARGE") {
                        j('#getCharge').show();
                        j('#getCharge').find('button').attr('id', result.get[0].activityId);

                    }
                    //限制条件
                    if (result.get[i].periods != null) {
                        j("#periods").html(j("#periods").html().replace("@periods@", result.get[i].periods));
                    } else {
                        j("#periods").hide();
                    }
                    if (result.get[i].shared != null) {
                        j("#shared").html(j("#shared").html().replace("@shared@", result.get[i].shared));
                    } else {
                        j("#shared").hide();
                    }
                    if (result.get[i].shops != null) {
                        j("#shops").html(j("#shops").html().replace("@shops@", result.get[i].shops));
                    } else {
                        j("#shops").hide();
                    }
                    if (result.get[i].time != null) {
                        j("#time").html(j("#time").html().replace("@time@", result.get[i].time));
                    } else {
                        j("#time").hide();
                    }
                    if (result.get[i].nonParticipations != null) {
                        j("#nonParticipations").html(j("#nonParticipations").html().replace("@nonParticipations@", result.get[i].nonParticipations));
                    } else {
                        j("#nonParticipations").hide();
                    }
                    if (result.get[i].limit != null) {
                        var limit_contents = "";
                        for (var s in result.get[i].limit) {
                            var limit_content = j("#limit-content").html();
                            limit_content = limit_content.replace("@limit@", result.get[i].limit[s]);
                            limit_contents += limit_content;
                        }
                        j("#limit-content").html(limit_contents);

                    } else {
                        j("#limit").hide();
                    }
                    //内容
                    var strategy = "";
                    for (var o in result.get[i].strategy) {
                        var title = j("#activity-title").html();
                        title = title.replace("@class@", result.get[i].strategy[o].name);
                        var content1 = "";
                        var details = result.get[i].strategy[o].details;
                        for (var t in details) {
                            //名称
                            var content = j("#activity-content").html();
                            if (details[t].content != null) {
                                var list = "";
                                for (var c in details[t].content) {
                                    var list_name = j("#list-name").html();
                                    list_name = list_name.replace("@content@", details[t].content[c]);
                                    list += list_name;
                                }
                                content = content.replace(j("#list-name").html(), list);

                            }
                            //券
                            var coupons = "";
                            if (details[t].coupons != null) {
                                for (var c in details[t].coupons) {
                                    var coupon = details[t].coupons[c];
                                    var tmp = "";
                                    if (coupon.category == "901") {
                                        tmp = j("#tmp-coupon-charge").html();
                                        tmp = tmp.replace("@@name@@", coupon.name);
                                        tmp = tmp.replace("@@effectTimes@@", coupon.effectTimes);
                                        tmp = tmp.replace("@id@", "couponShow.vhtml?" + coupon.id);
                                    }
                                    if (coupon.category == "902") {
                                        tmp = j("#tmp-coupon-consume").html();
                                        tmp = tmp.replace("@@name@@", coupon.name);
                                        tmp = tmp.replace("@@amount@@", coupon.amount);
                                        tmp = tmp.replace("@@currentAmount@@", coupon.currentAmount ? "￥" + coupon.currentAmount : "免费");
                                        tmp = tmp.replace("@@effectTimes@@", coupon.effectTimes);
                                        tmp = tmp.replace("@id@", "couponShow.vhtml?" + coupon.id);
                                    }
                                    coupons += tmp;
                                }
                            }
                            content = content.replace(j("#coupon").html(), coupons);
                            content1 += content;
                        }
                        title = title.replace(j("#activity-content").html(), content1);
                        strategy += title;
                    }
                    j("#activity-title").html(strategy);


                }
            } else {
                j("#get").hide();
            }
            //used
            if (result.used != null) {
                for (var i in result.used) {
                    //标题
                    j("#am-name1").text(map[result.used[0].activityCategory]);
                    //限制条件
                    if (result.used[i].periods != null) {
                        j("#periods1").html(j("#periods1").html().replace("@periods@", result.used[i].periods));
                    } else {
                        j("#periods1").hide();
                    }
                    if (result.used[i].shared != null) {
                        j("#shared1").html(j("#shared1").html().replace("@shared@", result.used[i].shared));
                    } else {
                        j("#shared1").hide();
                    }
                    if (result.used[i].shops != null) {
                        j("#shops1").html(j("#shops1").html().replace("@shops@", result.used[i].shops));
                    } else {
                        j("#shops1").hide();
                    }
                    if (result.used[i].time != null) {
                        j("#time1").html(j("#time1").html().replace("@time@", result.used[i].time));
                    } else {
                        j("#time1").hide();
                    }
                    if (result.used[i].nonParticipations != null) {
                        j("#nonParticipations1").html(j("#nonParticipations1").html().replace("@nonParticipations@", result.used[i].nonParticipations));
                    } else {
                        j("#nonParticipations1").hide();
                    }
                    if (result.used[i].limit != null) {
                        var limit_contents1 = "";
                        for (var s in result.used[i].limit) {
                            var limit_content1 = j("#limit-content1").html();
                            limit_content1 = limit_content1.replace("@limit@", result.used[i].limit[s]);
                            limit_contents1 += limit_content1;
                        }
                        j("#limit-content1").html(limit_contents1);

                    } else {
                        j("#limit1").hide();
                    }
                    //内容
                    var strategy1 = "";
                    for (var o in result.used[i].strategy) {
                        var title1 = j("#activity-title1").html();
                        title1 = title1.replace("@class@", result.used[i].strategy[o].name);
                        var context1 = "";
                        for (var t in result.used[i].strategy[o].details) {
                            var context = j("#activity-content1").html();
                            //名称
                            var list = "";
                            if (result.used[i].strategy[o].details[t].content != null) {
                                for (var x in result.used[i].strategy[o].details[t].content) {
                                    var list_name = j("#list-name1").html();
                                    list_name = list_name.replace("@content@", result.used[i].strategy[o].details[t].content[x]);
                                    list += list_name;
                                }
                            }
                            context = context.replace(j("#list-name1").html(), list);
                            //券
                            var coupons = "";
                            if (result.used[i].strategy[o].details[t].coupons != null) {
                                for (var c in result.used[i].strategy[o].details[t].coupons) {
                                    var coupon = result.used[i].strategy[o].details[t].coupons[c];
                                    var tmp = "";
                                    if (coupon.category == "901") {
                                        tmp = j("#tmp-coupon-charge").html();
                                        tmp = tmp.replace("@@name@@", coupon.name);
                                        tmp = tmp.replace("@@effectTimes@@", coupon.effectTimes);
                                    }
                                    else if (coupon.category == "902") {
                                        tmp = j("#tmp-coupon-consume").html();
                                        tmp = tmp.replace("@@name@@", coupon.name);
                                        tmp = tmp.replace("@@amount@@", coupon.amount);
                                        tmp = tmp.replace("@@currentAmount@@", coupon.currentAmount ? "￥" + coupon.currentAmount : "免费");
                                        tmp = tmp.replace("@@effectTimes@@", coupon.effectTimes);
                                    }
                                    coupons += tmp;
                                }
                            }
                            context = context.replace("@coupon@", coupons);
                            context1 += context;
                            title1 = title1.replace(j("#activity-content1").html(), context1);
                            strategy1 += title1;
                        }
                    }
                    j("#activity-title1").html(strategy1);

                }
            } else {
                j("#used").hide();
            }
        }
    });


});
