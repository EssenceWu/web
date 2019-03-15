$(function(){
	var at={
		 init:function(){
		 	 that = this;
       that.lookupDetail();
		 },
		 lookupDetail:function(){ 
		 	 var $excelPopup=$("#excelPopup");
		 	 $("#hidePopup").click(function(){
		 	 	$excelPopup.removeClass("show-popup");
		 	 })
             $(".lookupDetail").click(function(){
               var cityid=$(this).data("cityid");
               var month=$(this).data("month");
               var name=$(this).data("name");
               caption=name+month;
               $.ajax({
                  type: "post",
                  url: "/dsb/account/get_at_list",
                  data: {city_id:cityid,month:month},
                  dataType: "json",
                  success: function (data) {
                      if (data.code == "200") {
                       // window.location.href=data.data.url;
                         that.infoList(data.data,caption);
                      }else{
                         popup({txt:data.msg});
                      }
                  },
                  error: function () {
                          popup({txt:"抱歉，系统发生错误"});
                  }
               });
           //   	var phoneNum=$.trim($("#tel").val());
           //   	var yzm=$.trim($("#yzm").val());
     
           //      var $tip = $("#tip-1");
           //      var $tip2 = $("#tip-2");
           //   	if (!phoneNum.match(myreg)) { 
           //         $tip.fadeIn();
           //         return false;
           //       }else if (!yzm.match(/^\d{6}$/)) {
           //         $tip.fadeOut();
		         //   $tip2.fadeIn();
		         //   return false;
		         // }else{
		         //   $tip2.fadeOut();

   		 	    //  $.ajax({
   		 	    //     type: "post",
   		 	    //     url: "login",
   		 	    //     data: {phone_number:phoneNum,vertifyCode:yzm},
   		 	    //     dataType: "json",
   		 	    //     success: function (data) {
   		 	    //         if (data.code == "200") {
   		 	    //         	window.location.href=data.data.url;
   		 	    //         }else{
   		 	    //            popup({txt:data.msg});
   		 	    //         }
   		 	    //     },
   		 	    //     error: function () {
           //               popup({txt:"抱歉，系统发生错误"});
   		 	    //     }
   		 	    //   });
		         //   //$(".form-signin").submit();
           //       } 

             })
		 },
     infoList:function(data,caption){
        var str="",str1="",str_hd="";
        for (var i = 0,len=data.length; i < len; i++) {
          for (var j = 0,len1=data[i].list.length; j < len1; j++) {
            str1+='<td>'+data[i].list[j].base+'</td><td>'+data[i].list[j].scale_p+'%</td><td>'+data[i].list[j].total_p+'</td><td>'+data[i].list[j].scale_c+'%</td><td>'+data[i].list[j].total_c+'</td>';
          }
          str+='<tr><td>'+data[i].line+'</td><td>'+data[i].name+'</td><td>'+data[i].idcard+'</td><td>'+data[i].month+'</td><td>'+data[i].sb_type+'</td><td>'+data[i].sb_fee_p+'</td><td>'+data[i].sb_fee_c+'</td><td>'+data[i].gg_type+'</td><td>'+data[i].gg_fee_p+'</td><td>'+data[i].gg_fee_c+'</td><td>'+data[i].service_fee+'</td><td>'+data[i].total+'</td>'+str1+'</tr>';
          str1="";
        }
        $("#staffList").html(str);
        var $excelPopup=$("#excelPopup");
        $excelPopup.find("h3").text(caption);
        $excelPopup.addClass("show-popup");
     },
	}
	at.init();
})