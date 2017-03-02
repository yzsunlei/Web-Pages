//XMLHttpRequest可以设置 发送数据的格式 
//xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
//url：文件位置
//data：参数	通过js ping一个a=xxx&b=xx....
//method：请求方式
//type :method 
//dataType:返回类型		
/*
 小结： 返回json格式：php输出字符串，ajax接收返回的responseText，
	然后eval。php json_encode 后输出的怎么还是string？
	目前最好的办法是：php输出 [{a:xxx,b:sss,...}]	格式的字符串 ，然后 ajax eval 取得到的数组第0个
	
*/
//contentType：内容编码
//datafilter：内容过滤
//cache：

//js第一行出错是因为：php返回的不是 json格式，造成eval函数出错
//ie6 error
function ajax(json,fnSucc,fnFaild)
{
	//默认值
	var info={'url':null,'data':'','method':'GET','dataType':'text','async':true};

	for(var attr='' in json)
	{
		info[attr]=json[attr];
		//console.log(info[attr]);
	};
	//数据获取完成

	if(info['url']==null)
	{
		console.log('url is null !');
		return false;
	}
	/* else
		console.log('avivaled?'); 没错*/
		
	var xmlhttp=null;
	/*
	if (window.XMLHttpRequest)// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	else	// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	*/
	try
	{
		xmlHttp=new XMLHttpRequest();
	}
	catch(e)
	{
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	//创建XHR对象完成

	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4)
		{
			if(xmlhttp.status==200)
			{
				switch(info['dataType'].toUpperCase())
				{	//最基础打得只有responseText 和responseXML 两种
					//text、XML、html、script、json
					case 'XML':fnSucc(xmlhttp.responseXML);break;
					case 'JSON':fnSucc(eval(xmlhttp.responseText));break;
					default:fnSucc(xmlhttp.responseText);break;
				};
			}
			else
			{
				if(fnFaild)
					fnFaild();
			}
		}
	}
	//回调函数完成

	if(info['method'].toUpperCase()=='GET')
	{
		xmlhttp.open("GET",info['url'],true);
		xmlhttp.send();
	}
	else
	{
		xmlhttp.open('POST',info['url'],true);
		//xmlhttp.setrequestheader("content-length",100);//post提交设置项
		xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");//post提交设置项
		xmlhttp.send('con=xxx&a=bb');//? '{a:sss,b:xxx...}' 发送这样的数据，然后php用 json_incode()
	}
	//数据发送完成

}
/*	这个貌似处理的更好 try catch 是应对报错的最好东西。因为有些错误会直接导致卡死 或者 有时候不能用if判断
	最终使用肯定要用是try catch而不是 测试时的 if 。
function ajax_init()
{
	var ajax=false;
	try 
	{
		ajax = new ActiveXObject("Msxml2.XMLHTTP");
	} 
	catch (e) 
	{
		try 
		{
			ajax = new ActiveXObject("Microsoft.XMLHTTP");
		} 
		catch (E) 
		{
			ajax = false;
		}
	}
	if (!ajax && typeof XMLHttpRequest!='undefined') 
	{
		ajax = new XMLHttpRequest();
	}
	return ajax;
} 
*/