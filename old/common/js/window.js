//弹出窗口
function pop(url, winWidth, winHeight) {
    var x = (screen.availWidth - winWidth) / 2;
    var y = (screen.availHeight - winHeight) / 2;
    var win = window.open(url, "_blank", "height=" + winHeight + ", width=" + winWidth + ",left=" + x + ",top=" + y + ", toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, status=no");
    win.focus();
}

//创建一个新窗口，用于大量数据传输到弹出式窗口
function createNewWindow(winName,winWidth, winHeight) {
    var x = (screen.availWidth - winWidth) / 2;
    var y = (screen.availHeight - winHeight) / 2;
    var win = window.open("", winName, "height=" + winHeight + ", width=" + winWidth + ",left=" + x + ",top=" + y + ", toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, status=no");
    win.focus();
}