$(function(){
	var employee={
		 init:function(){
		 	 that = this;
		 	 that.start();
		 	 that.addStaff();//增加员工popup
             that.infoSubmit();//员工信息提交
             that.editStatus();//修改员工状态
		 },
		 start:function(){
		 	  $(".amend-info").hover(function(){
		 	    $(this).find("div").show();
		 	  },function(){
                  $(this).find("div").hide();
		 	  })
		 	  //  $(".amend-info").mouseenter(function(){
		 	  //   $(this).find("div").addClass("show");
		 	  // })
		 	  // $(".amend-info .show").mouseout(function(){
		 	  //   $(this).removeClass("show");
		 	  // })
		 	  $("#changeState").change(function(){
		 	  	var state=$(this).find("option:selected").val();
		 	  	// if (state==='0') {
		 	  	//  window.location.href='/dsb/employee/index/status/'+state;	
		 	  	// }else{
                 window.location.href='/dsb/employee/index/status/'+state+'.html';
		 	  	// }
		 	  })
		 	  $("#search").click(function(event){
		 	  	com1(event);
		 	  })
		 	  $(".table-search input").focus(function(){
			 	  document.onkeydown=function(event){
			 	    var e = event || window.event || arguments.callee.caller.arguments[0];　　
		               if(e && e.keyCode==13){ // enter 键
	       		 	  	com1(event);
		               }
			 	  }; 
		 	  })
		 	  var com1=function(event){
		 	  	 event.preventDefault();
  			 	 var search=$("#search").siblings('input').val();
  	             window.location.href='/dsb/employee/index/s/'+search+'.html';
		 	  }
		 },
		 addStaff:function(){
		 	var $staffPopup=$("#staffPopup");
		 	var $name=$("#name");
	 		var $idcard=$("#idcard");
	 		var $telphone=$("#telphone");
	 		var $email=$("#email");
		 	$("#addStaff").click(function(){
		 		$staffPopup.addClass("show-popup");
		 		$(".staff-popup h3").text("添加员工");
		 		$name.val("").removeAttr("disabled"); 
		 		$idcard.val("").removeAttr("disabled"); 
		 		$telphone.val("");
		 		$email.val("");
		 	});
		 	$(".editStaff").click(function(){
		 		var $td=$(this).parents("tr").find("td");
		 		var id=$(this).siblings(".editStatus").data("id");
		 		var name=$td.eq(1).text();
		 		var card=$td.eq(2).text();
		 		var tel=$td.eq(3).text();
		 		var email=$td.eq(4).text();
		 		$name.val(name).prop('disabled','true');
		 		$idcard.val(card).prop('disabled','true');
		 		$telphone.val(tel);
		 		$email.val(email);
		 		$("#infoSubmit").data("isStatus","2").data("id",id);
		 		$staffPopup.addClass("show-popup");
		 		$(".staff-popup h3").text("修改员工信息");
		 	});
		 	$("#hidePopup").click(function(){
		 		$staffPopup.removeClass("show-popup");
		 	});
		 },
		 infoSubmit:function(){
             $("#infoSubmit").click(function(){
             	var isStatus=$(this).data("isStatus");
	                var myreg = new RegExp(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/);
	             	var carid = new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/);
	             	var emailreg= new RegExp(/^([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/);
	             	var name=$.trim($("#name").val());
	             	var idcard=$.trim($("#idcard").val());
	             	var telphone=$.trim($("#telphone").val());
	             	var email=$.trim($("#email").val());
	                if (!ifNotNull(name)) {
	                   popup({txt:"姓名不能为空"});
	                }else if(!name.match(/^[\u4E00-\u9FA5]+$/)){
	                   popup({txt:"请输入正确的姓名"});
	                }else if(!idcard.match(carid)) { 
	                   popup({txt:"请输入正确的身份证号"});
	                }else{
	                   if(ifNotNull(telphone)){
	                     if(!telphone.match(myreg)){
	                       popup({txt:"请输入正确的手机号"});
	                       return;
	                     }
	                   }
	                   if(ifNotNull(email)){
	                     if(!email.match(emailreg)){
	                       popup({txt:"请输入正确的邮箱号"});
	                       return;
	                     }
	                   }
	                   if(isStatus=='1'){
		   		 	       $.ajax({
			   		 	        type: "post",
			   		 	        url: "/dsb/employee/add.html",
			   		 	        data: {name:name,idcard:idcard,telphone:telphone,email:email},
			   		 	        dataType: "json",
			   		 	        success: function (data) {
			   		 	            if (data.code == "200") {
			   		 	            	popup({txt:"添加成功！",hd_style:"style='display: none;'",btn_style:"style='display: none;'"});
			   		 	            	window.location.reload();
			   		 	            }else{
			   		 	               popup({txt:data.msg});
			   		 	            }
			   		 	        },
			   		 	        error: function () {
			                    popup({txt:"抱歉，系统发生错误"});
			   		 	        }
		   		 	       });
		   		 	   }else{
		   		 	   	   var id=$(this).data("id");
		   		 	   	   $.ajax({
			   		 	        type: "post",
			   		 	        url: "/dsb/employee/edit",
			   		 	        data: {id:id,telphone:telphone,email:email},
			   		 	        dataType: "json",
			   		 	        success: function (data) {
			   		 	            if (data.code == "200") {
			   		 	            	popup({txt:"添加成功！",hd_style:"style='display: none;'",btn_style:"style='display: none;'"});
			   		 	            	window.location.reload();
			   		 	            }else{
			   		 	               popup({txt:data.msg});
			   		 	            }
			   		 	        },
			   		 	        error: function () {
			                    popup({txt:"抱歉，系统发生错误"});
			   		 	        }
		   		 	       });
		   		 	   }
	                } 

             	

             })
		 },
		 editStatus:function(){
		 	$(".editStatus").click(function(){
 			 	var status=$(this).data('status');
 			 	var id=$(this).data('id');
 			 	if(status===2){
 			 		popup({txt:"确定要离职吗？",btn:2},function(){
                	 	com();
 			 		});
 			 	}else if(status===1){
			 		popup({txt:"确定要入职吗？",btn:2},function(){
               	 	com();
			 		});
 			 	}

 			 	var com=function(){
 			 		$.ajax({
	         	        type: "post",
	         	        url: "/dsb/employee/edit.html",
	         	        data: {id:id,status:status},
	         	        dataType: "json",
	         	        success: function (data) {
	         	            if (data.code == "200") {
	         	            	window.location.reload();
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
		 	
		 }
	}
	employee.init();
})