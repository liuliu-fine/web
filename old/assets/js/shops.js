//获取地理位置
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError, { // 附带参数
            enableHighAccuracy: true// 提高精度(耗费资源)
        });
    }
    else {
        msg("设备不支持定位.");
    }
}
//取到信息
function showPosition(position) {
    var init = [position.coords.longitude, position.coords.latitude];
    regeocoder(init);
}
//获取失败
function showError(error) {
    var city_name = decodeURIComponent(para[1]);
    j("#city-name").html(city_name);
    if (para[0]) {
        getShops(para[0], para[0], "", "");
    } else {
        msg('你拒绝了定位.');
        window.location.href = "chooseCity.vhtml?fail2";
    }

}
//逆地理编码
function regeocoder(lnglatXY) {
    var geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: "all"
    });
    //http://api.map.baidu.com/geocoder?location=38.990998,103.645966&output=json&key=28bcdd84fae25699606ffad27f8da77b
    geocoder.getAddress(lnglatXY, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
            var address = result.regeocode.formattedAddress; //返回地址描述
            var json = {};
            json.city = result.regeocode.addressComponent.city || result.regeocode.addressComponent.province;
            json.citycode = result.regeocode.addressComponent.citycode;
            json.longitude = lnglatXY[1];
            json.latitude = lnglatXY[0];
            //城市code存储到cookie
            j.cookie("citycode", JSON.stringify(json), {expires: 30, path: "/"});
            j("#city-name").html(json.city);
            getShops(json.citycode, json.citycode, json.longitude, json.latitude);
        }
        else {
            msg("请重试！");
        }
    });
}

function getShop() {
    rest("shop.shops.get", {shopId: SHOPID}, function (data) {
        setHtml(data, 1);
    }, function () {
        msg("系统错误！");
    })
}

function getShops(city, location, latitude, longitude) {
    //当前城市
    var guestId = j.cookie("guestId");
    //ajax
    rest("shop.guest.get", {
        guestId: guestId,
        city: city || location,
        location: city || location,
        latitude: latitude,
        longitude: longitude
    }, function (data) {
        setHtml(data, 0);
    }, 1)
}
//替换html
function setHtml(data, current) {
    if (data.RESULT_DATA.code == 200) {
        var result = data.RESULT_DATA.result;
        var content = "";
        if (result.items == "") {
            j("#list").html("什么也没有");
            if (current) {
                j("#current").html("其它0家门店");
            }
        }
        else {
            if (current == 1) {
                j("#current").html("其它" + result.items.length + "家门店");
            }
            for (var c in result.items) {
                var list = j("#list").html();
                if (result.items[c].originalPicUrl) {
                    list = list.replace(j("#img").attr("src"), result.items[c].picUrl);
                }
                list = list.replace("@id@", result.items[c].id);
                list = list.replace("@brandName@", result.items[c].name);
                list = list.replace("@cai@", result.items[c].cuisineText);
                list = list.replace("@address@", result.items[c].businessZoneText);
                list = list.replace("@money@", "￥" + result.items[c].avgprice + "位");
                list = list.replace("@count@", result.items[c].boxNum);
                list = list.replace("@table@", result.items[c].tableNum);
                list = list.replace("#", "/" + result.items[c].id + "/index.vhtml");
                //距离运算
                var distance = result.items[c].distance;
                if (distance) {
                    if (distance < 100) {
                        distance = "<100m";
                    } else {
                        if (distance < 1000) {
                            distance += "m";
                        }
                        else {
                            if (distance < 10000) {
                                distance = (distance / 1000).toFixed(1) + "km";
                            } else {
                                distance = (distance / 1000).toFixed(0) + "km";
                            }
                        }
                    }
                }
                list = list.replace("@distance@", distance || "");
                //小图标
                if (result.items[c].activityType != null) {
                    var type = result.items[c].activityType;
                    var imgs = "";
                    var img = j("#icon").html();
                    for (var i in type) {
                        imgs += img.replace("VIP", "_" + type[i]);
                    }
                    list = list.replace(j("#icon").html(), imgs);
                }
                content += list;
            }
            j("#list").html(content);
            j("#list").show();
        }
        j('#loader').hide();
    }
    else {
        j("#loader").hide();
        if (data.RESULT_DATA.code == 404000) {
            j("#text").html("我们还没把店开到这哦~");
        } else {
            //400 没有code
            j("#text").html("所在城市没有开通上宾服务哦~");
        }
        j("#fail").show();
    }
}


j(function () {
    var query = window.location.search.substr(1);
    if ("other" == query)
        getShop();
    else {
        var para = query.split("&");
        if (2 == para.length) {
            var json = j.cookie("citycode")
                , city_name = decodeURIComponent(para[1]);
            j("#city-name").html(city_name),
                json && "" != json ? (json = eval("(" + json + ")"),
                    json.citycode == para[0] ? getLocation() : getShops(para[0], para[0], "", "")) : getShops(para[0], para[0], "", "")
        } else
            getLocation()
    }
    j("body").on("click", ".index", function () {
        j.cookie("shopId", j(this).attr("id"), {
            expires: 30,
            path: "/"
        });
        window.location.href = "index.vhtml";
    })
});