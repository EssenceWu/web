$(function(){
	var city={
		 init:function(){
		 	 that = this;
             that.start();
             that.selectCity();
             that.saveSet();
             that.changeBili();
             that.removeCityinfo();
             that.lookInfo();
             //that.dateList();
		 },
		 start:function(){
             $("#addCity").click(function(){
             	$(".city-popup").addClass("show-popup");
             })
             $(".offPopup").click(function(){
                $(".city-popup").removeClass("show-popup");
             })
             
             $(".offPopup1").click(function(){
                $(".canbao-info").removeClass("show-popup");
             })   
		 },
         selectCity:function(){
             $("#selectCity").change(function(){
                var selectCity=$("#selectCity").find("option:selected").val();
                var $quxian=$("#quxian");
                if(ifNotNull(selectCity)){
                    $.ajax({
                     type: "post",
                     url: "/admin/Servicer/area",
                     data: {city_id:selectCity},
                     dataType: "json",
                     success: function (data) {
                         if (data.code == "200") {
                            var str='';
                            var res=data.data;
                            for (var i = 0; i < res.length; i++) {
                                str+='<option value="'+res[i].area_id+'">'+res[i].area_name+'</option>'
                            }
                            $quxian.find("select").html(str).end().removeClass("hide");
                         } else{
                            $quxian.addClass("hide").find("select").html('');
                         }
                     },
                     error: function () {
                         layer.msg("抱歉，系统发生错误", {icon: 2, time: 1000 });
                         $quxian.addClass("hide");
                     }
                    });
                }
             })
             $("#confirmCity").click(function(){
                var $this=$(this);
                var id=$this.data("id");
                var name=$this.data("name");
                var $selected=$("#selectCity").find("option:selected");
                var selectCity=$selected.val();
                var selectText=$selected.text();
                var cityName,data;
                cityName=selectText;
                var $quxian=$("#quxian").find("option:selected");
                var quxianId=$quxian.val();
                var quxianText=$quxian.text();
                if (ifNotNull(quxianText)) {
                  cityName=selectText+quxianText;
                  data={id:id,name:name,city_id:selectCity,area_id:quxianId,area_name:quxianText};
                }else{
                  data={id:id,name:name,city_id:selectCity,area_id:'',area_name:''}; 
                }
                
                if(ifNotNull(selectCity)){
                    $.ajax({
                     type: "post",
                     url: "/admin/Servicer/city_add",
                     data: data,
                     dataType: "json",
                     success: function (data) {
                         if (data.code == "200") {
                           // $(".look-hide,#saveSz").removeClass("hide");
                           // that.tabelList(data.data);
                           
                            
                            $("#qiyeGs").val("0");
                            $("#qiyeGjj").val("0");
                            $("#gerenGjj").text("0"+"%");
                            $("#add_at").find("option[value='0']").prop("selected",true);
                            $("#add_jz").find("option[value='0']").prop("selected",true);
                            $("#bill_at").find("option[value='0']").prop("selected",true);
                            $('.ui.dropdown').dropdown();
                            that.ajaxInfo(id,selectCity,quxianId);
                            $('#zilihu>span').text(cityName);
                            // $(".city-popup").removeClass("show-popup");
                            // $(".canbao-info").addClass("show-popup");
                         } else{
                            layer.msg(data.msg, {icon: 2, time: 1000 });
                         }
                     },
                     error: function () {
                         layer.msg("抱歉，系统发生错误", {icon: 2, time: 1000 });
                     }
                    });
                }
               
             })
         },
         tabelList:function(data){
            // var title="",cont="",cant="",gongshangbili="gongshangbili",gongjijinbili="gongjijinbili",shebao_type;
            // for (var i = 0; i < data.length; i++) {
            //     title='<tr class="bg-gray2 f14"><td colspan="7">'+data[i].title+'</td>';
            //     cont="";
            //     for (var l = 0; l < data[i].list.length; l++) {
            //         shebao_type = data[i].list[l].shebao_type;
            //         if (shebao_type == 'gongshang') {
            //            cont+="<tr><td>"+data[i].list[l].title+"</td><td>"+data[i].list[l].min+"</td><td>"+data[i].list[l].max+"</td><td class="+gongshangbili+">"+data[i].list[l].company+"%</td><td>"
            //            +data[i].list[l].min+"</td><td>"+data[i].list[l].max+"</td><td>"+data[i].list[l].personal+"%</td></tr>";
            //         }else if(shebao_type == 'gongjijin'){
            //            cont+="<tr><td>"+data[i].list[l].title+"</td><td>"+data[i].list[l].min+"</td><td>"+data[i].list[l].max+"</td><td class="+gongjijinbili+">"+data[i].list[l].company+"%</td><td>"
            //            +data[i].list[l].min+"</td><td>"+data[i].list[l].max+"</td><td class="+gongjijinbili+">"+data[i].list[l].personal+"%</td></tr>";
            //         }else{
            //            cont+="<tr><td>"+data[i].list[l].title+"</td><td>"+data[i].list[l].min+"</td><td>"+data[i].list[l].max+"</td><td>"+data[i].list[l].company+"%</td><td>"
            //            +data[i].list[l].min+"</td><td>"+data[i].list[l].max+"</td><td>"+data[i].list[l].personal+"%</td></tr>";
            //         }
                    
            //     }
            //     cant+=title+cont;
            // }
            // $("#cityCont").html(cant);
           var title="",cont="",cant="",dabingyiliao="",on_check="";
           for (var i = 0; i < data.length; i++) {
               title='<tr class="bg-gray2"><td colspan="5" >'+data[i].city_sub_name+'</td></tr><tr><td></td> <td>企业比例</td> <td>个人比例</td> <td>基数上限</td> <td>基数下限</td> </tr>';
               cont="";
               for (var l = 0; l < data[i].list.length; l++) {
                     
                     dabingyiliao=data[i].list[l].name;
                     if(dabingyiliao==='大病医疗保险'){
                       //是否是按月收取
                       if(data[i].list[l].is_month===1){
                          on_check="on_check";
                       }else{
                          on_check="";
                       }
                       cont+='<tr class="dataScale yiliao" data-id="'+data[i].list[l].id+'" data-feec="'+data[i].list[l].fee_c+'" data-feep="'+data[i].list[l].fee_p+'" data-ismonth="'+data[i].list[l].is_month+'"><td>'+data[i].list[l].name+'</td><td><input type="text" value="'+data[i].list[l].scale_c+'" class="edit-w" />&nbsp&nbsp%</td>'+
                       '<td><input type="text" value="'+data[i].list[l].scale_p+'" class="edit-w"/>&nbsp&nbsp%</td>'+
                       '<td>'+data[i].list[l].max+'</td><td>'+data[i].list[l].min+'</td></tr><tr class="tc-radio"><td>大病医疗费用</td><td><input type="text" value="'+data[i].list[l].fee_c+'"  class="edit-w"/>&nbsp&nbsp元</td>'+
                       '<td><input type="text" value="'+data[i].list[l].fee_p+'" class="edit-w"/>&nbsp&nbsp元</td>'+
                       '<td class="add-radio"><span><i class="'+on_check+'"><input name="dabing" type="radio"/></i><strong>按月收取</strong></span>'+
                       '</td><td class="add-radio"><span><i><input name="dabing" type="radio"/></i><strong>按年收取</strong></span></td></tr>';
                     }else{
                       cont+='<tr class="dataScale" data-id="'+data[i].list[l].id+'" data-feec="'+data[i].list[l].fee_c+'" data-feep="'+data[i].list[l].fee_p+'" data-ismonth="'+data[i].list[l].is_month+'"><td>'+data[i].list[l].name+'</td><td><input type="text" value="'+data[i].list[l].scale_c+'" class="edit-w" />&nbsp&nbsp%</td>'+
                       '<td><input type="text" value="'+data[i].list[l].scale_p+'" class="edit-w"/>&nbsp&nbsp%</td>'+
                       '<td>'+data[i].list[l].max+'</td><td>'+data[i].list[l].min+'</td></tr>';
                     }

                

               }
               cant+='<table class="ui table edit-info center aligned"><tbody>'+title+cont+'</tbody></table>';
             
           }
           $(".edit-table").html(cant);
           
           //按年按月切换
           $(".add-radio span").on("click",function() { 
              var $this=$(this); 
              $this.find('i').addClass('on_check');
              $this.find('i input').prop('checked','true'); 
              $this.parent('td').siblings().find('i').removeClass("on_check")
           }); 
         },
         removeCityinfo:function(){
            $(".removeCityinfo").click(function(){
                var $lookInfo=$(this).siblings(".lookInfo ");
                var id=$lookInfo.data("id");
                var cityid=$lookInfo.data("cityid");
                var areaid=$lookInfo.data("areaid");
                var status=$(this).data("status");
                var txt=$(this).text();
                popup({txt:"确认"+txt+"对应城市状态吗？",btn:2},function(){
                    $.ajax({
                     type: "post",
                     url: "/admin/Servicer/city_edit",
                     data: {id:id,city_id:cityid,area_id:areaid,status:status},
                     dataType: "json",
                     success: function (data) {
                         if (data.code == "200") {
                            location.reload();
                         } else{
                            layer.msg(data.msg, {icon: 2, time: 1000 });
                         }
                     },
                     error: function () {
                         layer.msg("抱歉，系统发生错误", {icon: 2, time: 1000 });
                     }
                    });
                   //window.location.href="/admin/servicer/city_del/id/"+id+"/cid/"+cid+".html";
                });
            })
         },
         lookInfo:function(){
            $(".lookInfo").on('click', function() {
              var city_id=$(this).data("cityid");
              var id=$(this).data("id");
              var area_id=$(this).data("areaid");;
              // var add_at=$(this).data("addat");
              // var delat=$(this).data("delat");
              // var billat=$(this).data("billat");
              var $td=$(this).parents("tr").find("td");
             // var cityname=$td.eq(0).text();
              //$("#saveSz").data("cityid",selectCity).data("cname",cityname).data("sid",id);
              var add_at=$td.eq(1).text();
              var val1=add_at.substr(0,add_at.length-1);

              var del_at=$td.eq(2).text();
              var val2=del_at.substr(0,del_at.length-1);

              var bill_at=$td.eq(3).text();
              var val3=bill_at.substr(0,bill_at.length-1);

              // $("#qiyeGs").val(gsc);
              // $("#qiyeGjj").val(ggc);
              // $("#gerenGjj").text(ggc+'%');

              $("#add_at").find("option[value="+val1+"]").prop("selected",true);
              $("#add_jz").find("option[value="+val2+"]").prop("selected",true);
              $("#bill_at").find("option[value="+val3+"]").prop("selected",true);
              $('.ui.dropdown').dropdown();
               
              that.ajaxInfo(id,city_id,area_id);
              // $.ajax({
              //  type: "post",
              //  url: "/admin/Servicer/info",
              //  data: {city_id:selectCity},
              //  dataType: "json",
              //  success: function (data) {
              //      if (data.code == "200") {
              //         //$(".look-hide,#saveSz").addClass("hide");

              //         //$(".isMt").css({"padding-top":"20px"});
              //         that.tabelList(data.data);
              //         $(".canbao-info").addClass("show-popup");
              //      } else{
              //         layer.msg(data.msg, {icon: 2, time: 1000 });
              //      }
              //  },
              //  error: function () {
              //      layer.msg("抱歉，系统发生错误", {icon: 2, time: 1000 });
              //  }
              // });
            })
         },
         ajaxInfo:function(id,city_id,area_id){
            if(!area_id){
                area_id=0;
            }
            $.ajax({
             type: "post",
             url: "/admin/Servicer/city_info",
             data: {id:id,city_id:city_id,area_id:area_id},
             dataType: "json",
             success: function (data) {
                 if (data.code == "200") {
                    that.tabelList(data.data);
                    $(".city-popup").removeClass("show-popup");
                    $(".canbao-info").addClass("show-popup");
                 } else{
                    layer.msg(data.msg, {icon: 2, time: 1000 });
                 }
             },
             error: function () {
                 layer.msg("抱歉，系统发生错误", {icon: 2, time: 1000 });
             }
            });
         },
         changeBili:function(){
            //var isNum=new RegExp(/^\d+\.?\d{0,2}$/);
            // $("#gsTz").click(function(){
            //     var gs=$("#qiyeGs").val();
            //     if(ifNotNull(gs)){
            //         if(!gs.match(isNum)){
            //             popup({txt:"企业工伤比例必须是数字！"});
            //             return false;
            //         }else{
            //             layer.msg("已修改", {icon: 1, time: 1000 });
            //             $(".gongshangbili").text(gs+"%");
            //         }
            //     }
            // })
            // $("#gjjTz").click(function(){
            //     var gs=$("#qiyeGjj").val();
            //     if(ifNotNull(gs)){
            //         if(!gs.match(isNum)){
            //             popup({txt:"企业公积金比例必须是数字！"});
            //             return false;
            //         }else{
            //             layer.msg("已修改", {icon: 1, time: 1000 });
            //             $("#gerenGjj").text(gs+"%");
            //             $(".gongjijinbili").text(gs+"%");
            //         }
            //     }
            // })
            var isNum=new RegExp(/^\d+\.?\d{0,2}$/);
            $(".edit-w").blur(function(){
              var val=$(this).val();
              if(!val.match(isNum)){
                  popup({txt:"比例必须是数字！"});
                  return false;
              }
            })
         },
          saveSet:function(){
            $("#saveSz").click(function(){
                //var sid=$("#saveSz").data("sid");
                // var city_name=$("#selectCity").find("option:selected").text();
                // var city_id=$("#selectCity").find("option:selected").val();
                // var area_name=$("#quxian").find("option:selected").text();
                // var area_id=$("#quxian").find("option:selected").val();
                var add_at=$("#add_at").find("option:selected").val();
                var add_jz=$("#add_jz").find("option:selected").val();
                var bill_at=$("#bill_at").find("option:selected").val();
                //var gs_scale_c=$("#qiyeGs").val();
                //var gg_scale_c=$("#qiyeGjj").val();
                //var gg_scale_p=$("#gerenGjj").text();
                // if(city_name=='请选择城市'){
                //   city_name=$(this).data("cname");
                //   city_id=$(this).data("cityid");

                // }


                if (add_at=='0') {
                    popup({txt:"请选择增员日期！"});
                    return false;
                }else if(add_jz=='0'){
                    popup({txt:"请选择增员截止日期！"});
                    return false;
                }else if(bill_at=='0'){
                    popup({txt:"请选择账单日期！"});
                    return false;
                }
                // var isNum=new RegExp(/^\d+\.?\d{0,2}$/);
                // if(ifNotNull(gs_scale_c)){
                //     if(!gs_scale_c.match(isNum)){
                //         popup({txt:"企业工伤比例必须是数字！"});
                //         return false;
                //     }
                // }   
                // if(ifNotNull(gg_scale_c)){
                //     if(!gg_scale_c.match(isNum)){
                //         popup({txt:"企业公积金比例必须是数字！"});
                //         return false;
                //     }
                // }
                // if(ifNotNull(gg_scale_p)){
                //     if(!gg_scale_p.match(isNum)){
                //         popup({txt:"个人公积金比例输入的数字必须是正整数！"});
                //         return false;
                //     }
                // }


                // var $item=$("#isZilihu").find("i");
                // var isCheck=$item.hasClass("checked");
                //var is_self;
                // if (isCheck) {
                //   is_self=1;
                // }else{
                //   is_self=2;
                // }
                //大病医疗费用单独调整
                var $tc_radio=$(".tc-radio");
                var len=$tc_radio.length,feep,isCheck,$yiliao,$td;
                for (var i = 0; i < len; i++) {
                    $td=$tc_radio.eq(i).find("td");
                    feep=$td.eq(2).find("input").val();
                    feec=$td.eq(1).find("input").val();
                    isCheck=$td.eq(3).find("i").hasClass("on_check");
                    $yiliao=$tc_radio.eq(i).siblings(".yiliao");
                    $yiliao.data("feep",feep).data("feec",feec);
                    if (isCheck) {
                        $yiliao.data("ismonth",1);
                    }else{
                        $yiliao.data("ismonth",2);
                    }
                }


                //循环所有比例
                var $dataScale=$(".dataScale");
                var len=$dataScale.length;

                var arrScale_list=[],scale_c,scale_p,id,fee_c,fee_p,is_month,$eq;
                for (var i = 0; i < len; i++) {
                    $eq=$dataScale.eq(i);
                    id=$eq.data("id");
                    fee_c=$eq.data("feec");
                    fee_p=$eq.data("feep");
                    is_month=$eq.data("ismonth");
                    scale_c=$eq.find("td").eq(1).find("input").val();
                    scale_p=$eq.find("td").eq(2).find("input").val();


                    arrScale_list.push({"id":id,"fee_c":fee_c,"fee_p":fee_p,"is_month":is_month,"scale_c":scale_c,"scale_p":scale_p});
                }


                //json
                var json={"add_at":add_at,"del_at":add_jz,"bill_at":bill_at,"list":arrScale_list};
                var data=JSON.stringify(json);

                $.ajax({
                 type: "post",
                 url: '/admin/Servicer/city_save',
                 data: {data:data},
                 dataType: "json",
                 success: function (data) {
                     if (data.code == "200") {
                        location.reload();
                     } else{
                        layer.msg(data.msg, {icon: 2, time: 1000 });
                     }
                 },
                 error: function () {
                     layer.msg("抱歉，系统发生错误", {icon: 2, time: 1000 });
                 }
                });
            });
            $(".cancle").click(function(){
                location.reload();
                //$(".canbao-info").removeClass("show-popup");
            });
         },
         // dateList:function(){
         //    var arr=[],str='<option value="">请选择</option>';
         //    for (var i = 1; i < 32; i++) {
         //        str+="<option value="+i+">"+i+"日</option>";
         //    }
         //    $(".dateList").html(str).addClass("dropdown");
         // },
         // isZilihu:function(){
         //    $("#isZilihu").click(function(){
         //        var $item=$(this).find("i");
         //        var isCheck=$item.hasClass("checked");
         //        if (isCheck) {
         //          $item.removeClass("checked");
         //          $(".isDisable").prop("disabled",true);
         //        }else{
         //          $item.addClass("checked");
         //          $(".isDisable").prop("disabled",false);
         //        }
         //    })
         // }
		 
		 

	}
	city.init();
})