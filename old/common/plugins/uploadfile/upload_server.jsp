<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.core.app.config.*"%>
<%@ page import="com.core.utils.*"%>
<%@ page import="java.util.*,java.io.*"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="org.apache.commons.fileupload.*"%>
<%@ page import="org.apache.commons.fileupload.disk.*"%>
<%@ page import="org.apache.commons.fileupload.servlet.*"%>
<%@ page import="javax.imageio.ImageIO,java.awt.image.BufferedImage"%>
<%
	String dir;
	String user_id;
	int width;
	int height;
	String zoom;

	int w = 0;
	int h = 0;

	dir = StringUtils.trim(request.getParameter("dir"));
	user_id = StringUtils.trim(request.getParameter("user_id"));
	width = MathUtils.valueOf(request.getParameter("width"), 0);
	height = MathUtils.valueOf(request.getParameter("height"), 0);
	zoom = StringUtils.trim(request.getParameter("zoom"));
	if (dir.length() == 0) {
		dir = "image";
	}
	if (zoom.length() == 0) {
		zoom = "wh";
	}
	if (user_id.length() == 0) {
		user_id = "sys";
	}

	//文件保存磁盘路径
	String diskPath = Config.get("fileServerDiskPath");
	if (diskPath == null) {
		diskPath = Config.diskPath;
	}
	//文件访问路径
	String urlPath = "";

	//定义允许上传的文件扩展名
	HashMap<String, String> extMap = new HashMap<String, String>();
	extMap.put("image", "gif,jpg,jpeg,png,bmp");
	extMap.put("flash", "swf,flv");
	extMap.put("media", "swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb");
	extMap.put("file", "doc,docx,xls,xlsx,ppt,htm,html,txt,zip,rar,gz,bz2");

	//最大文件大小 1MB
	long maxSize = 1048576;

	response.setContentType("text/html; charset=UTF-8");

	if (!ServletFileUpload.isMultipartContent(request)) {
		out.println(getError("请选择文件。"));
		return;
	}

	//创建文件夹
	diskPath += "/upload/" + user_id + "/" + dir;
	urlPath += "/upload/" + user_id + "/" + dir;
	File uploadDir = new File(diskPath);
	if (!uploadDir.isDirectory()) {
		FileUtils.createFolder(diskPath);
	}

	SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
	String ymd = sdf.format(new Date());
	diskPath += "/" + ymd;
	urlPath += "/" + ymd;
	uploadDir = new File(diskPath);
	if (!uploadDir.isDirectory()) {
		FileUtils.createFolder(diskPath);
	}
	//检查目录写权限
	if (!uploadDir.canWrite()) {
		out.println(getError("上传目录没有写权限。"));
		return;
	}

	FileItemFactory factory = new DiskFileItemFactory();
	ServletFileUpload upload = new ServletFileUpload(factory);
	upload.setHeaderEncoding("UTF-8");
	List items = upload.parseRequest(request);
	Iterator itr = items.iterator();
	while (itr.hasNext()) {
		FileItem item = (FileItem) itr.next();
		String fileName = item.getName();
		long fileSize = item.getSize();
		if (!item.isFormField()) {
			//检查文件大小
			if (item.getSize() > maxSize) {
				out.println(getError("上传文件不能大于" + MathUtils.format(maxSize / 1024 / 1024.0, "0.0") + "MB!"));
				return;
			}

			//检查扩展名
			String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
			if (!Arrays.<String> asList(extMap.get(dir).split(",")).contains(fileExt)) {
				out.println(getError("上传文件扩展名是不允许的扩展名。\n只允许" + extMap.get(dir) + "格式。"));
				return;
			}

			String newFileName = StringUtils.getId() + "." + fileExt;
			try {
				File uploadedFile = new File(diskPath, newFileName);
				item.write(uploadedFile);
			} catch (Exception e) {
				out.println(getError("上传文件失败。"));
				return;
			}

			//计算图片缩放比例
			double ratio = 1;
			int imgWidth = 0;
			int imgHeight = 0;
			if ("image".equals(dir)) {
				File imgfile = new File(diskPath + "/" + newFileName);
				try {
					FileInputStream fis = new FileInputStream(imgfile);
					BufferedImage buff = ImageIO.read(imgfile);
					imgWidth = buff.getWidth();
					imgHeight = buff.getHeight();
					buff = null;
					fis.close();
					fis = null;
				} catch (FileNotFoundException ex) {
				} catch (IOException ex) {
				}
			}
			if (imgWidth > 0 && imgHeight > 0) {
				if ("wh".equals(zoom) || "".equals(zoom)) {
					if (width > 0 && height > 0) {
						if (imgWidth <= width) {
							if (imgHeight <= height) {
								ratio = 1;
							} else {
								//按高度缩放
								ratio = (height*0.1) / (imgHeight*0.1);
							}
						} else {
							if (imgHeight <= height) {
								//按宽度缩放
								ratio = (width*0.1) / (imgWidth*0.1);
							} else {
								//按宽高最高比缩放
								double ratioW = (width*0.1) / (imgWidth*0.1);
								double ratioH = (height*0.1) / (imgHeight*0.1);
								if (ratioW > ratioH) {
									ratio = ratioH;
								} else {
									ratio = ratioW;
								}
							}
						}
					}
					w = (int) (imgWidth * ratio);
					h = (int) (imgHeight * ratio);
				} else if ("w".equals(zoom)) {
					if (width > 0) {
						if (imgWidth <= width) {
							ratio = 1;
						} else {
							//按宽度缩放
							ratio = (width*0.1) / (imgWidth*0.1);
						}
					}
					w = (int) (imgWidth * ratio);
					h = (int) (imgHeight * ratio);
				} else if ("h".equals(zoom)) {
					if (height > 0) {
						if (imgHeight <= height) {
							ratio = 1;
						} else {
							//按高度缩放
							ratio = (height*0.1) / (imgHeight*0.1);
						}
					}
					w = (int) (imgWidth * ratio);
					h = (int) (imgHeight * ratio);
				} else if ("init".equals(zoom)) {
					w = imgWidth;
					h = imgHeight;
				} else if ("fix".equals(zoom)) {
					//指定高度宽度
					w = width;
					h = height;
				} else {
					w = imgWidth;
					h = imgHeight;
				}
			}
			
			Map obj = new HashMap();
			obj.put("error", 0);
			obj.put("fileName", newFileName);
			obj.put("diskPath", diskPath + "/" + newFileName);
			obj.put("urlPath", urlPath + "/" + newFileName);
			obj.put("w", w);
			obj.put("h", h);
			out.println(JsonUtils.serialize(obj));
		}
	}
%>
<%!
	private String getError(String message) {
		Map obj = new HashMap();
		obj.put("error", 1);
		obj.put("message", message);
		return JsonUtils.serialize(obj);
	}
%>