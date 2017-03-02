function indexTab(idStr)
{
	var op = obj(idStr);
	//获取选项卡
	var shows = obj(op,'.f_span');
	//获取选项卡对应的内容
	var contents = obj(op,'.f_div');
	//为选项卡的每一个选项添加事件
	for(var i=0;i<shows.length;i++)
	{
		shows[i].index=i;
		shows[i].onmouseover=function(){
			if(true!=hasClass(this,'f_hover'))
			{
				for(var j=0;j<shows.length;j++)
				{
					//清所有选项卡class="f_hover"
					removeClass(shows[j],'f_hover');
					//设置所有 选项卡对应内容 ：display:none 
					css(contents[j],'display','none');
				}
				//显示当前选项卡的内容
				contents[this.index].removeAttribute('style');
				//设置当前选项卡 有 小三角形的背景
				addClass(this,'f_hover');
			}
		}		
	}
}
indexTab('#jwtz');
indexTab('#jxdt');
