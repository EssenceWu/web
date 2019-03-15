$(function(){
	var customerIndex={
		 init:function(){
		 	 that = this;
             that.search();
             that.isChangeWidth();
		 },
		 search:function(){
		 	 var com=function(event){
		 	  	event.preventDefault();
	            var val=$(".search input").val();
	    	    window.location.href="/admin/company/index/s/"+val;
		 	 }
             $("#search").click(function(){
             	com(event);
             })
             document.onkeydown=function(event){
		 	    var e = event || window.event || arguments.callee.caller.arguments[0];　　
	               if(e && e.keyCode==13){ // enter 键
       		 	  	com(event);
	               }
		 	 }; 
		 },
		 isChangeWidth:function(){
		    var isWidth=$(".isWidth").css("width");
		    var zs=parseInt(isWidth);
		    if(zs>200){
		        $(".isWidth").css("width","200px");
		    }
		 },

	}
	customerIndex.init();
})