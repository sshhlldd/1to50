$(function() {
          
            game.gameinit(".gamecon");
            $(document).on('click', '.resetbtn', function() {
                game.gameinit(".gamecon");
                Reset();
            });

})
var game={
 arr11:[],
 arr22:[],
 node:null,
 currNum:1,
 timer:0,
 gameinit:function(obj){
            var arr1=[];
            var arr2=[];
            var arr11=[];
            var arr22=[];
            this.node=$(obj);
            for(var i=1;i<=25;i++){
                arr1.push(i)
            }
            for(var j=26;j<=50;j++){
                arr2.push(j)
            }
            
            arr11=arr1.concat();
            arr22=arr2.concat();
            this.arr11=shuffle(arr11);
            this.arr22=shuffle(arr22);
            this.currNum=1;
            this.node.find('.num').text(this.currNum);
            this.render();

 },
 render:function(){
    this.node.find(".game").empty();
    var temp='<ul>';

    for(var i=0;i<this.arr11.length;i++){
        temp+='<li data-value="'+this.arr11[i]+'">'+this.arr11[i]+'</li>'
    }
    temp+='</ul>';
    this.node.find(".game").append(temp);
    this.handleClick();
 },
 handleClick:function(){
    var that=this;
    this.node.off('click','li');
    this.node.on('click','li',function(){
        var v=parseInt($(this).attr('data-value'));
        if(v==that.currNum){
            if(v<26){
            $(this).addClass('changebg'); 
            var nv=that.arr22[that.currNum-1];
            $(this).text(nv);
            $(this).attr('data-value',nv);   
            }else{

             $(this).removeClass('changebg').addClass('blankbg');
             $(this).text("");
            }
          if(v==50){
            that.currNum=50;
            stop();
            that.timer=parseInt(that.node.find('.timer').text());
            that.result();
          }else{
            that.currNum++; 
          } 
          if(v==1){
              start();
          }        
           that.node.find('.num').text(that.currNum);
        }
    })
 },
 result:function(){  
    var txt="";
    var grade="";
    if(this.timer>10&&this.timer<=19){
      txt="你是宇宙的主宰";
      grade="神之所在";
    }else if(this.timer>=20&&this.timer<=29){
      txt="大神，收下我的膝蓋";
      grade="超人級";
    }else if(this.timer>=30&&this.timer<=39){
      txt="大神，收下我的膝蓋";
      grade="神人級";
    }else if(this.timer>=40&&this.timer<=59){
      txt="我為你打Call~";
      grade="高手級";
    }else if(this.timer>=60&&this.timer<=79){
      txt="你就是那宇宙中的一粒塵埃...";
      grade="正常級";
    }else if(this.timer>=80&&this.timer<=99){
      txt="扎心了，老鐵！祝你好運~";
      grade="初老級";
    }else if(this.timer>=100){
      txt="腦仁也就跟松子差不多大...";
      grade="已老級";
    }

    var restemp=' <div class="rescon"><div class="res"><p class="bb">'+grade+'</p><p class="desc">'+txt+'</p></div></div>'
    this.node.find('.game').append(restemp);
 }

}
    var second=0;//时 分 秒
    var millisecond=0;//毫秒
    var int;
    //重置函数
    function Reset()
    {
      window.clearInterval(int);
      millisecond=second=0;
     $('.gamecon').find('.timer').text('0.0');
    }
    //开始函数
    function start()
    {
      int=setInterval(timer,50);//每隔50毫秒执行一次timer函数
    }
    //计时函数
    function timer()
    {
      millisecond=millisecond+50;
      if(millisecond>=1000)
      {
        millisecond=0;
        second=second+1;
      }
      $('.gamecon').find('.timer').text(second+'.'+millisecond);
      //document.getElementById('timetext').value=hour+'时'+minute+'分'+second+'秒'+millisecond+'毫秒';

    }
    //暂停函数
    function stop()
    {
      window.clearInterval(int);
    }
//随机算法
function shuffle(arr) { 
  var i = arr.length, t, j; 
  while (i) { 
    j = Math.floor(Math.random() * i--); //!!!
    t = arr[i]; 
    arr[i] = arr[j]; 
    arr[j] = t; 
  } 
  return arr;
} 
function mypop(tit, html) {
    $('.ec_pop').remove();

    $('.ec_pop').off('click', '.close')
    var modalDiv = '<div class="ec_pop">\
            <div class="cover"></div>\
            <div class="pop_box">\
            <div class="pop_head"><button type="button" class="close">×</button><h4>' + tit + '</h4></div>\
            <div class="pop_body" style="">' + html + '</div>\
            </div></div>';
    $('body').append(modalDiv);
     if($(window).width()>=600){
                $('.pop_box').css({"width":"40%","left":"30%"})
            }
    $(".pop_box").addClass("animation-dialogue-in");
    $("body,html").addClass("forbid-scroll"); //弹出层后，禁用body和html滚动  
    $('.ec_pop').on('click', '.close', function() {
        $(this).parents('.ec_pop').hide();
        $(".pop_box").removeClass("animation-dialogue-in");
        $("body,html").removeClass("forbid-scroll");
    })
}
function ggPOP(color) {
    $('.ec_pop').remove();
    var modalDiv = '<div class="ec_pop">\
            <div class="cover"></div>\
            <div class="gg_box" style="background-color:'+color+'">\
            <div class="gg_body" style="">\
            <p class="gg_tit">刮獎區<i id="triangle-down"></i></p>\
            <div class="gg_con">\
            <div id="demo1" class="scratchpad">\
            </div>\
            </div>\
            </div>\
            </div></div>';
    $('body').append(modalDiv);
    if($(window).width()>=600){
                $('.gg_box').css({"width":"30%","left":"30%"})
            }
    $(".gg_box").addClass("ggBig");
    $("body,html").addClass("forbid-scroll"); //弹出层后，禁用body和html滚动  
}
ggPOP.prototype.foot=function(obj){
  $('.gg_foot').remove();
  var s='<div class="gg_foot">';
  if(obj.tip!='谢谢参与'){
    s+='<p class="btncon use"><a href="javascript:;" class="btn">立即使用</a></p>';
  }
  else{
    s+='<p class="btncon again"><a href="javascript:;" class="btn">再来一次</a></p>';
  }
  s+='<p class="btncon share"><a href="javascript:;" class="btn"><i></i><span>分享給朋友</span></a></p></div>';
  $('.gg_box').append(s);
}