$(function(){
	var servicer={
		 init:function(){
		 	 that = this;
             that.start();
             that.editChange();
             that.isChangeWidth();
		 },
		 start:function(){
            $("#search").click(function(){
              var val=$(this).parent(".search").find("input").val();
            
               window.location.href="/admin/servicer/index/s/"+val;
            })
            $(".removeService").click(function(){
               var id=$(this).data("id");
               var status=$(this).data("status");
               var text=$(this).text();
               popup({txt:"确认"+text+"对应供应商吗？",btn:2},function(){
                    $.ajax({
                     type: "post",
                     url: "/admin/servicer/edit",
                     data: {id:id,status:status},
                     dataType: "json",
                     success: function (data) {
                         if (data.code == "200") {
                            location.reload();
                         } else{
                            popup({txt:data.msg});
                         }
                     },
                     error: function () {
                         popup({txt:"抱歉，系统发生错误！"});
                     }
                    });
               });
            })    
		 },
		 editChange:function(){
            var $name=$("#name");
            var $real_name=$("#real_name");
            var $telphone=$("#telphone");
            var $email=$("#email");
            var id;
		 	$(".editChange").click(function(){ 
                var $td=$(this).parents("tr").find("td")
                var name=$td.eq(0).find("a").text();
                var real_name=$td.eq(1).text();
                var tel=$td.eq(2).text();
                var email=$td.eq(3).text();
                $name.val(name);
                $real_name.val(real_name);
                $telphone.val(tel);
                $email.val(email);
                id=$(this).data("id");
                $("#editStatus").addClass("show-popup");

		 	});
            $(".offPopup").click(function(){
                $("#editStatus").removeClass("show-popup");
            });
            
            $("#confirmEdit").click(function(){
                var name=$name.val();
                var real_name=$real_name.val();
                var telphone=$telphone.val();
                var email=$email.val();
                $.ajax({
                 type: "post",
                 url: "/admin/servicer/edit",
                 data: {id:id,name:name,real_name:real_name,telphone:telphone,email:email},
                 dataType: "json",
                 success: function (data) {
                     if (data.code == "200") {
                        location.reload();
                     } else{
                        popup({txt:data.msg});
                     }
                 },
                 error: function () {
                     popup({txt:"抱歉，系统发生错误！"});
                 }
                });
            });
            
		 	
		 },
         isChangeWidth:function(){
            var isWidth=$(".isWidth").css("width");
            var zs=parseInt(isWidth);
            if(zs>200){
                $(".isWidth").css("width","200px");
            }
         },

	}
	servicer.init();
})