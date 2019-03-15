$(function(){
	var add_lists={
		 init:function(){
		 	 that = this;
             that.start();
             that.oper_sbumit();
             that.remark();
             that.getYear();
		 },
		 start:function(){
             var $begin_month=$("#startMonth");
             var $end_month=$("#endMonth");
             var $bujiaoType=$("#bujiaoType");
             var id,val;
             function com(){
                id=$bujiaoType.data("id");
                val=$bujiaoType.find("option:selected").val();
             }
             $bujiaoType.change(function(){
                com();
                window.location.href='/admin/customer/lists/id/'+id+'/add/'+val+'/type/1/status/1.html';
             });
             $begin_month.change(function(){
                var begin_month=$(this).find("option:selected").val();
                com();
                window.location.href='/admin/customer/lists/id/'+id+'/add/'+val+'/type/1/status/1/begin_month/'+begin_month+'.html';
             });
             $end_month.change(function(){
                var begin_month=$begin_month.find("option:selected").val();
                var end_month=$(this).find("option:selected").val();
                com();
                window.location.href='/admin/customer/lists/id/'+id+'/add/'+val+'/type/1/status/1/begin_month/'+begin_month+'/end_month/'+end_month+'.html';
             });
             
             $("#serach").click(function(){
                var txt=$(".bill-serach").find("input").val();
                com();
                var begin_month=$begin_month.find("option:selected").val();
                var end_month=$end_month.find("option:selected").val();
                window.location.href='/admin/customer/lists/id/'+id+'/add/'+val+'/begin_month/'+begin_month+'/end_month/'+end_month+'/type/1/status/1/s/'+txt+'.html';
             });

             var remark=$(".s-remark");
             var iscont;
             for (var i = 0,len=remark.length; i < len; i++) {
                 iscont=remark.eq(i).data("content");
                 if (ifNotNull(iscont)) {
                    remark.eq(i).find(".remark").text("查看");
                 }else{
                    remark.eq(i).find(".remark").text("备注");
                 }
             }
		 },
         oper_sbumit:function(){
            $('.master.checkbox')
              .checkbox({
                // check all children
                onChecked: function() {
                  var $childCheckbox  = $(this).closest('.checkbox').parents('.tabel').find('.all_checkbox');
                  $childCheckbox.checkbox('check');
                  
                  
                },
                // uncheck all children
                onUnchecked: function() {
                  var $childCheckbox  = $(this).closest('.checkbox').parents('.tabel').find('.all_checkbox');
                  $childCheckbox.checkbox('uncheck');
                }
              });

            $(".caozuo_btn span").click(function(){
                var status=$(this).data("status");
                var len=$(".shebao_table tr").length;
                var res="";
                for (var i = 0; i < len; i++) {
                    var table_item=$(".shebao_table tr").eq(i).find(".all_checkbox");
                    var ischeck=table_item.hasClass("checked");
                    if (ischeck) {
                        var id=table_item.data("id")+",";
                        res+=id;
                    }
                   
                }
                var rlen=res.length-1;
                var res1=res.substring(0,rlen);
                // if (!ifNotNull(res)) {
                //     popup({txt:"请选择操作人！"});
                // }
                    var new_url=cust_url;
                    window.location.href=new_url+'status/'+status+'/ids/'+res1+'.html';
            });
            
         },
         remark:function(){
             var status,ids,linkman,content,extra;
             var com=function(that1){
                var s_blue=that1.parent(".s-remark");
                status=s_blue.data("status");
                ids=s_blue.data("id");
                linkman=s_blue.data("linkman");
                content=s_blue.data("content");
                extra=s_blue.data("extra");
                if(ifNotNull(linkman)){
                  $("#linkman").val(linkman);
                }else{
                  $("#linkman").val("");  
                }
                if(ifNotNull(content)){
                  $("#content").val(content);
                }else{
                  $("#content").val("");  
                }
                if(ifNotNull(extra)){
                  $("#extra").val(extra);
                }else{
                  $("#extra").val("");  
                }

             }
             $(".remark").click(function(){
                $(".remark-popup").addClass("show-popup");
                var that1=$(this);
                com(that1);
                var remark_url=cust_url+'status/'+status+'/ids/'+ids;
                that.remarkConfirm(remark_url);
             });
             $(".icon-guanbi").click(function(){
                $(".loading_line").removeClass("show-popup");
             });
             $(".overdue").click(function(){
                $(".overdue-popup").addClass("show-popup");
                var that1=$(this);
                com(that1);
                var remark_url=cust_url+'status/'+status+'/ids/'+ids;
                that.overdueConfirm(remark_url);
             });
             
             
         },
         remarkConfirm:function(remark_url){
             $("#remarkConfirm").click(function(){
                var linkman=$("#linkman").val();
                var content=$("#content").val();
                window.location.href=remark_url+'/linkman/'+linkman+'/content/'+content+'.html';
             });
         },
         overdueConfirm:function(remark_url){
             $("#overdueConfirm").click(function(){
                var extra=$("#extra").val();
                window.location.href=remark_url+'/extra/'+extra+'.html';
             });
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
         }
		
	}
	add_lists.init();
})