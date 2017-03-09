/**
 *  tmall自定义js框架
 *  author:sunlei
 *  time:2015-08-01
 */

//基础库定义--将所有方法置于外面
function Base(oneElements){
    //存放获取的节点数组
    this.elements = [];
    
    if(typeof oneElements == 'string'){
        switch(oneElements.charAt(0)){
            case '#':
                this.elements.push(this.getId(oneElements.substring(1)));
                break;
            case '.':
                this.elements = this.getClass(oneElements.substring(1));
                break;
            default:
                this.elements = this.getTag(oneElements);
        }
    }else if(typeof oneElements == 'object'){
        if(oneElements != undefined){
            this.elements[0] = oneElements;
        }
    }
}

//简化调用
var $ = function(oneElements){
    return new Base(oneElements);
}

//通过ID获取元素
Base.prototype.getId = function(id){
    return document.getElementById(id);
}

//通过标签名获取元素
Base.prototype.getTag = function(tag,parentNode){
    var node = null;
    var temps = [];
    if(parentNode != undefined){
        node = parentNode;
    }else{
        node = document;
    }
    var tags = node.getElementsByTagName(tag);
    for(var i=0;i<tags.length;i++){
        temps.push(tags[i]);
    }
    return temps;
}

//通过元素名称获取元素
Base.prototype.getName = function(name){
    var names = document.getElementsByName(name);
    for(var i=0;i<names.length;i++){
        this.elements.push(names[i]);
    }
    return this;
}

//通过类名获取元素
Base.prototype.getClass = function(className,parentNode){
    var node = null;
    var temps =[];
    if(parentNode != undefined){
        node = parentNode;
    }else{
        node = document;
    }
    var all = node.getElementsByTagName('*');
    for(var i=0;i<all.length;i++){
        if(all[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
            temps.push(all[i]);
        }
    }
    return temps;
}

//设置CSS选择器子节点
Base.prototype.find = function (str) {
	var childElements = [];
	for (var i = 0; i < this.elements.length; i ++) {
		switch (str.charAt(0)) {
			case '#' :
				childElements.push(this.getId(str.substring(1)));
				break;
			case '.' : 
				var temps = this.getClass(str.substring(1), this.elements[i]);
				for (var j = 0; j < temps.length; j ++) {
					childElements.push(temps[j]);
				}
				break;
			default : 
				var temps = this.getTag(str, this.elements[i]);
				for (var j = 0; j < temps.length; j ++) {
					childElements.push(temps[j]);
				}
		}
	}
	this.elements = childElements;
	return this;
}

//获取匹配到元素的个数
Base.prototype.length = function(){
	return this.elements.length;
}

//隐藏元素
Base.prototype.hide = function(){
	for(var i=0 ; i<this.elements.length ; i++){
		this.elements[i].style.display = 'none';
	}
	return this;
}

//显示元素
Base.prototype.show = function(){
	for(var i=0;i<this.elements.length ; i++){
		this.elements[i].style.display = 'block';
	}
	return this;
}

//鼠标点击事件
Base.prototype.click = function(fn){
	for(var i=0 ; i<this.elements.length ; i++){
		this.elements[i].onclick = fn;
	}
	return this;
}

//移入移出效果
Base.prototype.hover = function(over,out){
	for(var i=0 ; i<this.elements.length ; i++){
		this.elements[i].onmouseover = over;
		this.elements[i].onmouseout = out;		
	}
	return this;
}

//设置或获取CSS
Base.prototype.css = function(key,value){
	for(var i=0 ; i<this.elements.length ; i++){
        if(arguments.length == 1){
            if(typeof window.getComputedStyle != 'undefined'){
                return window.getComputedStyle(this.elements[i],null)[key];
            }else if(typeof this.elements[i].currentStyle !='undefined'){
                return this.elements[i].currentStyle(key);
            }
        }else{
            this.elements[i].style[key] = value;    
        }
   	}
	return this;
}

//元素添加类名
Base.prototype.addClass = function(className){
    for(var i=0;i<this.elements.length;i++){
        if(!this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
            this.elements[i].className += ' ' + className;
        }
    }
    return this;
}

//元素移除类名
Base.prototype.removeClass = function(className){
    for(var i=0;i<this.elements.length;i++){
        if(this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
            this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),'');
        }
    }
    return this;
}

//获取和指定匹配序号的HTML元素
Base.prototype.gt = function(num){
	return this.elements[num];
}

//获取和指定匹配序号的对象
Base.prototype.eq = function(num){
	var ele = this.elements[num];
	this.elements = []; //清空数组 亦可使用this.elements = [];
	this.elements[0] = ele;  //注意这里的 0
	return this;
}

//获取匹配数组的第一个
Base.prototype.first = function(){
	return this.elements[0];
}

//获取匹配元素的最后一个
Base.prototype.last = function(){
	return this.elements[this.elements.length - 1];
}

//获取指定元素对象的序号
Base.prototype.index = function(){	//有问题
    var children = this.elements[0].parentNode.children;
    for(var i=0;i<children.length;i++){
        if(this.elements[0] == children[i])
        return i;
    }

}