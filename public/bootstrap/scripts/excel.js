$(function(){
	var excel={
		 init:function(){
		 	 that = this;
		 	 that.start();
		 	 that.getCity();
		 },
		 start:function(){
		 	  $("#sbumitExcel").on("change",function(){
        
	                var file = document.forms[0].excel.value;  
	                if (file == null||file == ""){  
	                     popup({txt:"请选择要上传的文件！"});
	                     return false;  
	                }  
	                if (file.lastIndexOf('.')==-1){    //如果不存在"."    
	                    popup({txt:"路径不正确！"});
	                    return false;  
	                }  
	                var AllImgExt=".xls|.xlsx|";  
	                var extName = file.substring(file.lastIndexOf(".")).toLowerCase();//（把路径中的所有字母全部转换为小写）          
	                if(AllImgExt.indexOf(extName+"|")==-1)          
	                {  
	                    ErrMsg="该文件类型不允许上传。请上传 "+AllImgExt+" 类型的文件，当前文件类型为"+extName;  
	                    popup({txt:ErrMsg});
	                    return false;  
	                }  
	                showLoading();
	                document.forms[0].submit();  
            	 //$(".form").submit();
            	  
              });
              // $("#confirmDaoru").click(function(){
              //    $(".form").submit();
              // });
		 },
		 getCity:function(){
		 	// $(".city").click(function  () {
		 	// 	var code= $(".title span").eq(1).data("code");
		 	//     $("#city_id").attr("value",code);
		 	// })
		 	var com=function(address,ctype,status){
              var $cityPopup=$("#cityPopup");
              $cityPopup.addClass("show-popup");
              $("#citySelect").on("change",function(){
              	var city_id=$(this).find("option:selected").val();
              	var city_name=$(this).find("option:selected").text();
              	if(ifNotNull(city_id)){
              		
                    window.location.href="/dsb/"+address+"/download/city_id/"+city_id+"/city_name/"+city_name+"/v/"+ctype+"/status/"+status+".html";
                    $cityPopup.removeClass("show-popup");
                    $("#city").text(city_name);
              	}                 	
              })
              $(document).mouseup(function(e){
	                 var _con = $('.city-popup');   // 设置目标区域
	                 if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
	                   $("#cityPopup").removeClass("show-popup");
	                 }
              });
		 	}
		 	$(".download").click(function(e){
                 e.stopPropagation(); 
                 var ctype=$(this).data("ctype");
                 var status=$(this).data("status");
                 com('security',ctype,status);     
		 		// var $city_id=$(".title span").eq(1).data("code");
		 		// console.log($city_id)
		 		// if(!ifNotNull($city_id)){
		 		// 	popup({txt:"请先选择城市！"});
		 		// }else{
		 		// 	$("#download").attr("href","/dsb/security/download/security.html/city_id/"+$city_id);
		 		// }
		 	})
		 	$(".add_download").click(function(e){
               e.stopPropagation(); 
               var ctype=$(this).data("ctype");
               com('repair',ctype); 
		 	})
		 }
	}
	excel.init();
})