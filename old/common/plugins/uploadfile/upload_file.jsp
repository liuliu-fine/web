<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.core.app.config.*"%>
<%@ page import="com.core.utils.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<title>上传文件</title>
<script src="<%=Config.appPath%>/common/js/jquery-1.4.2.js"	type="text/javascript"></script>
<link href="<%=Config.appPath%>/common/plugins/jwzw/wbox/jwzw.wbox.css" rel="stylesheet" type="text/css" />
<script src="<%=Config.appPath%>/common/plugins/jwzw/wbox/jwzw.wbox.js" type="text/javascript"></script>
<script type="text/javascript" language="javascript">
	<%
		String dir = StringUtils.trim(request.getParameter("dir"));
		String callback = StringUtils.trim(request.getParameter("callback"));
		String user_id = StringUtils.trim(request.getParameter("user_id"));
		String width = StringUtils.trim(request.getParameter("width"));
		String height = StringUtils.trim(request.getParameter("height"));
		String zoom = StringUtils.trim(request.getParameter("zoom"));
	%>

		function uploadCallback(iframe){
			var doc = iframe.contentDocument || iframe.contentWindow.document;
			eval("var data = " + doc.body.innerHTML);

			var error = unescape(data.error);//0：上传成功，1:上传失败
			var message = unescape(data.message);//返回消息
			var fileName = unescape(data.fileName);//服务器端保存的文件名
			var diskPath = unescape(data.diskPath);//磁盘路径
			var urlPath = unescape(data.urlPath);//网页路径
			var w = unescape(data.w);//按缩放比例后的高
            var h = unescape(data.h);//按缩放比例后的宽

			if (error == "1"){
				alert(message);
			} else if (error == "0"){
				try {
					parent.<%=callback%>(fileName,diskPath,urlPath,w,h);
				}catch(ex){
					alert("回调函数不存在!");
				}
				j("div.wclose",parent.document).trigger("click");
			}
    	}
    	
		function upload(){
			var form = document.uploadForm;
			form.action = "upload_server.jsp?dir=<%=dir%>&user_id=<%=user_id%>&width=<%=width%>&height=<%=height%>&zoom=<%=zoom%>";

			//上传完成回调
			var iframe = document.getElementById("uploadIframe");
			j(iframe).unbind("load");
			j(iframe).bind("load",function(){uploadCallback(iframe)});
			
			form.submit();
		}
	</script>
</head>
<body
	style="padding: 10px; font-weight: bold; font-size: 12px; line-height: 18px;">
<iframe name="uploadIframe" id="uploadIframe" style="display: none;"></iframe>
<form id="uploadForm" name="uploadForm" method="post"
	enctype="multipart/form-data" target="uploadIframe">选择文件：<input
	type="file" name="file"> <input type="button" value="上传"
	onclick="javascript:upload();"></form>
</body>
</html>
