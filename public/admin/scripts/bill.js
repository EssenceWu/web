$(function(){
	var bill={
		 init:function(){
		 	 that = this;
             that.start();
             that.lookInfo();
		 },
         start:function(){
             $("#cancelCityq").click(function(){
                $(".canbao-info").removeClass("show-popup");
             })
             $(".offPopup1").click(function(){
                $(".canbao-info").removeClass("show-popup");
             })
         },
		 lookInfo:function(){
            $(".lookInfo").click(function(){
                var city_id=$(this).data("cityid");
                var id=$(this).data("id");
                // var area_id=$(this).data("areaid");
                var cityName=$(this).parents("tr").find("td").eq(2).text();
                // var companyid=$(this).data("companyid");
                $.ajax({
                 type: "post",
                 url: "/dsb/company/info",
                 data: {city_id:city_id,id:id},
                 dataType: "json",
                 success: function (data) {
                     if (data.code == "200") {
                        that.tabelList(data.data);
                        $(".canbao-info").addClass("show-popup");
                        $('#zilihu>span').text(cityName);
                        // var str='';
                        // var res=data.data;
                        // for (var i = 0; i < res.length; i++) {
                        //     str+='<option value="'+res[i].area_id+'">'+res[i].area_name+'</option>'
                        // }
                        // $quxian.find("select").html(str).end().removeClass("hide");
                     } else{
                       // $quxian.addClass("hide").find("select").html('');
                     }
                 },
                 error: function () {
                     popup({txt:"抱歉，系统发生错误！"});
                 }
                });
            })
         },
         tabelList:function(data){
           var title="",cont="",cant="",dabingyiliao="",on_check="",on_check1="";
           for (var i = 0; i < data.length; i++) {
               title='<tr class="bg-gray2"><td colspan="5" >'+data[i].city_sub_name+'</td></tr><tr><td></td> <td>企业比例</td> <td>个人比例</td> <td>基数上限</td> <td>基数下限</td> </tr>';
               cont="";
               for (var l = 0; l < data[i].list.length; l++) {
                     
                     dabingyiliao=data[i].list[l].name;
                     if(dabingyiliao==='大病医疗保险'){
                       //是否是按月收取
                       if(data[i].list[l].is_month===1){
                          on_check1="";
                          on_check="on_check";
                       }else{
                          on_check="";
                          on_check1="on_check";
                       }
                       cont+='<tr class="dataScale yiliao" data-id="'+data[i].list[l].id+'" data-feec="'+data[i].list[l].fee_c+'" data-feep="'+data[i].list[l].fee_p+'" data-ismonth="'+data[i].list[l].is_month+'"><td>'+data[i].list[l].name+'</td><td>'+data[i].list[l].scale_c+'%</td>'+
                       '<td>'+data[i].list[l].scale_p+'%</td>'+
                       '<td>'+data[i].list[l].max+'</td><td>'+data[i].list[l].min+'</td></tr><tr class="tc-radio"><td>大病医疗费用</td><td>'+data[i].list[l].fee_c+'元</td>'+
                       '<td>'+data[i].list[l].fee_p+'元</td>'+
                       '<td class="add-radio"><span><i class="'+on_check+'"><input name="dabing" type="radio"/></i><strong>按月收取</strong></span>'+
                       '</td><td class="add-radio"><span><i  class="'+on_check1+'"><input name="dabing" type="radio"/></i><strong>按年收取</strong></span></td></tr>';
                     }else{
                       cont+='<tr class="dataScale" data-id="'+data[i].list[l].id+'" data-feec="'+data[i].list[l].fee_c+'" data-feep="'+data[i].list[l].fee_p+'" data-ismonth="'+data[i].list[l].is_month+'"><td>'+data[i].list[l].name+'</td><td>'+data[i].list[l].scale_c+'%</td>'+
                       '<td>'+data[i].list[l].scale_p+'%</td>'+
                       '<td>'+data[i].list[l].max+'</td><td>'+data[i].list[l].min+'</td></tr>';
                     }

                

               }
               cant+='<table class="ui table edit-info center aligned"><tbody>'+title+cont+'</tbody></table>';
             
           }
           $(".edit-table").html(cant);
           
           // //按年按月切换
           // $(".add-radio span").on("click",function() { 
           //    var $this=$(this); 
           //    $this.find('i').addClass('on_check');
           //    $this.find('i input').prop('checked','true'); 
           //    $this.parent('td').siblings().find('i').removeClass("on_check")
           // }); 
         },
         // tabelList:function(data){
         //    var title="",cont="",cant="",gongshangbili="gongshangbili",gongjijinbili="gongjijinbili",shebao_type;
         //    for (var i = 0; i < data.length; i++) {
         //        title='<tr class="bg-gray2 f14"><td colspan="7">'+data[i].title+'</td>';
         //        cont="";
         //        for (var l = 0; l < data[i].list.length; l++) {
         //            shebao_type = data[i].list[l].shebao_type;
         //            if (shebao_type == 'gongshang') {
         //               cont+="<tr><td>"+data[i].list[l].title+"</td><td>"+data[i].list[l].min+"</td><td>"+data[i].list[l].max+"</td><td class="+gongshangbili+">"+data[i].list[l].company+"%</td><td>"
         //               +data[i].list[l].min+"</td><td>"+data[i].list[l].max+"</td><td>"+data[i].list[l].personal+"%</td></tr>";
         //            }else if(shebao_type == 'gongjijin'){
         //               cont+="<tr><td>"+data[i].list[l].title+"</td><td>"+data[i].list[l].min+"</td><td>"+data[i].list[l].max+"</td><td class="+gongjijinbili+">"+data[i].list[l].company+"%</td><td>"
         //               +data[i].list[l].min+"</td><td>"+data[i].list[l].max+"</td><td class="+gongjijinbili+">"+data[i].list[l].personal+"%</td></tr>";
         //            }else{
         //               cont+="<tr><td>"+data[i].list[l].title+"</td><td>"+data[i].list[l].min+"</td><td>"+data[i].list[l].max+"</td><td>"+data[i].list[l].company+"%</td><td>"
         //               +data[i].list[l].min+"</td><td>"+data[i].list[l].max+"</td><td>"+data[i].list[l].personal+"%</td></tr>";
         //            }
                    
         //        }
         //        cant+=title+cont;
         //    }
         //    $("#cityCont").html(cant);
         // },

	}
	bill.init();
})