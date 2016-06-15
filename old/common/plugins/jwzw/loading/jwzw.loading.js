(function ($) {
    $.addLoading = function (t, p) {
        if (t.loadbox) {
            return false; //对象已存在
        }

        p = $.extend({
            //默认属性
            width: 400,
            height: 100,
            html: "loading...",
            title: false,
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
                } else {
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
                    if ($(this).data("loadbox") == "loadbox") {
                        $(this).show();
                        $(this).removeData("loadbox");
                    }
                });

                if (g.htmlStyle == null) {
                    $("html", p.window.document).attr("style", "overflow:auto");
                } else {
                    $("html", p.window.document).attr("style", g.htmlStyle);
                }

                $(g.oDiv).remove();
                $(g.gDiv).remove();
                $(t).remove();
                t.p = null;
                t.loadbox = null;
                t = null;
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
            g.oDiv = p.window.document.createElement("div"); //loverlayer div
            g.gDiv = p.window.document.createElement("div"); //loadbox div
            g.hDiv = p.window.document.createElement("div"); //wheader div
            g.tDiv = p.window.document.createElement("div"); //wtitle div
            g.bDiv = p.window.document.createElement("div"); //wbody div
            g.loadingDiv = p.window.document.createElement("div"); //wbody div           

            //样式
            $(g.oDiv).addClass("loadoverlayer");
            $(g.gDiv).addClass("loadbox");
            $(g.hDiv).addClass("wheader");
            $(g.tDiv).addClass("wtitle");
            $(g.bDiv).addClass("wbody");
            $(g.loadingDiv).addClass("wloading");

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
            $(g.hDiv).hide();

            //去除浮动
            $(g.hDiv).append("<div class=\"loadclear\"></div>");

            //构造bDiv
            $(g.bDiv).append(g.loadingDiv);

            //设置显示字符串
            $(g.loadingDiv).append(p.html);

            //去除滚动条
            g.htmlStyle = $("html", p.window.document).attr("style");
            $("html", p.window.document).attr("style", "overflow:hidden");

            //去除select
            $("select", p.window.document).each(function () {
                if ($(this).get(0).style.display != "none") {
                    $(this).hide();
                    $(this).data("loadbox", "loadbox");
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
        t.loadbox = g;

        return t;
    };
    $.fn.loading = function (p) {
        return this.each(function () {
            $(this).hide();
            var t = this;
            $(document).ready(function () {
                $.addLoading(t, p);
            });
        });
    };

})(jQuery);


 //loading窗口
function loading() {    
    var html = "loading...";
    if (arguments.length == 1){
        html = arguments[0];
    }
    try {
         var popDiv1 = document.createElement("div"); //tempDiv	   
         j("body").append(popDiv1);
         j(popDiv1).hide();
         j(popDiv1).loading({ html:html });

     } catch (ex) {
        alert("开始loading错误!");
     }
 }

 //卸载loading
 function unloading() {
     try {
         j("div.wclose", parent.document).trigger("click");
     } catch (ex) { }
     try {
         j("div.wclose").trigger("click");
     } catch (ex) { }    
 }