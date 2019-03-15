$(function(){
	var repair={
		 init:function(){
		 	 that = this;
		 	 that.getYear();
		 	 that.repair();
		 },
		 repair:function(){
		 	  var startMonth,endMonth,canbaotType,status;
		 	  var month=function(){
		 	  	  startMonth=$("#startMonth").find("option:selected").val();
	              endMonth=$("#endMonth").find("option:selected").val();
	              canbaotType=$("#canbaotType").find("option:selected").val();
		 	  }
		 	  var com=function(){
	              month();
	              status=$("#selStatus").find("option:selected").val();
         	      window.location.href="/dsb/repair/index/type/"+canbaotType+"/status/"+status+"/begin_month/"+startMonth+"/end_month/"+endMonth+".html";
		 	  }
		 	  var com1=function(event){
		 	  	  event.preventDefault();
	              var searchCard=$("#searchCard").find("input").val();
         	      window.location.href="/dsb/repair/index/s/"+searchCard+".html";
		 	  }
		 	  
		 	  $("#canbaotType").on("change",function(){
	              com();
              });

              $("#startMonth").on("change",function(){
              	  month();

              	  if(startMonth=='0' || startMonth=='0'){
                      $("#endMonth").find("option[value="+startMonth+"]").attr("selected","selected");
              	  }else if (startMonth>endMonth) {
                      $("#endMonth").find("option[value="+startMonth+"]").attr("selected","selected");
              	  }
              	  
	              com();
              });
              $("#endMonth").on("change",function(){
	             
              	  month();
              	  if(endMonth=='0' || startMonth=='0'){
            	  	  $("#startMonth").find("option[value="+endMonth+"]").attr("selected","selected");
            	  }else if (startMonth>endMonth) {
                      $("#startMonth").find("option[value="+endMonth+"]").attr("selected","selected");
              	  }
              	  com();
              });
              $("#searchCard>span").click(function(){
  	              com1(event);
              });
              $("#selStatus").on("change",function(){
              	 com();
  	             
              });
    
             

              document.onkeydown=function(event){
		 	    var e = event || window.event || arguments.callee.caller.arguments[0];　　
	               if(e && e.keyCode==13){ // enter 键
       		 	  	com1(event);
	               }
		 	  }; 
              
              $("#daochu").click(function(){
              	month();
              	var searchCard=$("#searchCard").find("input").val();
              	window.location.href="/dsb/repair/index/type/"+canbaotType+"/begin_month/"+startMonth+"/end_month/"+endMonth+"/dd/1.html";
              })
		 	 
		 },
		 getYear:function(){
		 	var ymonth=$("#startMonth").data("begin");
		 	var nmonth=$("#endMonth").data("begin");
		 	// console.log(ymonth);
		 	// console.log(nmonth);
		 	var date=new Date();
		 	var year=date.getFullYear();
		 	var nowMonth=date.getMonth()+1;
		 	if (nowMonth<10) {
		 		nowMonth="0"+nowMonth;
		 	}
		 	var month=['01','02','03','04','05','06','07','08','09','10','11','12'];
		 	var nowym=year+''+nowMonth;
		 	var lastYear=year-1;
		 	var uponYear=year+1;
		 	var arr=[],arr1=[];
		 	for (var i = 0; i < month.length; i++) {
		 		arr.push(year+month[i]);
		 		arr1.push(lastYear+month[i]);
		 	}

		 	var index=month.indexOf(nowMonth+'');

		 	var len=month.length-1;
		 	arr.splice(index+1,len);

		 	var salaryMonth=arr1.concat(arr);
		 	var str="<option value='0'>不限</option>",str1="<option value='0'>不限</option>";
		 	for (var i = 0; i < salaryMonth.length; i++) {
		 		//如果有val值
		 		if (salaryMonth[i]==ymonth) {
	                str+='<option value="'+salaryMonth[i]+'" selected>'+salaryMonth[i].substring(0,4)+'年'+salaryMonth[i].substring(4)+'月</option>';
		 		}else{
		 		    str+='<option value="'+salaryMonth[i]+'">'+salaryMonth[i].substring(0,4)+'年'+salaryMonth[i].substring(4)+'月</option>';
		 	    }
		 		
		 	}
		 	for (var i = 0; i < salaryMonth.length; i++) {
		 		//如果有val值
		 		if(salaryMonth[i]==nmonth){
		 			str1+='<option value="'+salaryMonth[i]+'" selected>'+salaryMonth[i].substring(0,4)+'年'+salaryMonth[i].substring(4)+'月</option>';
		 		}else{
		 		    str1+='<option value="'+salaryMonth[i]+'">'+salaryMonth[i].substring(0,4)+'年'+salaryMonth[i].substring(4)+'月</option>';
		 	    }
		 		
		 	}
		 	$("#startMonth").html(str);
		 	$("#endMonth").html(str1);
		 },
	}
	repair.init();
})