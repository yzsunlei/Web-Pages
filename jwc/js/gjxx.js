var fdiv=document.getElementById('gjxx');
var f_li=fdiv.getElementsByTagName('li');
for(var i=1;i<f_li.length;i++){
  if(i%2=='1'){
    f_li[i].style.background='url(../images/li_bg.jpg) #ffffff no-repeat 5px center';
  }
}