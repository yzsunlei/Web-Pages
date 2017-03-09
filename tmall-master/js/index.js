window.onload=function(){
	//var obj = $('.foot-copyright');
	//alert(obj);
	//$('.float-nav').hide();
	//$('.side-stairs').hide();
	//$('.side-tools').hide();
/*	$('.top').hover(function(){
		alert('移入');
	},function(){
		alert('移出');
	});
*/
	//alert($('.top').css('background'));

	//alert($('.hidden').length());
	
	//顶部子菜单
	$('.fblock-show').hover(function(){
		$(this).find('.ublock-show').show();
	},function(){
		$(this).find('.ublock-show').hide();
	});

	//侧边栏
	$('.tools-li').hover(function(){
		$(this).find('span').show();
	},function(){
		$(this).find('span').hide();
	});

	//主导航
	$('.category-body').find('li').hover(function(){
		$(this).find('.second-category').show();

		$('.category-flash').hide();
		$('.category-flash').gt($(this).index()).style.display = 'block';

	},function(){
		$('.second-category').hide();
		$('.category-flash').hide();
		$('.special-flash').show();
	});

	//热门品牌选项卡切换
	$('.select-pages').find('a').click(function(){
		//alert($(this).index());
		$('.host-ul').hide();
		$('.host-ul').gt($(this).index()).style.display = 'block';
		return false;
	});

/*     
	//楼层轮播图 自动+手动
	var banner_index = 1;//轮播图片计数器
	//手动
	$('.first-stair').find('.stair-title-left').click(function(){
		$('.first-stair').find('.stair-nav-li').hide();
		banner_index--;
		if(banner_index < 1) banner_index = $('.first-stair').find('.stair-nav-li').length();
		$('.first-stair').find('.stair-nav-li').gt(banner_index-1).style.display = 'block';
		//alert('上一张');
	});
	$('.first-stair').find('.stair-title-right').click(function(){
		$('.first-stair').find('.stair-nav-li').hide();
		banner_index++;
		if(banner_index > 3) banner_index = 1;
		$('.first-stair').find('.stair-nav-li').gt(banner_index-1).style.display = 'block';
		//alert('下一张');
	});
    
	//自动
	setInterval(function(){
		var obj = $('.stair-nav-block-1');
		for(var j=0;j<obj.length();j++){
			obj.eq(j).find('.stair-nav-li').hide();
			banner_index++;
			if(banner_index > 3) banner_index = 1;
			$('.stair-nav-block-1').eq(j).find('.stair-nav-li').gt(banner_index-1).style.display = 'block';	
		}
	},3000);
    
 */    
    carousel($('.first-stair'));//楼层一
    carousel($('.second-stair'));//楼层二
    carousel($('.third-stair'));//楼层三
    carousel($('.fourth-stair'));//楼层四
    carousel($('.fiveth-stair'));//楼层五
    carousel($('.eighth-stair'));//楼层八

    //楼层轮播图函数 自动+手动
    function carousel(obj){
        var banner_index = 1;//轮播图片计数器
        //手动
        obj.eq(0).find('.stair-title-left').click(function(){
            $(this.parentNode).find('.stair-nav-li').hide();
            banner_index--;
            if(banner_index < 1) banner_index = $(this.parentNode).find('.stair-nav-li').length();            
            $(this.parentNode).find('.stair-nav-li').gt(banner_index-1).style.display = 'block';
            //alert('上一张');
        });
        obj.eq(0).find('.stair-title-right');
        obj.eq(0).find('.stair-title-right').click(function(){
            $(this.parentNode).find('.stair-nav-li').hide();
            banner_index++;
            if(banner_index >= $(this.parentNode).find('.stair-nav-li').length()) banner_index = 1;   
            $(this.parentNode).find('.stair-nav-li').gt(banner_index).style.display = 'block';
            //alert('下一张');
        });
    }
    
    //窗口滚动 楼梯事件
    window.onscroll = function(){
        var stairsLi = $('.side-stairs').find('li');
        //alert(stairsLi.length());
        if(document.body.scrollTop > 300){
            $('.float-nav').show();
            $('.side-stairs').show();
        }else{
            $('.float-nav').hide();
            $('.side-stairs').hide();
        }
        
        //stairsLi.find('.side-stairs-font').hide();//初始化
        if(document.body.scrollTop > 300 && document.body.scrollTop < 600){
            stairsLi.find('.side-stairs-ico').eq(0).hide();
            stairsLi.find('.side-stairs-font').eq(0).show();
        }else if(document.body.scrollTop > 600 && document.body.scrollTop < 1000){
            stairsLi.find('.side-stairs-ico').eq(1).hide();
            stairsLi.find('.side-stairs-font').eq(1).show();
        }else if(document.body.scrollTop > 600 && document.body.scrollTop < 1400){
            stairsLi.find('.side-stairs-ico').eq(2).hide();
            stairsLi.find('.side-stairs-font').eq(2).show();
        }else if(document.body.scrollTop > 600 && document.body.scrollTop < 1800){
            stairsLi.find('.side-stairs-ico').eq(3).hide();
            stairsLi.find('.side-stairs-font').eq(3).show();
        }else if(document.body.scrollTop > 600 && document.body.scrollTop < 2200){
            stairsLi.find('.side-stairs-ico').eq(4).hide();
            stairsLi.find('.side-stairs-font').eq(4).show();
        }else if(document.body.scrollTop > 600 && document.body.scrollTop < 2400){
            stairsLi.find('.side-stairs-ico').eq(5).hide();
            stairsLi.find('.side-stairs-font').eq(5).show();
        }else if(document.body.scrollTop > 600 && document.body.scrollTop < 2800){
            stairsLi.find('.side-stairs-ico').eq(6).hide();
            stairsLi.find('.side-stairs-font').eq(6).show();
        }else if(document.body.scrollTop > 600 && document.body.scrollTop < 3200){
            stairsLi.find('.side-stairs-ico').eq(7).hide();
            stairsLi.find('.side-stairs-font').eq(7).show();
        }else if(document.body.scrollTop > 600 && document.body.scrollTop < 3600){
            stairsLi.find('.side-stairs-ico').eq(8).hide();
            stairsLi.find('.side-stairs-font').eq(8).show();
        }else if(document.body.scrollTop > 600 && document.body.scrollTop < 4000){
            stairsLi.find('.side-stairs-ico').eq(9).hide();
            stairsLi.find('.side-stairs-font').eq(9).show();
        }else if(document.body.scrollTop > 600 && document.body.scrollTop < 4400){
            stairsLi.find('.side-stairs-ico').eq(10).hide();
            stairsLi.find('.side-stairs-font').eq(10).show();
        }
        
   }
   
   //楼梯点击事件
   var stairsLi = $('.side-stairs').find('li');
      
   for(var i=0;i<stairsLi.length();i++){
       stairsLi.eq(i).click(function(){
            document.body.scrollTop = 600 + i*422;
            return false;
       });
   }
    
}



