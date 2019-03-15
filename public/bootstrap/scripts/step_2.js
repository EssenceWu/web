$(function(){
	//多选框选择
    var gongzitiaoArr=[];    
	var step2={
		 init:function(){
		 	 that = this;
             that.moreCheck();
             that.addSelect();//增加execl条件
             that.execlList();//execl模板渲染
             that.download();//下载模板
             that.importSalary();//导入工资表
             that.ajaxTipe();
		 },
		 ajaxTipe:function(){
		 	var val,lurl,params;
		 	$("#warm_remind").blur(function(){
		 		val=$(this).val();
		 		lurl='/dsb/CompanySalaryTemplet/warmPromptAjax';
		 		params={warm_prompt:val};
		 		comAjax(lurl,params);
		 	});
		 	$("#short_message").blur(function(){
		 		val=$(this).val();
		 		lurl='/dsb/CompanySalaryTemplet/shortMessage';
		 		params={short_message:val};
		 		comAjax(lurl,params);
		 	});
		 	$("#mail_title").blur(function(){
		 		val=$(this).val();
		 		lurl='/dsb/CompanySalaryTemplet/mailTitle';
		 		params={mail_title:val};
		 		comAjax(lurl,params);
		 	});

		 	var comAjax=function(lurl,params){
		 		$.ajax({
 		      	  type: "post",
 		      	  url: lurl,
 		      	  data: params,
 		      	  dataType: "json",
 		      	  success: function (data) {
 		      	  	 // popup({txt:data.msg});
 		      	  },
 		      	  error: function () {
 		      	      popup({txt:"抱歉，系统发生错误"});
 		      	  }
 		      	});
		 	}

		 },
		 moreCheck:function(){
           $(".isCheck").click(function (ev){
              var $this=$(this);
              var ev = ev || window.event;
              var target = ev.target || ev.srcElement;
              var targety =target.nodeName.toLowerCase();
              var $target=$(target);
              var index;
              if (targety== 'em') {
                   index=$target.parent('span').index();
              }else if(targety== 'input'){
                   index=$target.parents('span').index();
              }else if(targety== 'i'){
                   index=$target.parent('span').index();
              }
              var mb=$this.find('span').eq(index);
              that.comCheck(mb);
           }); 
		 },
		 comCheck:function(_this){
		 	  var  $this=_this.find("i");
              var  disable=$this.hasClass("dis-check");
               //非多选框才可以选择
               if (!disable) {
               	 var  isCheck=$this.hasClass("on_check");
               	 var  txt=$this.siblings("em").text();
               	 if (!isCheck) {
               	   $this.addClass("on_check");
               	   if (ifNotNull(txt)) {
               	   //选中增加execl中name
               	   $("#moveList").append("<li>"+txt+"</li>");
               	   }
               	 }else{
               	   $this.removeClass("on_check");
               	   //去掉增加execl中name
               	   var $moveList=$("#moveList li");
               	   var nameLen=$moveList.length;
               	   for (var i = 0; i < nameLen; i++) {
               	   	 var itxt=$moveList.eq(i).text();
               	   	 if (itxt==txt) {
                       $moveList.eq(i).remove();
               	   	 }
               	   }
               	   
               	 }
               }
		 },
		 addSelect:function(){
			//已选择的自定义项目添加到数组中
			var $addSpecial=$("#addSpecial span");
			var len=$addSpecial.length;
	        for (var i = 0; i < len; i++) {
	          var txt=$addSpecial.eq(i).find('em').text();
	          gongzitiaoArr.push(txt);
	        }
            //基本信息选项不能再手动添加
            var $noCheck=$("#noCheck span");
	        var len1=$noCheck.length;
	        var arr1=[];
	        var tx;
	        for (var j = 0; j < len1; j++) {
	          tx=$noCheck.eq(j).find("i").attr("class");
	          if(!ifNotNull(tx)){
	          var tx1=$noCheck.eq(j).find("em").text();
	          arr1.push(tx1)
	          }
	        }

	        //工资项目选项不能再手动添加
            var $noCheck2=$("#noCheck1 span");
	        var len2=$noCheck2.length;
	        var arr2=[];
	        var tx1;
	        for (var j = 0; j < len2; j++) {
	          tx1=$noCheck2.eq(j).find("i").attr("class");
	          if(!ifNotNull(tx1)){
	          var tx2=$noCheck2.eq(j).find("em").text();
	          arr2.push(tx2)
	          }
	        }

		 	$("#addSelect").on("click", function(){
		 		var $addName=$("#addName");
		 		var addName=$addName.val();
		 		var str="";
		 		if(arr1.indexOf(addName)!=-1){
                   popup({txt:"抱歉，基本信息已包含所选项目！"}); 
                   $addName.val("");
		 		}else if(arr2.indexOf(addName)!=-1){
                   popup({txt:"抱歉，工资项目已包含所选项目！"}); 
                   $addName.val("");
		 		}else if(ifNotNull(addName)) {
	 		      str='<span><i><input type="checkbox" /></i><em>'+addName+'</em></span>';
	 		      if (gongzitiaoArr.indexOf(addName)!=-1 ) {
	 		      	popup({txt:"抱歉，不能重复添加相同的项目！"});
	 		      }else{
	 		      	$.ajax({
	 		      	  type: "post",
	 		      	  url: "/dsb/CompanySalaryTemplet/labelAddAjax",
	 		      	  data: {special_label:addName},
	 		      	  dataType: "json",
	 		      	  success: function (data) {
	 		      	  	if (data.code == "0") {
   		 	               popup({txt:"抱歉，当前批次最多只能添加20个工资项目！"});
   		 	               $addName.val("");
   		 	            }else{
   		 	               gongzitiaoArr.push(addName);
   		 	               $("#addSpecial").append(str); 
   		 	               $addName.val("");
   		 	            }
	 		      	  },
	 		      	  error: function () {
	 		      	      popup({txt:"抱歉，系统发生错误！"});
	 		      	  }
	 		      	});
	 		      }
	 		    }
		 	});
		 },
		 execlList:function(){
            //execl模板渲染
	         var len=$(".isCheck span").length;
	         var $disCheck=$(".isCheck span");
	         var arr=[],str="",str1="";
	         for (var i = 0; i < len; i++) {
	         	var isCheck=$disCheck.eq(i).find("i").hasClass("dis-check");
	         	if (isCheck) {
	         		var txt=$disCheck.eq(i).find("em").text();
                    str+='<li class="gary">'+txt+'</li>';
	         	}
	         }
	         for (var i = 0; i < len; i++) {
	         	var isCheck=$disCheck.eq(i).find("i").hasClass("on_check");
	         	if (isCheck) {
	         		var txt=$disCheck.eq(i).find("em").text();
                    str1+='<li>'+txt+'</li>';
	         	}
	         }
	         $("#nameList").html(str+'<ol id="moveList" class="connectedSortable">'+str1+'</ol>');
	         // Sortable.create(nameList);
	         // Sortable.create(moveList);
	         new Sortable(document.getElementById('nameList'), {
                 group: ".connectedSortable",
                 handle: ".connectedSortable"
             });
             new Sortable(document.getElementById('moveList'), {
                 group: ".connectedSortable",
                 handle: ".connectedSortable"
             });
	         // $( "#nameList, #moveList" ).sortable({
	         //       connectWith: ".connectedSortable"
	         //  }).disableSelection();
		 },
		 download:function(){
           $(".download").on("click", function(){
           	var text=$(this).text();
           	var type_excle;
		 	var $li=$("#nameList li");
		 	var len=$li.length;
		 	var arr=[];
		 	for (var i = 0; i < len; i++) {
		 		arr.push($li.eq(i).text());
		 	}
		 	var encode=encodeURI(arr.toString())
		 	if(text=='下载2003版'){
		 		type_excle=2003;
		 	}else{
		 		type_excle=2007;
		 	}
		 	var url = '/dsb/CompanySalaryTemplet/ExcleOut/data_excle/'+encode+'/$type_excle/'+type_excle;
		 	window.location.href = url;
		   });
		 },
		 importSalary:function(){
           $("#importSalary").on("change",function(){
           	 var file = document.forms[0].file_excle.value;  
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
           	 document.forms[0].submit();  

           	 //$(".form-signin").submit();
           	 
           });
      
		 },
		 
	}
	step2.init();
})