$(function(){
	var account={
		 init:function(){
		 	 that = this;
		 	 that.repair();
		 	 that.waitOrder();
		 	 that.kaipiaoConfirm();
		 },
		 repair:function(){
		 	  var com=function(event,index){
		 	  	  event.preventDefault();
	              var searchCard=$(".bill-serach input").val();
           	      window.location.href="/admin/account/"+index+"/s/"+searchCard+".html";
		 	  }
		 	  var com1=function(){
              	  var isIndex=$("#search").data("index");
              	  var index;
              	  if(isIndex=='1'){
                    index='index';
              	  }else{
              	  	index='company';
              	  }
              	  com(event,index);
		 	  }
              $("#search").click(function(event){
              	  com1();
              });
              document.onkeydown=function(event){
		 	    var e = event || window.event || arguments.callee.caller.arguments[0];　　
	               if(e && e.keyCode==13){ // enter 键
	               	com1();
	               }
		 	  }; 
		 },
		 waitOrder:function(){
		 	$(".waitOrder").click(function(){
		 	  var curl=$(this).data("url");
              $.ajax({
               type: "get",
               url: curl,
               data: {},
               dataType: "json",
               success: function (data) {
                   if (data.code == "200") {
                      popup({txt:data.msg,btn:2},function(){
                      	window.location.href=data.data.url;
                      });
                   } else{
                      popup({txt:data.msg});
                   }
               },
               error: function () {
                   popup({txt:"抱歉，系统发生错误！"});
               }
              });
		 	})
		 },
		 kaipiaoConfirm:function(){
		 	$(".kaipiaoConfirm,.repeatConfirm").click(function(){
               var curl=$(this).data("curl");
               var txt=$(this).text();
               popup({txt:"确定要"+txt+"吗？",btn:2},function(){
	             window.location.href=curl;
	           });
		 	})
		 },
	}
	account.init();
})