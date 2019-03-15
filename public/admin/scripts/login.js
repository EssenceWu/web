$(function(){
	var login={
		 init:function(){
		 	 that = this;
             that.goLogin();
             that.focus();//失去焦点市触发
		 },
		 goLogin:function(){
             $("#login").click(function(){
             	var name=$.trim($("#name").val());
             	var password=$.trim($("#password").val());
     
                var $tip = $("#tip-1");
                var $tip2 = $("#tip-2");
             	if (!ifNotNull(name)) {
                   $tip.fadeIn();
                   return false;
                 }else if (!password.match(/[^\u4e00-\u9fa5]/)) {
                   $tip.fadeOut();
		           $tip2.fadeIn();
		           return false;
		         }else{
		           $tip2.fadeOut();
                    $.ajax({
                     type: "post",
                     url: "/admin/admin/login",
                     data: {username:name,password:password},
                     dataType: "json",
                     success: function (data) {
                         if (data.code == "200") {
                            window.location.href=data.data.url;
                         } else{
                         	layer.msg(data.msg, {icon: 2, time: 1000 });
                         }
                     },
                     error: function () {
                     	 layer.msg("抱歉，系统发生错误", {icon: 2, time: 1000 });
                     }
                    });
                 } 

             })
		 },
		 focus:function(){
		 	$("#name").blur(function(){ 
                var name = $.trim($("#name").val());
                if (!ifNotNull(name)) {
		 	      $("#tip-1").fadeIn();
		 	    }else{
		 	      $("#tip-1").fadeOut();	
		 	    } 
		 	});
		 	$("#password").blur(function(){ 
                var password = $.trim($("#password").val());
                if (!password.match(/[^\u4e00-\u9fa5]/)) {
		 	      $("#tip-2").fadeIn();
		 	    }else{
		 	      $("#tip-2").fadeOut();	
		 	    }  
		 	});
		 },

	}
	login.init();
})