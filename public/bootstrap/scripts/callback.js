$(function(){
	var callback={
		 init:function(){
		 	 that = this;
             that.goLogin();
             that.focus();//失去焦点市触发
		 },
		 goLogin:function(){
             $("#login").click(function(){
             	// var ys_password=$.trim($("#ys-password").val());
             	var password=$.trim($("#password").val());
             	var new_password=$.trim($("#new-password").val());
             	var myreg=/^(\w){6,20}$/;
              var sign=$(this).data("sign");
     
                // var $tip = $("#tip-1");
              var $tip2 = $("#tip-2");
              var $tip3 = $("#tip-3");
             if(!password.match(myreg)) {
		           $tip2.fadeIn();
		           return false;
		         }else if (!new_password.match(myreg)) {
               $tip2.fadeOut();
		           $tip3.fadeIn();
		           return false;
		         }else if (password!==new_password) {
		           $tip3.text("* 两次新密码不一致");
               $tip2.fadeOut();
		           $tip3.fadeIn();
		           return false;
		         }else{
		           $tip3.fadeOut();

   		 	     $.ajax({
   		 	        type: "post",
   		 	        url: "/dsb/user/callback",
   		 	        data: {password:password,repeat:new_password,sign:sign},
   		 	        dataType: "json",
   		 	        success: function (data) {
   		 	            if (data.code == "200") {
                      popup({txt:"找回密码成功！"},function(){
                        window.location.href=data.data.url;
                      });
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
		 focus:function(){
		 	var myreg=/^(\w){6,20}$/;
		 	$("#password").blur(function(){ 
          var password = $.trim($("#password").val());
          if (password.match(myreg)) {
		 	      $("#tip-2").fadeOut();
		 	    } 
		 	});
		 	$("#new-password").blur(function(){ 
          var new_password = $.trim($("#new-password").val());
          if (new_password.match(myreg)) {
		 	      $("#tip-3").fadeOut();
		 	    } 
		 	});
		 },

	}
	callback.init();
})