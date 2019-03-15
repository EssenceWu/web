$(function(){
	var find={
		 init:function(){
		 	 that = this;
             that.start();
		 },
		 start:function(){
             var handler = function (captchaObj) {
              captchaObj.onReady(function () {
                  $("#wait").hide();
              }).onSuccess(function () {
                      var result = captchaObj.getValidate();
                      var email = $.trim($("#email").val());
                      if (!result) {
                         popup({txt:'请完成验证'});
                      }
                      $.ajax({
                          url: '/dsb/user/find',
                          type: 'POST',
                          dataType: 'json',
                          data: {
                              email: email,
                              geetest_challenge: result.geetest_challenge,
                              geetest_validate: result.geetest_validate,
                              geetest_seccode: result.geetest_seccode
                          },
                          success: function (data) {
                              if (data.code == "200") {
                                 popup({txt:"邮件发送成功，请注意查收！"});
                              }else{
                                 popup({txt:data.msg});
                                 captchaObj.reset();
                              }

                          }
                      });

                     
                  });

               $('#login').click(function () {
                  // 调用之前先通过前端表单校验
                  var email = $.trim($("#email").val());
                  var $tip = $("#tip-1");
                  var myreg = /^([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                  if (!email.match(myreg)) {
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
		

	}
	find.init();
})