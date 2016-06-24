/**
 * Created by Administrator on 2016/6/20.
 */
$(function () {
    'use strict';
    // $(".icon-menu").click();
    $.fn.cookie("shopId", "d46170e19ef34011a8673a4f1ee96ba1");
    var SHOPID = $.fn.cookie("shopId");
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
    var redata = {
        "RESULT_DATA": {
            "message": "operate successfully",
            "result": {
                "customerUrl": ["http://image.sharejoy.cn/8AT54FTQ/8JS52E3N/86UM2EBP/d564ed3db4a14e27b6d02a2d3eea9140.jpg", "http://tp2.sinaimg.cn/1925474837/180/5669956140/1", "http://image.sharejoy.cn/8AT54FTQ/8JS52E3N/8AS52EKJ/240e7b095fd5400b8e6f6b0bb7e2f785.jpg"],
                "tel": "0519-81188881",
                "avgprice": 76,
                "checkRequest": {"settlementType": "902", "checking": false},
                "memberActivity": {
                    "time": "永久有效",
                    "name": "花费1000积分从88折会员升级为85折会员",
                    "card": "http://image.sharejoy.cn/8AT54FTQ/8ES52E3M/86U52EBN/3b54d9077e384c31b4f68049575bf670_1.jpg",
                    "activityCategory": "MEMBERUPGRADE",
                    "participants": 20
                },
                "id": "d46170e19ef34011a8673a4f1ee96ba1",
                "customerNum": 21,
                "latestComment": {
                    "createTime": "21:47",
                    "nickname": "浊哥",
                    "hideConsumption": false,
                    "score": 100.00001,
                    "picUrls": [{
                        "originalUrl": "http://image.sharejoy.cn/8AT54FTQ/8JS52E3N/8SS52E3Q/450ffba833d6468d9996c921b64ed038_0.png",
                        "url": "http://image.sharejoy.cn/8AT54FTQ/8JS52E3N/8SS52E3Q/450ffba833d6468d9996c921b64ed038.png"
                    }],
                    "consumptionAmount": 587,
                    "taste": "1001",
                    "id": "030e13b61f604c70a6ae5784fecd3098",
                    "content": "反反复复非常好，不是第一次来了",
                    "anonymous": false,
                    "surroundings": "1001",
                    "consumptionTime": "04/06 21:18",
                    "times": 2,
                    "age": 27,
                    "userId": "a7a6e897405c464ab26bc22ee39609c5",
                    "avatarUrl": "http://image.sharejoy.cn/8AT54FTQ/8ES52E3M/8AWM2EKT/20a07cd9ad0b4fedb597868f412ac585.jpg",
                    "service": "1001",
                    "createDate": "04/06"
                },
                "name": "码头故事(府琛店)",
                "longitude": 119.970706,
                "activities": [{
                    "activityId": "56e6b47860b2eb355a7dd98b",
                    "time": "永久有效",
                    "name": "菜品消费1元积1分，积分越高折扣越大！",
                    "activityCategory": "POINT"
                }, {
                    "activityId": "571f5d7e60b28cd9145a09d0",
                    "time": "2016/04/26～2016/06/26有效",
                    "name": "海南椰子鸡锅底新品原价88现价18",
                    "activityCategory": "SPECIAL_PRICE"
                }, {
                    "activityId": "56e6bf3360b2eb355a7dd996",
                    "time": "永久有效",
                    "name": "会员专享菜品折扣，最低75折！",
                    "activityCategory": "DISCOUNT",
                    "activities": [{
                        "activityId": "56e6bf3360b2eb355a7dd996",
                        "time": "永久有效",
                        "name": "会员专享菜品折扣，最低75折！",
                        "activityCategory": "DISCOUNT"
                    }, {
                        "activityId": "56e6b55a60b2eb355a7dd98d",
                        "time": "生日当天有效",
                        "name": "会员生日独享68折！",
                        "activityCategory": "DISCOUNT"
                    }]
                }],
                "boxNum": 3,
                "openingDay": "2014/11/18",
                "beginTime": "11:00",
                "tableNum": 37,
                "mottos": [{
                    "title": "丰湖有藤菜，似可敌蒓羹",
                    "source": "0",
                    "name": "小宾",
                    "pic": "http://image.sharejoy.cn/8AT54FTQ/8JS52E3N/8AUM2EKP/8635ab57222b470d86f2312bfa604065_0.jpg",
                    "sourceUrl": "https://user.sharejoy.cn/v1/shop/d46170e19ef34011a8673a4f1ee96ba1/motto/1",
                    "avator": "http://image.sharejoy.cn/8AT54FTQ/8NS52E3P/8JS52E3N/0bb008063e064ed6a292db1a95fa84e0.png"
                }, {
                    "title": "丰湖有藤菜，似可敌蒓羹",
                    "source": "0",
                    "name": "小宾",
                    "pic": "http://image.sharejoy.cn/8AT54FTQ/86S52E3K/86T52EBL/efa3a9c71b734badbe752fe0c0a4d7e7_0.jpg",
                    "sourceUrl": "https://user.sharejoy.cn/v1/shop/d46170e19ef34011a8673a4f1ee96ba1/motto/4",
                    "avator": "http://image.sharejoy.cn/8AT54FTQ/8NS52E3P/8JS52E3N/0bb008063e064ed6a292db1a95fa84e0.png"
                }, {
                    "title": "食乃天性，静静地咀嚼，轻轻地回味，原是非比寻常的韵致",
                    "source": "1",
                    "userUrl": "https://user.sharejoy.cn/v1/user/8922c3261a0d4f25b6dd92c7ea5a36ba",
                    "name": "非比寻常",
                    "pic": "http://image.sharejoy.cn/8AT54FTQ/8JS52E3N/8AUM2EKP/7ec3b3fec6a9492e9dd399f06f177ae8_0.jpg",
                    "sourceUrl": "https://user.sharejoy.cn/v1/comments/2/shop/d46170e19ef34011a8673a4f1ee96ba1",
                    "avator": "http://image.sharejoy.cn/8AT54FTQ/8NS52E3P/86UM2EBP/25533a22e1814df9b12478bb1d0b95ee_0.jpg"
                }],
                "commentNum": 1,
                "businessTimes": [{
                    "startTime": "11:00",
                    "id": "9e8ad5a6605643a2a05a3246fe7a12f6",
                    "endTime": "15:00",
                    "type": "1002"
                }, {
                    "startTime": "17:00",
                    "id": "3e7bb82efbba490b940ef7846d953ee8",
                    "endTime": "21:30",
                    "type": "1004"
                }, {
                    "startTime": "21:31",
                    "id": "f0f8011c4fb544e5920b23a67c42d8d1",
                    "endTime": "02:00",
                    "type": "1005"
                }],
                "closeTime": "02:00",
                "address": "通江中路与太湖路交叉口府琛广场2栋35号一层",
                "activeActivities": [{
                    "activityId": "56e6b61e60b2eb355a7dd98f",
                    "time": "永久有效",
                    "name": "充值巨惠！全场通用充2000送600！",
                    "activityCategory": "CHARGE",
                    "participants": 0
                }, {
                    "activityId": "57457110e4b009cc86e34cd9",
                    "time": "永久有效",
                    "name": "测试券",
                    "activityCategory": "COUPONFREE",
                    "participants": 3
                }],
                "checkedNum": 0,
                "shopNum": 1,
                "latitude": 31.81665,
                "exchangeActivity": {
                    "time": "永久有效",
                    "name": "积分兑换进行中",
                    "activityCategory": "EXCHANGE",
                    "participants": 28
                }
            },
            "code": 200
        }, "RESULT_CODE": 0
    };

    if (redata.RESULT_DATA.code == 200) {
        var result = redata.RESULT_DATA.result;
        $("#shop-name").text(result.name);
        $("#table").text(result.boxNum + "包厢/" + result.tableNum + "散台" + result.openingDay + "开业");
        var one = $("#one");
        var more = $("#more");
        //店铺滚动图---宽高比应相同
        for (var i = 0; i < result.mottos.length; i++) {
            $(".swiper-wrapper").append('<div class="swiper-slide"><img class="page-img" src="' + result.mottos[i].pic + '" alt=""></div>');
        }
        //二维码
        var qrcode = new QRCode($("#qrcode"),{
            width:100,
            height:100
        });
        qrcode.makeCode("www.baidu.com");
        //侧边栏
        // $(".user-info .avater").attr("src", result.customerUrl);

        //member
        if (result.memberActivity != null) {  //is member
            var html = one.clone();
            html.find(".text").html(result.memberActivity.name);
            html.find(".content-block-title").addClass(result.memberActivity.activityCategory);
            html.find(".content-block-title").attr("onclick", "goto('www.baidu.com')");
            $("#active-activity").append(html);
            //会员卡背景
            $(".vip-card").attr("style", "background:url('" + result.memberActivity.card + "') no-repeat")
        }
        //exchangeActivity
        if (result.exchangeActivity) {
            var html = one.clone();
            html.find(".content-block-title").addClass(result.exchangeActivity.activityCategory);
            html.find(".text").html(result.exchangeActivity.name);
            html.find(".grey.second").html(result.exchangeActivity.time);
            html.find(".grey.pull-right").html("已有" + result.exchangeActivity.participants + "人兑换");
            html.attr("onclick", "goto(activity.vhtml?" + result.exchangeActivity.activityId + '&' + encodeURIComponent(result.exchangeActivity.name) + '&' + result.exchangeActivity.activityCategory + ")");
            $("#active-activity").append(html);

        }
        //activeActivities
        if (result.activeActivities) {
            for (var i = 0; i < result.activeActivities.length; i++) {
                var activeActivities = result.activeActivities[i];
                var button = "";
                if (activeActivities.activityCategory == "COUPONFREE") {
                    button = '<div class="btn-orange text-xs" onclick="earnCoupon(' + activeActivities.activityId + ')">领券</div>'
                }
                if (activeActivities.activities) {
                    var html = more.clone();
                    html.find(".content-block-title").addClass(activeActivities.activityCategory);
                    html.find(".text").html("活动进行中！");
                    var lis = $("#more").find("li");
                    for (var j = 0; j < activeActivities.activities.length; j++) {
                        var li = lis.clone();
                        var activity = activeActivities.activities[j];
                        if (activeActivities.activityCategory == "COUPONFREE") {
                            button = '<div class="btn-orange text-xs" onclick="earnCoupon(' + activeActivities.activityId + ')">领券</div>'
                            li.find(".item-after").addClass("up");
                        }
                        li.find(".item-title .name").html(activity.name);
                        li.find(".item-title .grey").html(activity.time);
                        li.find(".item-after").html("已有" + activeActivities.participants + "人领取" + button);
                        html.find("ul").append(li);
                    }
                    $("#active-activity").append(html);

                } else {
                    var html = one.clone();
                    html.find(".content-block-title").addClass(activeActivities.activityCategory);
                    html.find(".text").html(activeActivities.name);
                    html.find(".grey.second").html(activeActivities.time);
                    html.find(".grey.pull-right").html("已有" + activeActivities.participants + "人领取" + button);
                    html.attr("onclick", "goto(activity.vhtml?" + activeActivities.activityId + '&' + encodeURIComponent(activeActivities.name) + '&' + activeActivities.activityCategory + ")");
                    $("#active-activity").append(html);
                }
            }
        }
        //activities
        if (result.activities) {
            var bg_one = $("#activity-one");
            for (var i = 0; i < result.activities.length; i++) {
                var activities = result.activities[i];
                if (activities.activities) {
                    var html = more.clone();
                    html.removeClass("content-padded").addClass("bg-more");
                     html.addClass(activities.activityCategory);
                    html.find(".text").html("活动进行中！");
                    var lis = $("#more").find("li");
                    for (var j = 0; j < activities.activities.length; j++) {
                        var li = lis.clone();
                        var activity = activities.activities[j];
                        li.find(".item-title .name").html(activity.name);
                        li.find(".item-title .grey").html(activity.time);
                        html.find("ul").append(li);
                    }
                    $("#activity").append(html);

                } else {
                    var html = bg_one.clone();
                    html.addClass(activities.activityCategory);
                    html.find(".text").html(activities.name);
                    html.find(".grey.second").html(activities.time);
                    html.attr("onclick", "goto(activity.vhtml?" + activities.activityId + '&' + encodeURIComponent(activities.name) + '&' + activities.activityCategory + ")");
                    $("#activity").append(html);
                }
            }
        } else {
            $("#activity").hide();
        }

    }
    $(".swiper-container").swiper({
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    });
    $.init();
});

function rest(method, data) {
    var code = arguments[3];
    var redata;
    var paras = {};
    paras.method = method;
    paras.data = JSON.stringify(data);
    paras.version = "1.0.0";
    paras.rnd = Math.random();
    $.ajax({
        type: "post",
        async: false,
        url: "/rest.do",
        // contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: paras,
        dataType: "json",
        cache: false,
        beforeSend: function (xmlHttp) {
            xmlHttp.setRequestHeader("If-Modified-Since", "0");
            xmlHttp.setRequestHeader("Cache-Control", "no-cache");
        },
        success: function (data) {
            if (data.RESULT_CODE == 0) {
                if (data.RESULT_DATA.code == 403000) {
                    // j.cookie("token", null, {expires: 0, path: "/"});
                    // localStorage.removeItem("token");
                    $.fn.cookie("shopId", "d46170e19ef34011a8673a4f1ee96ba1",{'expire':0});
                    // if (!code) {
                    //     location.href = "login.vhtml";
                    // }
                } else {
                    redata = data;
                    // alert(data)
                }

            }
        },
        error: function () {
            msg("系统请求错误!");
        }
    });
    return redata;
}
function goto(url) {
    location.href = url;
}

