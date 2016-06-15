// 输入检测

//字符串是否为空
function isEmpty(strInput) {
    if (null == strInput) {
        return true;
    }

    if (strInput.replace(/(^[ |　|\s]*)|([ |　|\s]*$)/g, "").length == 0) {
        return true;
    }
    return false;
}

//是否是有效用户帐号，帐号以字母开头，由数字、字母、下划线组成，帐号位数为2-20
function isValidAccount(strInput) {
    var myReg = /^[a-zA-Z][0-9a-zA-Z_]{1,19}$/;
    if (myReg.test(strInput)) {
        return true;
    }
    return false;
}

//是否是有效的数值，并且最多只带两位小数，如：0、10 或 10.23
function isValidMoney(strInput) {
    var myReg = /^(([1-9]\d*(\.\d{1,2})?)|(0\.\d{1,2}))$/;
    if (myReg.test(strInput)) {
        if (parseFloat(strInput) >= 0) {
            return true;
        }
    }
    return false;
}

//是否是有效的数值，并且最大值能是1，如：1 或 0.8 或 0.88
function isValidAgio(strInput) {
    var myReg = /^((1(\.0{1,2})?)|(0\.[1-9]\d?)|(0\.\d[1-9]))$/;
    if (myReg.test(strInput)) {
        return true;
    }
    return false;
}

//是否是有效的整数，如：-1 或 0 或 1 或 2
function isValidInt(strInput) {
    var myReg = /^((-[1-9]\d*)|0|[1-9]\d*)$/;
    if (myReg.test(strInput)) {
        return true;
    }
    return false;
}

//是否是有效日期格式，如：2006-1-1 或2006-01-01
function isValidDate(strInput) {
    var myReg = /^\d{4}-((0?[1-9])|(1[0-2]))-\d{1,2}$/;
    if (myReg.test(strInput)) {
        var ymd = strInput.split("-");
        var year = parseInt(ymd[0], 10); //加参数10以十进制处理，不然会以八进制处理
        var month = parseInt(ymd[1], 10); //加参数10以十进制处理，不然会以八进制处理
        var day = parseInt(ymd[2], 10); //加参数10以十进制处理，不然会以八进制处理
        if (month > 12 || month < 1) return false;
        if (day > 31 || day < 1) return false;

        var maxDay = new Array(12); //每月的最大天数
        if (month == 1) maxDay[0] = 31;
        if (month == 2) maxDay[1] = 28;
        if (month == 3) maxDay[2] = 31;
        if (month == 4) maxDay[3] = 30;
        if (month == 5) maxDay[4] = 31;
        if (month == 6) maxDay[5] = 30;
        if (month == 7) maxDay[6] = 31;
        if (month == 8) maxDay[7] = 31;
        if (month == 9) maxDay[8] = 30;
        if (month == 10) maxDay[9] = 31;
        if (month == 11) maxDay[10] = 30;
        if (month == 12) maxDay[11] = 31;
        //闰月
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) maxDay[1] = 29;
        if (maxDay[month - 1] < day) return false;

        return true;
    }
    return false;
}

//是否是有效日期时间格式，如：2006-1-1 0:0 或2006-01-01 00:00
function isValidDateTime(strInput) {
    var myReg = /^\d{4}-((0?[1-9])|(1[0-2]))-\d{1,2}\s((0?[0-9])|(1[0-9])|(2[0-3])):([0-5]?[0-9])$/;
    if (myReg.test(strInput)) {
        var ymd = strInput.substr(0, strInput.indexOf(" ")).split("-");
        var year = parseInt(ymd[0], 10); //加参数10以十进制处理，不然会以八进制处理
        var month = parseInt(ymd[1], 10); //加参数10以十进制处理，不然会以八进制处理
        var day = parseInt(ymd[2], 10); //加参数10以十进制处理，不然会以八进制处理
        if (month > 12 || month < 1) return false;
        if (day > 31 || day < 1) return false;

        var maxDay = new Array(12); //每月的最大天数
        if (month == 1) maxDay[0] = 31;
        if (month == 2) maxDay[1] = 28;
        if (month == 3) maxDay[2] = 31;
        if (month == 4) maxDay[3] = 30;
        if (month == 5) maxDay[4] = 31;
        if (month == 6) maxDay[5] = 30;
        if (month == 7) maxDay[6] = 31;
        if (month == 8) maxDay[7] = 31;
        if (month == 9) maxDay[8] = 30;
        if (month == 10) maxDay[9] = 31;
        if (month == 11) maxDay[10] = 30;
        if (month == 12) maxDay[11] = 31;
        //闰月
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) maxDay[1] = 29;
        if (maxDay[month - 1] < day) return false;

        return true;
    }
    return false;
}

//是否是有效的E-mail字符串
function isValidEmail(strInput) {
    var myReg = /@.*\.[a-z]{2,6}/;
    if (myReg.test(strInput)) {
        return true;
    }
    return false;
}

//是否是有效的邮政编码 邮编为6位数字
function isValidZip(strInput) {
    var myReg = /^\d{6}$/;
    if (myReg.test(strInput)) {
        return true;
    }
    return false;
}

//是否是有效的QQ
function isValidQQ(strInput) {
    var myReg = /^[1-9]\d{3,15}$/;
    if (myReg.test(strInput)) {
        return true;
    }
    return false;
}

//是否是有效的手机号
function isValidMobile(strInput) {
    var myReg = /^\d{11}$/;
    if (myReg.test(strInput)) {
        return true;
    }
    return false;
}

//是否是有效的图片格式
function isValidImage(strInput) {
    var myReg = /\.(jpg|gif|bmp|png)$/i;
    if (myReg.test(strInput)) {
        return true;
    }
    return false;
}

//是否是有效的密码:8-20位，无空格
function isValidPassword(strInput){
    if (strInput.indexOf(" ") != -1 || strInput.indexOf("　") != -1){
        return false;
    }

    if (strInput.length <8 || strInput.length >20){
        return false;
    }

    return true;
}