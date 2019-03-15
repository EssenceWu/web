$(function(){
	var myreg = new RegExp(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/);
	var login={
		 init:function(){
		 	 that = this;
             that.goLogin();
             that.get_yzm();
             that.focus();//失去焦点市触发
		 },
		 goLogin:function(){
             $("#login").click(function(){
             	var phoneNum=$.trim($("#tel").val());
             	var yzm=$.trim($("#yzm").val());
     
                var $tip = $("#tip-1");
                var $tip2 = $("#tip-2");
             	if (!phoneNum.match(myreg)) {
                   $tip.fadeIn();
                   return false;
                 }else if (!yzm.match(/^\d{6}$/)) {
                   $tip.fadeOut();
		           $tip2.fadeIn();
		           return false;
		         }else{
		           $tip2.fadeOut();

   		 	     $.ajax({
   		 	        type: "post",
   		 	        url: "/User/login",
   		 	        data: {username:phoneNum,vertifyCode:yzm},
   		 	        dataType: "json",
   		 	        success: function (data) {
   		 	            if (data.code == "200") {
   		 	            	window.location.href=data.data.url;
   		 	            }else{
   		 	               popup({txt:data.msg});
   		 	            }
   		 	        },
   		 	        error: function () {
                         popup({txt:"抱歉，系统发生错误"});
   		 	        }
   		 	      });
		           //$(".form-signin").submit();
                 } 

             })
		 },
		 get_yzm:function(){
		 	//获取验证码
		 	$("#get_yzm").bind("click",function () {
		 	    var $this = $(this);
		 	    var phoneNum = $.trim($("#tel").val());
		 	    var $tip = $("#tip-1");
		 	    if (!phoneNum.match(myreg)) {
		 	      $tip.fadeIn();
		 	      return false;
		 	    } else if ($this.text() == "获取验证码") {
		 	      $tip.fadeOut();
		 	        var wait = 60;
		 	        var sendCode = setInterval(function () {
		 	            if (wait == 0) {
		 	                $this.attr('disabled', false);
		 	                $this.removeClass("btn-gray").addClass("btn-blue").text('获取验证码');
		 	                wait = 60;
		 	                clearInterval(sendCode);
		 	            } else {
		 	                $this.removeClass("btn-blue").addClass("btn-gray").text(wait + '秒');
		 	                $this.attr('disabled', true);
		 	                wait--;
		 	            }
		 	        }, 1000);
		 	    }
		 	     $.ajax({
		 	        type: "post",
		 	        url: "/User/vertifyCode",
		 	        data: {phone_number:phoneNum},
		 	        dataType: "json",
		 	        success: function (data) {
		 	            popup({txt:data.msg});
		 	        },
		 	        error: function () {
                        popup({txt:"抱歉，系统发生错误"});
		 	        }
		 	      });
		 	});
		 },
		 focus:function(){
		 	$("#tel").blur(function(){ 
                var phoneNum = $.trim($("#tel").val());
                if (phoneNum.match(myreg)) {
		 	      $("#tip-1").fadeOut();
		 	    } 
		 	});
		 	$("#yzm").blur(function(){ 
                var yzm = $.trim($("#yzm").val());
                if (yzm.match(/^\d{4}$/)) {
		 	      $("#tip-2").fadeOut();
		 	    } 
		 	});
		 },

	}
	login.init();
})