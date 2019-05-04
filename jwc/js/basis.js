function obj(a1,a2)  //a2为类时必须带前缀 .
{
	switch(arguments.length){
		case 1://基础选择器 标签、id、类
			switch(a1.charAt(0)){
				case '#':
					return document.getElementById(a1.substring(1));
				break;
				//只能一个类
				case '.':
					return getByClass(document,a1.substring(1));
				break;
				//只能一个标签
				//可以采取 NodeType来判别
				default:
					var oc=[];
					var otags = document.getElementsByTagName('body')[0].getElementsByTagName(a1);
					for(var i=0;i<otags.length;i++){
						oc.push(otags[i]);
					};
					return oc;
					break;
			};
		break;
		case 2:
			//a1为对象时
			switch(typeof a2)
			{
				case 'string':
					switch(a2.charAt(0))
					{
						case '.':return getByClass(a1,a2.substring(1));break;
						default:
							var oc = [];
							var otags = a1.getElementsByTagName(a2);
							for(var i=0;i<otags.length;i++)
							{
								oc.push(otags[i]);
							};
							return oc;
						break;
					}
				break;
				default:break;
			}
		break;
		default:break;
	};
}
function getByClass(oParent,sClass)//解决了一个标签有多个类的问题c sClass为一个类 
{	
	var tags = oParent.getElementsByTagName('*');
	var aResult=[];
	//匹配 类中是否有 :
	if(sClass.search(':')==-1)//没有过滤操作 ：
	{
		for(var i=0;i<tags.length;i++){
			var classArr = str2arr(tags[i].className);
			for(var j=0;j<classArr.length;j++){
				if(classArr[j]==sClass){
					aResult.push(tags[i]);
					break;
				};
			};
		};
		return aResult;
	}
	else //有过滤操作 ：
	{
		var oterm = sClass.split(':')[1];
		sClass=sClass.split(':')[0];
		switch(oterm)//：even/first/last/odd/eq/arr
		{
			case 'even'://此路径已测试：成功
				for(var i=0;i<tags.length;i+=2)
				{
					var classArr = str2arr(tags[i].className);
					for(var j=0;j<classArr.length;j++)
					{
						if(classArr[j]==sClass)
						{
							aResult.push(tags[i]);
							break;
						}
					};
				};
				return aResult;
			break;
			case 'odd'://此路径已测试：成功
				for(var i=1;i<tags.length;i+=2)
				{
					var classArr = str2arr(tags[i].className);
					for(var j=0;j<classArr.length;j++)
					{
						if(classArr[j]==sClass)
						{
							aResult.push(tags[i]);
							break;
						}
					};
				};
			break;
			case 'first'://此路径已测试：成功
				if(tags.length>0)
				{
					var classArr = str2arr(tags[0].className);
					for(var j=0;j<classArr.length;j++)
					{
						if(classArr[j]==sClass)
						{
							aResult.push(tags[0]);
							break;
						}
					}
				}
			break;
			case 'last'://此路径已测试：成功
				if(tags.length>0)
				{
					var classArr = str2arr(tags[tags.length-1].className);
					for(var j=0;j<classArr.length;j++)
					{
						if(classArr[j]==sClass)
						{
							aResult.push(tags[tags.length-1]);
							break;
						}
					}
				}
			break;
			default:
				var n = oterm.match(/\d+/g);
				switch(oterm.charAt(0))
				{
					case 'e'://此路径已测试：成功
						if(tags.length>n)//1 -> 0
						{
							var classArr = str2arr(tags[n].className);
							for(var j=0;j<classArr.length;j++)
							{
								if(classArr[j]==sClass)
								{
									aResult.push(tags[n]);
									break;
								}
							}
						}
					break;//eq(n) 等于n
					case 'l'://此路径已测试：成功
						for(var i=0;i<n;i++)
						{
							var classArr = str2arr(tags[i].className);
							for(var j=0;j<classArr.length;j++)
							{
								if(classArr[j]==sClass)
								{
									aResult.push(tags[i]);
									break;
								}
							};
						};
					break;//lt(n) 小于n n比tags.length大时 出错
					case 'g'://此路径已测试：成功
						for(var i=n;i<tags.length;i++)
						{
							var classArr = str2arr(tags[i].className);
							for(var j=0;j<classArr.length;j++)
							{
								if(classArr[j]==sClass)
								{
									aResult.push(tags[i]);
									break;
								}
							};
						};
					break;//gt(n) 大于n n 小于0时 出错
					case 'a'://此路径已测试：成功
						n=n.sort();
						for(var i=0;i<n.length;i++)
						{
							if(i<tags.length)
							{
								var classArr = str2arr(tags[n[i]-0].className);
								for(var j=0;j<classArr.length;j++)
								{
									if(classArr[j]==sClass)
									{
										aResult.push(tags[n[i]-0]);
										break;
									}
								}
							}
						}
					break;//array(-,-,-,...) 数组
					default:break;
				}
			break;
		}
		return aResult;
	}
}
function hasClass(obj,sclass)//这里的sclass参数中不能有空格
{
	var all=str2arr(obj.className);
	for(var i=0;i<all.length;i++)
	{
		if(all[i]==sclass)
			return true;
	};
	return false;
}
function addClass(obj,sclass)//可同时添加多个class 中间用空格分开
{
	var all = str2arr(obj.className);
	var adding = str2arr(sclass);
	all=all.concat(adding);
	obj.className = all.join(' ');
}
function removeClass(obj,sclass)//可同时移除多个class
{
	var all = str2arr(obj.className);
	var deleting = str2arr(sclass);
	for(var i=0;i<all.length;i++)
	{
		for(var j=0;j<deleting.length;j++)
		{
			if(all[i]==deleting[j])
				all[i]='';
		};
	};
	obj.className=all.join(' ');
}
function str2arr(str)//以空格为界限，将字符串转为数组
{
	var strArr="";
	var z=true;
	var arr=[];
	for(var i=0;i<str.length;i++)
	{
		if(str.charAt(i)==' ')
		{
		//刚从 有字符到空格
			if(z==false)
			{
				strArr+='=';
				z=true;
			}
			else
				continue;
		}
		else
		{
			z=false;
			strArr+=str.charAt(i);
		}		
	};
	arr = strArr.split('=');
	return arr;
}
function css(obj,attr,oval)//  获取样式/设置多个样式
{	
/*
JS中style属性
现在我需要对这个标签赋值，其内容为： 
1、需要显示的字为“HELLO WORLD”； 
2、span的 background-color : red ，另外还要：border:1px solid #333333;cursor:hand; 
我需要在<script></script>内把他们赋值，请问怎么写呢？难道要： 
document.getElementById("a").style.background="red"; 来一项一项的写？ 
能不能一下子把style写完啊，怎么写啊？ 
解决办法：
1、先定义一个CSS规则，然后this.className=''
2、document.getElementById("a").style.cssText="border-collapse:collapse;border-spacing:1;border:1 solid #0B2565;background-color:white;color:black;"

 

JS操作css的float属性的特殊写法
使用js操作css属性的写法是有一定的规律的：

1、对于没有中划线的css属性一般直接使用style.属性名即可。
如：obj.style.margin，obj.style.width，obj.style.left，obj.style.position等。

2、对于含有中划线的css属性，将每个中划线去掉并将每个中划线后的第一个字符换成大写即可。
如：obj.style.marginTop，obj.style.borderLeftWidth，obj.style.zIndex，obj.style.fontFamily等。

这个规律我想大多数的前端开发者也都熟知。但在css中有一个特殊的属性其js使用方法比较特殊。
这个特殊的属性就是:float。我们不能直接使用obj.style.float来使用，这样操作是无效的。

其正确的使用方法是为：IE:obj.style.styleFloat，其他浏览器:obj.style.cssFloat。
*/
	if(arguments.length==2){
		if(typeof attr=='string')
		{
			if(obj.currentStyle)
				return obj.currentStyle[attr];
			else
				return getComputedStyle(obj,false)[attr];
		}
		else
		{
			for(var i='' in attr)
			{
				if(i=='opacity')
				{
					obj.style[i]=attr[i];
					obj.style['filter']=(attr[i]*100).toFixed(0);
				}
				else
					obj.style[i]=attr[i];
				
			}
		}
	}
	//  设置单个样式
	else
	{
		if(attr=='opacity')
		{
			obj.style['filter']='alpha(opacity='+oval*100+')';
		}
		obj.style[attr]=oval;
	}
}
function attr(obj,attr,oval)
{
	// 获取单个属性/设置多个属性
	// name 等 关键字、保留字不能作为属性 不然会出问题
	if(arguments.length==2)
	{
		if(typeof attr=='string')
			return obj.attributes[attr].value;
		else
		{
			for(var i='' in attr)
				obj.attributes[i].value=attr[i];
		}
	}
	//设置单个属性
	else
		obj.attributes[attr].value=oval;
}
function removeAttr(obj,arg)
{
	switch(typeof arg)
	{
		case 'string':
			if(obj.removeAtrribute)//为什么不行？
				obj.removeAtrribute(arg);
			else
				console.log('error');
		break;
		default:
			for(var k='' in arg)
			{
				obj.removeAttribute(arg[k]);
			}
		break;
	}
}
function sports(obj,json,fn)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(
		function(){
			var bStop=true;//这一次运动就结束了——所有的值都到达了
			for(var attr='' in json){
				//1.取当前的值
				var iCur=0;
				if(attr=='opacity')
					iCur = parseInt(parseFloat(getStyle(obj, attr))*100);
				else
					iCur=parseInt(getStyle(obj, attr));
			//2.算速度
			var iSpeed=(json[attr]-iCur)/8;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			//3.停止检测
			if(iCur!=json[attr])
				bStop=false;
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}
			else
				obj.style[attr]=iCur+iSpeed+'px';
		};
			if(bStop)
			{
				clearInterval(obj.timer);
				if(fn)
					fn();
			}
		},30);
}
var EventInit = {
        addEvent : function(obj, type, fn) {  
            var handler = fn;
            if (obj.addEventListener) { //ff 
                obj.addEventListener(type, handler, false);  
            } 
			else if (obj.attachEvent) {  //ie
				handler=function(e){
					fn.call(obj);
				};
                obj.attachEvent('on' + type, handler);  
            }  
        },
		delEvent : function(obj,type,fn)
		{
			if(obj.removeEventListener)
			{
				obj.removeEventListener(type,fn,false);
			}
			else
			{
				if(obj.detachEvent)
				{
					obj.detachEvent('on'+type,fn);
				}
			}
		}
};

document.onkeydown = function(evt)
{
	evt = (evt) ? evt : window.event;
	//屏蔽ctrl+U 禁止查看源代码
	if(evt.ctrlKey && evt.keyCode==85)
	{
		if(evt.preventDeault)
			evt.preventDeault();
		else
			evt.returnValue=false;
		return false;
	}
	//阻止F12
	if(evt.keyCode==123)
	{
		if(evt.preventDeault)
			evt.preventDeault();
		else
			evt.returnValue=false;
		return false;
	}
	
}

//阻止右键菜单
document.oncontextmenu = function(e)
{
	return false;
}