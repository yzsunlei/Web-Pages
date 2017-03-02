function time2str(otimeObj)
{
	var today = otimeObj;
	var weekdays = ['日','一','二','三','四','五','六'];
	var weeks = today.getDay();     // 星期 0 (星期日) 到 6 (星期六)
	var month = today.getMonth()+1;
	return today.getFullYear() + "年" + month + "月" + today.getDate() + "日&nbsp;&nbsp;" + "星期" + weekdays[weeks] +'&nbsp;&nbsp;';
}
//获取时间要在主页中显示的位置
var oshow = document.getElementById('time');

//数据输入部分
	//设置开学第一天
	var NewTermDate = new Date(2014,9-1,1);
	var endDate = new Date(2015,2-1,1)
	
//以下是自动计算部分
	//一天的秒数
	var oneDayMs = 3600000*24;
	//误差天数修复
	var nDay = 0;
	//开学第N周
	var Nweekth = 0;
	//开学第N周字符串
	var weekthStr = '';
	
	//获取今天的日期
	var today0 = new Date();
	//直接new Date 有误差
	var today = new Date(today0.getFullYear(),today0.getMonth(),today0.getDate());
	//误差天数计算
	switch(NewTermDate.getDay())
	{
		case 0:nDay=6;break;
		case 1:nDay=0;break;
		case 2:nDay=1;break;
		case 3:nDay=2;break;
		case 4:nDay=3;break;
		case 5:nDay=4;break;
		case 6:nDay=5;break;
		default:break;
	}
	Nweekth = Math.ceil(((today.getTime()-NewTermDate.getTime())/oneDayMs+1+nDay)/7);
	
	//控制 第几周 是否显示
	if(today.getTime()>= NewTermDate.getTime())
		Nweekth = '<font style="color:#c00">第'+Nweekth+"周</font>";
	//显示时间
	oshow.innerHTML = time2str(today)+Nweekth;
	
	
	
	
	
	
	
	
	
	