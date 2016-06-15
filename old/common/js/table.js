//修改tr中有多个td时有时因为内容长度不一致导致排版杂乱
function setTableTdAdaptive(){
	//查找样式为tb的table（查询条件表格或详情展示表格），且定位到第一个tr
    j("table.tb > tbody > tr:first-child").each(function(){
    	//如果第一个tr中没有或只有一个th：有th表格头或完全只是数据展示时
    	if (j(this).find("th").length <= 1){
        	//查找最多样式为label且后一个td的样式为无的td所在的tr
    		//最大的label样式数以及下标
    		var maxLabelCount = 0;
    		var index = 0;
    		var trs = j(this).parent().find("tr");
    		trs.each(function(i){		
    			var len = j(this).find("td.label").next(":not('.label')").length;
    			if (maxLabelCount < len){
    				maxLabelCount = len;
    				index = i;
    			}
    		});	
    		//当样式label的td的最大数>=2时，调整对应的td的宽度
    		if (maxLabelCount >= 2){
    			var tr = j(trs.get(index));
    			//获取所有样式为空的td
    			var tdCount = tr.find("td:not('.label')").length;
    			var trWidth = tr.width();
    			var labelWidth = tr.find("td.label:first-child").width();
    			var tdAvgWidth = Math.round((trWidth - (labelWidth*maxLabelCount)) / tdCount);
    			tr.find("td:not('.label')").width(tdAvgWidth);
    		}
    	}
    });
}