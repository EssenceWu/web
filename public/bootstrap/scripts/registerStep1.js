$(function(){
	var myreg = new RegExp(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/);
	var registerStep1={
		 init:function(){
		 	 that = this;
		 	 that.start();
             that.goLogin();
             that.focus();//失去焦点市触发
		 },
		 start:function(){
		 	var handler = function (captchaObj) {
		 	    captchaObj.onReady(function () {
		 	        $("#wait").hide();
		 	    }).onSuccess(function () {
		 	            var result = captchaObj.getValidate();
		 	            var phoneNum = $.trim($("#tel").val());
		 	            if (!result) {
		 	               return alert('请完成验证');
		 	            }
		 	            $.ajax({
		 	                url: '/dsb/user/reg_verify',
		 	                type: 'POST',
		 	                dataType: 'json',
		 	                data: {
		 	                    username: phoneNum,
		 	                    geetest_challenge: result.geetest_challenge,
		 	                    geetest_validate: result.geetest_validate,
		 	                    geetest_seccode: result.geetest_seccode
		 	                },
		 	                success: function (data) {
		 	                    if (data.code == '200') {
		 	                        //popup({txt:"验证码已发送成功!"});

		 	                        var $this = $("#get_yzm");
		 	                        if ($this.text() == "获取验证码") {
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

		 	                    } else {
		 	                        popup({txt:data.msg});
		 	                        captchaObj.reset();
		 	                    }
		 	                }
		 	            });

		 	           
		 	        });

		 	     $('#get_yzm').click(function () {
		 	        // 调用之前先通过前端表单校验
		 	        var phoneNum = $.trim($("#tel").val());
		 	        var $tip = $("#tip-1");
		 	        var myreg = new RegExp(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/);
		 	        if (!phoneNum.match(myreg)) {
		 	          $tip.fadeIn();
		 	          return false;
		 	        } else{
		 	          $tip.fadeOut();
		 	          captchaObj.verify();
		 	        }
		 	    });
		 	};


		 	$.ajax({
		 	    url: "/dsb/user/stat?t=" + (new Date()).getTime(), // 加随机数防止缓存
		 	    type: "get",
		 	    dataType: "json",
		 	    success: function (data) {
		 	        // 调用 initGeetest 进行初始化
		 	        // 参数1：配置参数
		 	        // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
		 	        initGeetest({
		 	            // 以下 4 个配置参数为必须，不能缺少
		 	            gt: data.gt,
		 	            challenge: data.challenge,
		 	            offline: !data.success, // 表示用户后台检测极验服务器是否宕机
		 	            new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
		 	            product: "bind", // 产品形式，包括：float，popup, custom
		 	            width: "330px",
		 	        }, handler);
		 	    }
		 	});
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
   		 	        url: "/dsb/user/register",
   		 	        data: {username:phoneNum,code:yzm},
   		 	        dataType: "json",
   		 	        success: function (data) {
   		 	            if (data.code == "200") {
   		 	            	window.location.href='/dsb/user/step2.html';
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
	registerStep1.init();
})