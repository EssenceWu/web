$(function(){
	var step3={
		 init:function(){
		 	 that = this;
             that.sendType();//发送方式选择
		 },
		 sendType:function(){
            $(".send-type span i").click(function() {  
               $(this).addClass('on_check').parent('span').siblings().find('i').removeClass("on_check");  
            }); 
		 }
	}
	step3.init();
})