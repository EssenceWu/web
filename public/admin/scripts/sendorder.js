$(function(){
	var sendorder={
		 init:function(){
		 	 that = this;
             that.goSbumit();
		 },
		 goSbumit:function(){
             $(".confirm-add").click(function(){
             	//var cid=$.trim($(".cid").val());
                var $citylist=$(".city-xz");
                var len=$citylist.length;
                var json={},arr=[],city_name,servicer_id,money,$com;
                for (var i = 0; i < len; i++) {
                    $com=$citylist.eq(i);
                    id=$com.find(".city_name").data("id");
                    city_id=$com.find(".city_name").data("cityid");
                    servicer_id=$com.find(".servicer_id").find("option:selected").val();
                    money=$com.find(".money").val();
                    json={"id":id,"city_id":city_id,"servicer_id":servicer_id,"service_fee":money};
                    arr.push(json);
                }
                console.log(arr)
                var info=JSON.stringify(arr);
                $.ajax({
                     type: "post",
                     url: "/admin/company/save",
                     data: {data:info},
                     dataType: "json",
                     success: function (data) {
                         if (data.code == "200") {
                             popup({txt:"保存成功！"},function(){
                               window.location.reload();
                             });
                         } else{
                             popup({txt:data.msg});
                         }
                     },
                     error: function () {
                          popup({txt:"抱歉，系统发生错误"});
                     }
                });
                //console.log(cid)
                 // console.log(city_name)
                 // console.log(money.length)
           //      var $tip = $("#tip-1");
           //      var $tip2 = $("#tip-2");
           //   	if (!ifNotNull(name)) {
           //         $tip.fadeIn();
           //         return false;
           //       }else if (!password.match(/[^\u4e00-\u9fa5]/)) {
           //         $tip.fadeOut();
		         //   $tip2.fadeIn();
		         //   return false;
		         // }else{
		         //   $tip2.fadeOut();
           //          $.ajax({
           //           type: "post",
           //           url: "/admin/admin/login",
           //           data: {username:name,password:password},
           //           dataType: "json",
           //           success: function (data) {
           //               if (data.code == "200") {
           //                  window.location.href=data.data.url;
           //               } else{
           //               	layer.msg(data.msg, {icon: 2, time: 1000 });
           //               }
           //           },
           //           error: function () {
           //           	 layer.msg("抱歉，系统发生错误", {icon: 2, time: 1000 });
           //           }
           //          });
           //       } 

             })
		 },

	}
	sendorder.init();
})