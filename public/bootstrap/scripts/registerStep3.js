$(function(){
	var registerStep3={
		 init:function(){
		 	 that = this;
		 	 that.start();
       that.register();
		 },
		 start:function(){

        $("#license").change(function(){
           var $file = $(this);
           var fileObj = $file[0];
          
           var windowURL = window.URL || window.webkitURL;
           var dataURL;
           var $img = $("#ImgPr");
           if(fileObj && fileObj.files && fileObj.files[0]){
             var file = fileObj.files[0]; 
             if(!/image\/\w+/.test(file.type)){ 
                 popup({txt:"文件必须为图片!"});
                 return false; 
             }
             //在此限制图片的大小
             var imgSize = file.size;
              //35160  计算机存储数据最为常用的单位是字节(B)
              //在此处我们限制图片大小为2M
             if(imgSize>2*1024*1024){
              popup({txt:"上传的图片的大于2M,请重新选择!"});
              $file.val('');
              return false;
             }

             dataURL = windowURL.createObjectURL(fileObj.files[0]);
             $img.attr('src',dataURL);
           }else{
             dataURL = $file.val();
             var imgObj = document.getElementById("ImgPr");
             imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
             imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;  
           }
        })
            
		 },
     register:function(){
      var myreg3=/^([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      var myreg1=/^[\u4e00-\u9fa5]+$/;
      var myreg2 = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;  
      var $tip = $("#tip-1");
      var $tip2 = $("#tip-2");
      var $tip3 = $("#tip-3");
      var $tip4 = $("#tip-4");
      var $tip5 = $("#tip-5");
         $("#register").click(function(){
              var formData = new FormData($("#form")[0]);
              var real_name=$.trim($("#real_name").val());
              var telphone=$.trim($("#telphone").val());
              var email=$.trim($("#email").val());
              var name=$.trim($("#name").val());
              var address=$.trim($("#address").val());
              var ImgPr=$("#ImgPr").attr("src");


          
              if (!real_name.match(myreg1)) { 
                   $tip.fadeIn();
                   return false;
                 }else if (!telphone.match(myreg2)) {
                   $tip.fadeOut();
                   $tip2.fadeIn();
                   return false;
                 }else if (!email.match(myreg3)) {
                   $tip2.fadeOut();
                   $tip3.fadeIn();
                   return false;
                 }else if (!ifNotNull(name)) {
                   $tip3.fadeOut();
                   $tip4.fadeIn();
                   return false;
                 }else if (!ifNotNull(address)) {
                   $tip4.fadeOut();
                   $tip5.fadeIn();
                   return false;
                 }else if (ImgPr=='/static/bootstrap/images/zhizhao3.png') {
                   $tip5.fadeOut();
                   popup({txt:"请上传营业执照！"});
                   return false;
                 }else{
                   $tip5.fadeOut();

                   $.ajax({
                       url:"/dsb/user/step3",
                       type:"post",
                       data:formData,
                       dataType: 'JSON',
                       cache: false,       
                       processData:false,
                       contentType:false,
                       success:function(data){
                          //popup({txt:data});
                          //window.location.href="/dsb/user/login.html";
                          if (data.code == "200") {
                            popup({txt:"注册成功！"},function(){
                               window.location.href="/dsb/user/login.html";
                            });
                          }else{
                             popup({txt:data.msg});
                          }
                       },
                       error:function(e){
                          popup({txt:"错误！！"});
                       }
                   });   
                 } 

         })

          $("#real_name").blur(function(){ 
              var real_name = $.trim($("#real_name").val());
              if (real_name.match(myreg1)) {
                $tip.fadeOut();
              } 
          });
          $("#telphone").blur(function(){ 
              var telphone = $.trim($("#telphone").val());
              if (telphone.match(myreg2)) {
                $tip2.fadeOut();
              } 
          });
          $("#email").blur(function(){ 
              var email = $.trim($("#email").val());
              if (email.match(myreg3)) {
                $tip3.fadeOut();
              } 
          });
          $("#name").blur(function(){ 
              var name = $.trim($("#name").val());
              if (ifNotNull(name)) {
                $tip4.fadeOut();
              } 
          });
          $("#address").blur(function(){ 
              var address = $.trim($("#address").val());
              if (ifNotNull(address)) {
                $tip5.fadeOut();
              } 
          });

     },
	}
	registerStep3.init();
})