//一级导航菜单
var onav = obj('#nav');
//二级导航菜单
var ounav = obj('#unav');

//搜索框根据二级导航栏自动显示或隐藏
var osearch=obj('#search');
var offLeft = osearch.offsetLeft;
//一级菜单数组
var olis = obj(onav,'li');
//对应一级菜单的二级菜单（一对一关系）
var ouls = obj(ounav,'ul');
var currK = 0;
//为nav中的栏目添加事件
for(var i=0;i<olis.length;i++)
{
	olis[i].index = i;
	ouls[i].style.width=ouls[i].offsetWidth+'px';
	olis[i].onmouseover = function()
	{
		var centerX = this.offsetLeft+this.offsetWidth/2;
		var posX = 0;
		posX = Math.floor(centerX - ouls[this.index].offsetWidth/2);
		
		//之前的恢复成正常状态
		olis[currK].className='';
		ouls[currK].style.left='-2000px';
		//当前的进入特殊状态
		this.className='nav_red';
		
		currK = this.index;
		
		//范围控制：居中、靠左或靠右
		if(posX >= 30)
		{
			//中轴线对齐
			if(posX + ouls[this.index].offsetWidth <= onav.offsetWidth)
				ouls[this.index].style.left = posX + 'px';
			//停留在最右边
			else
				ouls[this.index].style.left = onav.offsetWidth-ouls[this.index].offsetWidth+'px';
		}
		//停留在最左边
		else
			ouls[this.index].style.left = 30+'px';
		if(this.index!=0)
		{
			if(ouls[this.index].offsetLeft>=ouls[0].offsetWidth+35)
				ouls[0].style.left='30px';
			else
				ouls[0].style.left='-2000px';
		}
		//控制搜索框是否显示
		var beshow = (ouls[this.index].offsetLeft+ouls[this.index].offsetWidth - offLeft>0)?false:true;
		
		if(beshow)
			osearch.style.display = 'block';
		else
			osearch.style.display = 'none';
	}
}
