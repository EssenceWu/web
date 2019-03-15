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
		 		lurl='/Salary/CompanySalaryTemplet/warmPromptAjax';
		 		params={warm_prompt:val};
		 		comAjax(lurl,params);
		 	});
		 	$("#short_message").blur(function(){
		 		val=$(this).val();
		 		lurl='/Salary/CompanySalaryTemplet/shortMessage';
		 		params={short_message:val};
		 		comAjax(lurl,params);
		 	});
		 	$("#mail_title").blur(function(){
		 		val=$(this).val();
		 		lurl='/Salary/CompanySalaryTemplet/mailTitle';
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
			var len=$("#addSpecial span").length;
	        for (var i = 0; i < len; i++) {
	          var txt=$("#addSpecial span").eq(i).find('em').text();
	          gongzitiaoArr.push(txt);
	        }
		 	$("#addSelect").on("click", function(){
		 		var addName=$("#addName").val();
		 		var str="";
	 			if (ifNotNull(addName)) {
	 		      str='<span><i><input type="checkbox" /></i><em>'+addName+'</em></span>';
	 		      if (gongzitiaoArr.indexOf(addName)!=-1) {
	 		      	popup({txt:"抱歉，不能重复添加相同的项目！"});
	 		      }else{
	 		      	gongzitiaoArr.push(addName);
	 		      	$("#addSpecial").append(str); 
	 		      	$("#addName").val("");
	 		      	$.ajax({
	 		      	  type: "post",
	 		      	  url: "/Salary/CompanySalaryTemplet/labelAddAjax",
	 		      	  data: {special_label:addName},
	 		      	  dataType: "json",
	 		      	  success: function (data) {
	 		      	  },
	 		      	  error: function () {
	 		      	      popup({txt:"抱歉，系统发生错误"});
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
	         var arr=[],str="";
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
                    str+='<li>'+txt+'</li>';
	         	}
	         }
	         $("#nameList").html(str+'<ol id="moveList"></ol>');
	         Sortable.create(moveList);
		 },
		 download:function(){
           $("#download").on("click", function(){
		 	var $li=$("#nameList li");
		 	var len=$li.length;
		 	var arr=[];
		 	for (var i = 0; i < len; i++) {
		 		arr.push($li.eq(i).text());
		 	}
		 	var encode=encodeURI(arr.toString())
		 	//console.log(encode)
		 	var url = '/Salary/CompanySalaryTemplet/ExcleOut/data_excle/'+encode;
		 	window.location.href = url;
		   });
		 },
		 importSalary:function(){
           $("#importSalary").on("change",function(){
           	 $(".form-signin").submit();
           	 $("#importSalary").on("change",function(){
           	 	$(".form-signin").submit();
             });
           });
      
		 },
		 
	}
	step2.init();
})