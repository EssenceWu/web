$(function(){
	var supplieList={
		 init:function(){
		 	 that = this;
             that.start();
		 },
		 start:function(){
            // $("#listShow li").click(function(){
            //     var $this=$(this);
            //   if($this.hasClass("isShow")){
            //      $this.find("table").hide().end().find("div i").addClass("icon-jiantou").removeClass("icon-jiantou-copy").end().removeClass("isShow");
            //    }else{
            //      $this.find("table").show().end().find("div i").removeClass("icon-jiantou").addClass("icon-jiantou-copy").end().addClass("isShow");
            //    }
              
            // })
            var $name=$("#name");
            var $real_name=$("#real_name");
            var $telphone=$("#telphone");
            var $email=$("#email");
           // var $business=$("#business");
            //var myreg = new RegExp(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/);
            var myreg1 = new RegExp(/^([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/);
          
            $name.find("input").blur(function(){
            	var name=$.trim($name.find("input").val());
                if(ifNotNull(name)){
                	$name.find("span").fadeOut();
                }
            })
            $real_name.find("input").blur(function(){
            	var real_name=$.trim($real_name.find("input").val());
                if(ifNotNull(real_name)){
                	$real_name.find("span").fadeOut();
                }
            })
            $telphone.find("input").blur(function(){
            	var telphone=$.trim($telphone.find("input").val());
                if(ifNotNull(telphone)){
                	$telphone.find("span").fadeOut();
                }
            })
            $email.find("input").blur(function(){
                var email=$.trim($email.find("input").val());
                if(ifNotNull(email) && email.match(myreg1)){
                    $email.find("span").fadeOut();
                }
            })
   //          $business.find("select").change(function(){
   //            var business=$.trim($business.find("option:selected").val());
			//   if(ifNotNull(business)){
	  //         	$business.find("span").fadeOut();
	  //         }
			// })
            $("#addInfo").click(function(){
            	var name=$.trim($name.find("input").val());
            	var real_name=$.trim($real_name.find("input").val());
            	var telphone=$.trim($telphone.find("input").val());
                var email=$.trim($email.find("input").val());
                var $serverStatus=$("#serverStatus");
                var status=$serverStatus.prop('checked');
                if (status) {
                    status=1;
                }else{
                    status=2;
                }
            	//var business=$.trim($business.find("option:selected").val());
                // else if(!ifNotNull(business)){
                //     $business.find("span").fadeIn();
                // }
            	if(!ifNotNull(name)){
            		$name.find("span").fadeIn();
            	}else if(!ifNotNull(real_name)){
            		$real_name.find("span").fadeIn();
            	}else if(!ifNotNull(telphone)){
            		$telphone.find("span").fadeIn();
            	}else if(!ifNotNull(email)){
            		$email.find("span").fadeIn();
            	}else{
                    $.ajax({
                         type: "post",
                         url: "/admin/servicer/add",
                         data: {name:name,real_name:real_name,telphone:telphone,email:email,status:status},
                         dataType: "json",
                         success: function (data) {
                             if (data.code == "200") {
                                window.location.href=data.data.url;
                                 // popup({txt:"保存成功！"},function(){
                                 //   window.location.reload();
                                 // });
                             } else{
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
	supplieList.init();
})