$(function(){
	var lists={
		 init:function(){
		 	 that = this;
             that.start();
             that.oper_sbumit();
             that.remark();
		 },
		 start:function(){
             $("#huijiaoType").change(function(){
             	var id=$(this).data("id");
                var val=$(this).find("option:selected").val();
                window.location.href='/admin/company/lists/id/'+id+'/add/'+val+'/type/1/status/1.html';
             });
             $("#serach").click(function(){
                  com(event);
             });

             var com=function(event){
                  event.preventDefault();
                  var txt=$(".bill-serach").find("input").val();
                  var id=$("#serach").data("id");
                  window.location.href='/admin/company/lists/id/'+id+'/s/'+txt+'.html';
              }
              
              document.onkeydown=function(event){
                var e = event || window.event || arguments.callee.caller.arguments[0];　　
                   if(e && e.keyCode==13){ // enter 键
                    com(event);
                   }
              }; 
              

             var remark=$(".remark");
             var iscont;
             for (var i = 0,len=remark.length; i < len; i++) {
                 iscont=remark.eq(i).data("content");
                 if (ifNotNull(iscont)) {
                    remark.eq(i).text("查看");
                 }else{
                    remark.eq(i).text("备注");
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

            $(".caozuo_btn").click(function(){
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
                    var new_url=customer_url;
                   // console.log(new_url+'/ids/'+res1+'.html')
                    window.location.href=new_url+'/ids/'+res1+'.html';
            });
            
         },
         remark:function(){
             $(".remark").click(function(){
                $(".remark-popup").addClass("show-popup");

                var s_blue=$(this);
                var linkman,content;
                linkman=s_blue.data("linkman");
                content=s_blue.data("content");
                var ids=s_blue.data("id");
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


                $("#remarkConfirm").click(function(){
                   linkman=$.trim($("#linkman").val());
                   content=$.trim($("#content").val());
                   // $.ajax({
                   //  type: "get",
                   //  url: customer_url,
                   //  data: {ids:ids,linkman:linkman,content:content},
                   //  dataType: "json",
                   //  success: function (data) {
                       
                   //  },
                   //  error: function () {
                   //      layer.msg("抱歉，系统发生错误", {icon: 2, time: 1000 });
                   //  }
                   // });
                   window.location.href=customer_url+'/ids/'+ids+'/linkman/'+linkman+'/content/'+content+'.html';
                });
             });
             $(".icon-guanbi").click(function(){
                $(".loading_line").removeClass("show-popup");
             });
             
         },
		
	}
	lists.init();
})