$(function(){
	var excel={
		 init:function(){
		 	 that = this;
		 	 that.start();
		 	 that.jianyuan();
		 	 that.editStatus();
		 },
		 start:function(){
		 	  var search_name;
		 	  var com=function(){
	              var shebao_status=$("#shebao_status").find("option:selected").val();
	              var gongjijin_status=$("#gongjijin_status").find("option:selected").val();
	              search_name=$("#search_name").find("input").val();
         	      window.location.href="/dsb/security/index/sb/"+shebao_status+"/gg/"+gongjijin_status+".html";
		 	  }
		 	  var com1=function(event){
		 	  	  event.preventDefault();
	              search_name=$("#search_name").find("input").val();
         	      window.location.href="/dsb/security/index/s/"+search_name+".html";
		 	  }
		 	  $("#shebao_status").on("change",function(){
	              com();
              });
              $("#gongjijin_status").on("change",function(){
	              com();
              });
              $("#search_name>span").click(function(){
  	              com1(event);
              });

              document.onkeydown=function(event){
		 	    var e = event || window.event || arguments.callee.caller.arguments[0];　　
	               if(e && e.keyCode==13){ // enter 键
       		 	  	com1(event);
	               }
		 	  }; 


              $(".peopleReduce").hover(function(){
                  $(this).find("span").show();
              },function(){
                  $(this).find("span").hide();
              })
		 },
		 jianyuan:function(){
		 	var $shebaoType=$("#shebaoType span");
		 	var $jyReduce=$("#jyReduce");
		 	var id;
		 	$(".czReduce").click(function(){
		 		$jyReduce.addClass("show-popup");
		 		$shebaoType.removeClass("on_check");
		 		id=$(this).data("id");
		 	});
		 	$("#cancelPopup").click(function(){
		 		$jyReduce.removeClass("show-popup");
		 	});
		 	$shebaoType.click(function(){
               var isCheck=$(this).hasClass("on_check");
               if(isCheck){
               	$(this).removeClass("on_check");
               }else{
               	$(this).addClass("on_check");
               }
		 	});
		 	$("#comfirmPopup").click(function(){
               var len=$shebaoType.length;
               var on_check,arr=[],type;
               for (var i = 0; i < len; i++) {
               	 on_check=$shebaoType.eq(i).hasClass("on_check");
               	 if(on_check){
               	 	type=$shebaoType.eq(i).data("type");
               	 	arr.push(type);
               	 }
               }
               var length=arr.length;
               if(length==0){
                 popup({txt:"请勾选相应的项目进行操作"});
                 return;
               }else if(length==1){
                 type=arr[0];
               }else{
               	 type=3;
               }
				$.ajax({
					type: "post",
					url: "/dsb/security/edit",
					data: {id:id,type:type},
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
		 	});
		 },
		 editStatus:function(){
		 	$(".editStatus").click(function(){
		 		// var id=$(this).data("id");
		 		// var status=$(this).data("status");
		 		var curl=$(this).data("url");
		 		var text=$(this).text();
		 		popup({txt:"确定要"+text+"吗？",btn:2},function(){
                   window.location.href=curl;
		 		});
		 	})
		 },
	}
	excel.init();
})