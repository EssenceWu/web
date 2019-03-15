$(function(){
  var myreg = new RegExp(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/);
  var salaryBill={
    init:function(){
      that = this;
      that.get_yzm();
      that.login();
      that.focus();
    },
    get_yzm:function(){
      //获取验证码
      // var error_msg=$("#error_msg").val();
      // if (ifNotNull(error_msg)) {
      //     warnAlert(error_msg);
      // }
      var error_msg=$("#error_msg").val();
      if (ifNotNull(error_msg)) {
          popup({txt:error_msg},function(){
              javascript :window.history.go(-1);
          });
      }
      $("#get_yzm").bind("click",function () {
          var $this = $(this);
          var phoneNum = $.trim($("#phone").val());
          if (!phoneNum.match(myreg)) {
            $(".tip-1").fadeIn();
            return false;
          } 
          else if ($this.val() == "获取验证码") {
              $(".tip-1").fadeOut();
              var wait = 60;
              var sendCode = setInterval(function () {
                  if (wait == 0) {
                      $this.attr('disabled', false);
                      $this.removeClass("gray").addClass("blue").val('获取验证码');
                      wait = 60;
                      clearInterval(sendCode);
                  } else {
                      $this.removeClass("blue").addClass("gray").val(wait + '秒');
                      $this.attr('disabled', true);
                      wait--;
                  }
              }, 1000);
          }
           $.ajax({
              type: "post",
              url: "/dsb/CompanySalaryStaffAccount/identifyCode",
              data: {mobile:phoneNum},
              dataType: "json",
              success: function (data) {
                  if (data.error_code == "200") {
                  } else if(data.error_code == "0"){
                     warnAlert(data.msg);
                  }
              },
              error: function () {
                  warnAlert("抱歉，系统发生错误");
                 
              }
            });
      });
    },
    focus:function(){
      $("#phone").blur(function(){ 
          var phoneNum = $.trim($(this).val());
          if (phoneNum.match(myreg)) {
            $(".tip-1").fadeOut();
          }else{
            $(".tip-1").fadeIn();
          }
      });
      $("#yzm").blur(function(){ 
          var yzm = $.trim($(this).val());
          if (yzm.match(/^\d{4}$/)) {
            $(".tip-2").fadeOut();
          } 
      });
    },
    login:function(){
      $("#login").click(function(){
          var tel=$("#phone").val();
          var yzm=$("#yzm").val();
          var $tip = $(".tip-1");
          var $tip2 = $(".tip-2");
          if (!tel.match(myreg)) {
               $tip.fadeIn();
               return false;
          }else if (!yzm.match(/^\d{4}$/)) {
               $tip.fadeOut();
               $tip2.fadeIn();
               return false;
          }else{
          	//$("#Account_sbumit").sbumit();
          }
          
      });
    },
  }
  salaryBill.init();
})