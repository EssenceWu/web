$(function(){
	var infoCompany={
		 init:function(){
		 	 that = this;
             that.start();
      
		 },
		 start:function(){
             $("#changeTel").click(function(){
             	$("#telPopup").addClass("show-popup");
             });
             $("#confirmPopup").click(function(){
             	$("#telPopup").removeClass("show-popup");
             });

             $("#companyCard").on("change",function(){
                  index=$(this);
                  that.upload(index);
             });
             var $name=$("#name");
             var $address=$("#address");
             var $real_name=$("#real_name");
             var $telphone=$("#telphone");
             var $uploadImg=$("#uploadImg");
             var status=$("#status").val();
             if(status=='2'){
                $name.attr("disabled","disabled"); 
                $address.attr("disabled","disabled"); 
                $real_name.attr("disabled","disabled"); 
                $telphone.attr("disabled","disabled"); 
                $("#companyCard").attr("disabled","disabled"); 
                $("#sbumitInfo").attr("disabled","disabled"); 
                // $(".salary-tip span").addClass("s-red");
             }
             $("#sbumitInfo").click(function(){
             	var name=$name.val();
             	var address=$address.val();
             	var real_name=$real_name.val();
             	var telphone=$telphone.val();
             	var uploadImg=$uploadImg.attr("src");
             	if(!ifNotNull(name)){
             		popup({txt:"公司名称不能为空！"});
             	}else if(!ifNotNull(address)){
             		popup({txt:"公司地址不能为空！"});
             	}else if(!ifNotNull(real_name)){
             		popup({txt:"联系人不能为空！"});
             	}else if(!ifNotNull(telphone)){
             		popup({txt:"联系方式不能为空！"});
             	}else if(uploadImg=='/static/bootstrap/images/zhizhao2.png'){
             		popup({txt:"请上传营业执照！"});
             	}else{
             		$("#upload_form").submit();
             	}
             });
		 },
		 upload:function(index){
		     var $this=index;
		     var filePath=$this.val();
		     var fileData =$this[0].files[0];
		     var Max_Size = 2; //2M
		     $this.attr('name','image');

		      var size = fileData.size;   //注意，这里读到的是字节数
		      console.log(fileData)
              var isAllow = false;
              if(!size) isAllow = false;
  
              var maxSize = Max_Size;
              maxSize = maxSize * 1024* 1024;   //转化为字节
              isAllow = size <= maxSize;
               if(filePath==""){
               	 popup({txt:"请上传图片！"});
               }else if(!/\.(jpg|jpeg|pdf|png|JPG|PNG|PDF)$/.test(filePath)){
                 popup({txt:"请上传正确的图片格式！"});
               }else if(!isAllow){
               	 popup({txt:"请上传2MB以内的图片！"});
               }else{
		         var arr=filePath.split('\\');
		         var fileName=arr[arr.length-1];
		         var formData= new FormData($("#upload_form")[0]);  
		            $.ajax({    
		              url:'/dsb/company/upload.html',
		              type:'POST',  
		              data:formData, 
		              processData: false,
		              contentType: false,  
		              xhr: function() {
		              　　　　var xhr = $.ajaxSettings.xhr();
		              　　　　if (xhr.upload) {
		              　　　　　　xhr.upload.onprogress = function(progress) {
		                              if (progress.lengthComputable) {
		                                 var loaded=progress.loaded;
		                                 var total=progress.total;
		                                 var per = Math.floor(100*loaded/total);      //已经上传的百分比
		                                 if (per=='100') {
		                                   popup({txt:"上传成功！",hd_style:"style='display: none;'",btn_style:"style='display: none;'"});
		                                   $('#popup_pub').hide();
		                                 }else{
		                                   popup({txt:"已上传"+per+"%",hd_style:"style='display: none;'",btn_style:"style='display: none;'" });
		                                 }  
		                                 
		                              }
		                          };
		                          xhr.upload.onloadstart = function() {
		                              console.log('started...');
		                          };
		               　　　 }
		                        return xhr;
		              }
		              }).done(function(res) {
		              	var data=JSON.parse(res);
		                     if(data.code == 200){
		                         $this.next('img').attr("src",data.data.url);
		                      }else{
		                         popup({txt:data.msg});
		                      }
		              }).fail(function(err) {
		                   popup({txt:"抱歉，系统发生错误"});
		              });
		       }
		 },

	}
	infoCompany.init();
})