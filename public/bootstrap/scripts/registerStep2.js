$(function(){
	var registerStep2={
		 init:function(){
		 	 that = this;
		 	 that.start();
		 },
		 start:function(){
             $("#login").click(function(){
             	var myreg=/^(\w){6,20}$/;  
             	var phoneNum=$.trim($("#password1").val());
             	var yzm=$.trim($("#password2").val());

                var $tip = $("#tip-1");
                var $tip2 = $("#tip-2");
             	if (!phoneNum.match(myreg)) { 
                   $tip.fadeIn();
                   return false;
                 }else if (!yzm.match(myreg)) {
                   $tip.fadeOut();
		           $tip2.fadeIn();
		           return false;
		         }else if (phoneNum!==yzm) {
		           $tip2.text("* 两次密码不一致");
                   $tip.fadeOut();
		           $tip2.fadeIn();
		           return false;
		         }else{
		           $tip2.fadeOut();

   		 	     $.ajax({
   		 	        type: "post",
   		 	        url: "/dsb/user/step2",
   		 	        data: {password:phoneNum,repeat:yzm},
   		 	        dataType: "json",
   		 	        success: function (data) {
   		 	            if (data.code == "200") {
   		 	            	window.location.href="/dsb/user/step3.html";
   		 	            }else{
   		 	               popup({txt:data.msg});
   		 	            }
   		 	        },
   		 	        error: function () {
                         popup({txt:"抱歉，系统发生错误"});
   		 	        }
   		 	      });
                 } 

             })
		 },
	}
	registerStep2.init();
})