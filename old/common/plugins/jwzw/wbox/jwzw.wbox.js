(function ($) {
    $.addWbox = function (t, p) {
        if (t.wbox) {
            return false; //对象已存在
        }

        p = $.extend({
            //默认属性
            width: 600,
            height: 480,
            title: false,
            url: "http://www.wzw.me", //url参数
            window: self
        }, p);

        //对外提供的对象方法
        var g = {
            //设置大小
            setSize: function (width, height) {
                if (!isPlusIntNum(width) || !isPlusIntNum(height)) {
                    alert("不支持此类宽度或高度设置!");
                    return;
                }

                p.width = width;
                p.height = height;

                if ($.browser.msie) {
                    $(g.oDiv).css({
                        width: Math.max(p.window.document.documentElement.scrollWidth, p.window.document.documentElement.clientWidth),
                        height: Math.max(p.window.document.documentElement.scrollHeight, p.window.document.documentElement.clientHeight)
                    });
                }

                if (p.window.document.documentElement.clientWidth - 20 < parseInt(width)) {
                    $(g.gDiv).width(p.window.document.documentElement.clientWidth - 20);
                } else {
                    $(g.gDiv).width(parseInt(width));
                }

                if (p.window.document.documentElement.clientHeight - 20 < parseInt(height)) {
                    $(g.bDiv).height(p.window.document.documentElement.clientHeight - $(g.hDiv).height() - 20);
                } else {
                    $(g.bDiv).height(parseInt(height) - $(g.hDiv).height());
                }

                var marginTop = 0;
                if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
                    marginTop = -($(g.gDiv).get(0).offsetHeight) / 2 + p.window.document.documentElement.scrollTop;
                }else{
                    marginTop = -($(g.gDiv).get(0).offsetHeight) / 2;
                }

                $(g.gDiv).css({
                    //IE6下要+p.window.document.documentElement.scrollTop
                    marginTop: marginTop,
                    marginLeft: -$(g.gDiv).get(0).offsetWidth / 2
                });

                $(g.loadingDiv).css({
                    marginTop: -$(g.loadingDiv).get(0).clientHeight / 2,
                    marginLeft: -$(g.loadingDiv).get(0).clientWidth / 2
                });
            },

            remove: function () {
                //显示select
                $("select", p.window.document).each(function () {
                    if ($(this).data("wbox") == "wbox") {
                        $(this).show();
                        $(this).removeData("wbox");
                    }
                });

                if (g.htmlStyle == null) {
                    $("html", p.window.document).attr("style", "overflow:auto");
                } else {
                    $("html", p.window.document).attr("style", g.htmlStyle);
                }

                //IE下如果弹了多个层会导致iframe中的文本输无法获得焦点,bug修正
                $("iframe", g.bDiv).remove();
                $(g.oDiv).remove();
                $(g.gDiv).remove();
                $(t).remove();
                t.p = null;
                t.wbox = null;
                t = null;
            },

            reloadParent: function () {
                location.reload();
            },

            resize: function () {
                g.setSize(p.width, p.height);
            }
        };

        //是否正整数数值
        function isPlusIntNum(num) {
            var reg = /^([1-9]\d*)$/;
            if (reg.test(num)) {
                return true;
            }
            return false;
        }

        //初始化控件
        function initControl() {

            //构造页面元素
            g.oDiv = p.window.document.createElement("div"); //woverlayer div
            g.gDiv = p.window.document.createElement("div"); //wbox div
            g.hDiv = p.window.document.createElement("div"); //wheader div
            g.tDiv = p.window.document.createElement("div"); //wtitle div
            g.bDiv = p.window.document.createElement("div"); //wbody div
            g.loadingDiv = p.window.document.createElement("div"); //wbody div
            g.reloadParentDiv = p.window.document.createElement("div"); //reload div

            //样式
            $(g.oDiv).addClass("woverlayer");
            $(g.gDiv).addClass("wbox");
            $(g.hDiv).addClass("wheader");
            $(g.tDiv).addClass("wtitle");
            $(g.bDiv).addClass("wbody");
            $(g.loadingDiv).addClass("wloading");
            $(g.reloadParentDiv).addClass("wreload");

            //添加到body
            $("body", p.window.document).append(g.oDiv);
            $("body", p.window.document).append(g.gDiv);

            //构造gDiv
            $(g.gDiv).append(g.hDiv);
            $(g.gDiv).append(g.bDiv);

            //构造hDiv
            //标题
            $(g.hDiv).append(g.tDiv);
            if (p.title) {
                $(g.tDiv).append(p.title);
            }
            //图标按钮
            $(g.hDiv).prepend("<div class=\"wclose\" title=\"关闭\"></div>");
            $(".wclose", g.hDiv).bind("click", function () {
                g.remove();
            });

            //去除浮动
            $(g.hDiv).append("<div class=\"wclear\"></div>");

            //构造bDiv
            $(g.bDiv).append(g.loadingDiv);
            $(g.bDiv).append(g.reloadParentDiv);
            $(g.reloadParentDiv).hide();
            $(g.reloadParentDiv).bind("click", function () {
                g.reloadParent();
            });
            if ($.browser.msie) {
                $(g.bDiv).append("<iframe scrolling=\"yes\" frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" width=\"100%\" height=\"100%\" src=\"" + p.url + "\"></iframe>");
            }
            else {
                $(g.bDiv).append("<iframe frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" width=\"100%\" height=\"100%\" src=\"" + p.url + "\"></iframe>");
            }
            $("iframe", g.bDiv).hide();
            $("iframe", g.bDiv).bind("load", function () {
                $(g.loadingDiv).remove();
                $(this).show();
                window.status = "完毕";
            });

            //去除滚动条
            g.htmlStyle = $("html", p.window.document).attr("style");
            $("html", p.window.document).attr("style", "overflow:hidden");

            //去除select
            $("select", p.window.document).each(function () {
                if ($(this).get(0).style.display != "none") {
                    $(this).hide();
                    $(this).data("wbox", "wbox");
                }
            });
        }

        initControl();
        g.setSize(p.width, p.height);

        $(p.window).resize(function () {
            g.resize();
        });

        //提供对外访问
        t.p = p;
        t.wbox = g;

        return t;
    };
    $.fn.wbox = function (p) {
        return this.each(function () {
            $(this).hide();
            var t = this;
            $(document).ready(function () {
                $.addWbox(t, p);
            });
        });
    };

    $.fn.reloadParent = function (p) {
        return this.each(function () {
            if (this.wbox) {
                this.wbox.reloadParent();
            }
        });
    };

})(jQuery);


 //弹出窗口
 function popbox(url, winWidth, winHeight) {
     try {
         var popDiv = document.createElement("div"); //tempDiv	   
         j("body").append(popDiv);
         j(popDiv).hide();
         j(popDiv).wbox({ url: url, width: winWidth, height: winHeight });

     } catch (ex) {
         var x = (screen.availWidth - winWidth) / 2;
         var y = (screen.availHeight - winHeight) / 2;
         var win = window.open(url, "_blank", "height=" + winHeight + ", width=" + winWidth + ",left=" + x + ",top=" + y + ", toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, status=no");
         win.focus();
     }
 }

 //关闭弹窗
 function closebox() {
     if (opener != null) {
         window.close();
     } else {
        try{
            j("div.wclose", parent.document).trigger("click");
         }catch(ex){}
        try {
            j("div.wclose").trigger("click");
        } catch (ex) {}        
     }
 }