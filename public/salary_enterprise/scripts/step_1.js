$(function(){
	var step1={
		 init:function(){
		 	 that = this;
             that.sendType();//发送方式选择
             that.selectMonth();
		 },
		 sendType:function(){
	            $(".send-type span").click(function() { 
	               var $this=$(this); 
	               $this.find('i').addClass('on_check');
	               $this.find('i input').prop('checked','true'); 
	               $this.siblings().find('i').removeClass("on_check")
	               //$this.siblings().find('i input').prop('checked','false'); 
	            }); 
		 },
		 selectMonth:function(){
		 	var ymonth=$("#month").data("val");
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
		 	var arr=[],arr1=[],arr2=[];
		 	for (var i = 0; i < month.length; i++) {
		 		arr.push(year+month[i]);
		 		arr1.push(lastYear+month[i]);
		 		arr2.push(uponYear+month[i]);
		 		
		 	}
		 	arr1.splice(0,6);
		 	arr2.splice(6,11);

		 	var arr3=arr1.concat(arr);
            var salaryMonth=arr3.concat(arr2);
		 	var str="";
		 	for (var i = 0; i < salaryMonth.length; i++) {
		 		if (ifNotNull(ymonth)) {
		 			if (salaryMonth[i]==ymonth) {
	                  str+='<option value="'+salaryMonth[i]+'" selected>'+salaryMonth[i].substring(0,4)+'年'+salaryMonth[i].substring(4)+'月</option>';
	                  ++i;
			 		}
		 		}else if(salaryMonth[i]===nowym) {
                    str+='<option value="'+salaryMonth[i]+'" selected>'+salaryMonth[i].substring(0,4)+'年'+salaryMonth[i].substring(4)+'月</option>';
                    ++i;
		 		}
		 		str+='<option value="'+salaryMonth[i]+'">'+salaryMonth[i].substring(0,4)+'年'+salaryMonth[i].substring(4)+'月</option>';
		 		
		 		
		 	}

		 	$('#month').html(str);
		 },
	}
	step1.init();
})