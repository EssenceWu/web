$(function(){
	var city={
		 init:function(){
		 	 that = this;
             that.start();
             that.selectCity();
             //that.isZilihu();
             that.saveSet();
             // that.changeBili();
             that.lookInfo();
             that.removeInfo();
             //that.dateList();
		 },
		 start:function(){
             $("#addCity").click(function(){
             	$(".cityq-popup").addClass("show-popup");
             })
             $("#cancelCityq").click(function(){
                $(".cityq-popup").removeClass("show-popup");
             })
             $(".saveSet-cancel").click(function(){
                $(".canbao-info").removeClass("show-popup");
             })
             //添加地区 是否是自立户
             $(".send-type span").click(function() { 
                var $this=$(this); 
                $this.find('i').addClass('on_check');
                $this.find('i input').prop('checked','true'); 
                $this.siblings().find('i').removeClass("on_check")
             }); 

             

		 },
         selectCity:function(){
             // $("#selectCity").change(function(){
             //    var selectCity=$("#selectCity").find("option:selected").val();
             //    var $quxian=$("#quxian");
             //    if(ifNotNull(selectCity)){
             //        $.ajax({
             //         type: "post",
             //         url: "/dsb/company/area",
             //         data: {city_id:selectCity},
             //         dataType: "json",
             //         success: function (data) {
             //             if (data.code == "200") {
             //                var str='';
             //                var res=data.data;
             //                for (var i = 0; i < res.length; i++) {
             //                    str+='<option value="'+res[i].area_id+'">'+res[i].area_name+'</option>'
             //                }
             //                $quxian.find("select").html(str).end().removeClass("hide");
             //             } else{
             //                $quxian.addClass("hide").find("select").html('');
             //             }
             //         },
             //         error: function () {
             //             popup({txt:"抱歉，系统发生错误！"});
             //             $quxian.addClass("hide");
             //         }
             //        });
             //    }
             // })
             $("#confirmCity").click(function(){
                var selectCity=$("#selectCity").find("option:selected").val();
                var selectText=$("#selectCity").find("option:selected").text();
                var is_self;
                //var cityName=selectText;
                // $("#qiyeGs").val("");
                // $("#qiyeGjj").val("");
                // $("#gerenGjj").text("0%");
                // $("#isZilihu i").removeClass("checked");
                // $(".isDisable").prop("disabled",true);
                // $("#gsTz,#gjjTz").removeClass("vh");
                //var quxianText=$("#quxian").find("option:selected").text();
                // if (ifNotNull(quxianText)) {
                //   cityName=selectText+quxianText;
                // }
                //var quxian=$("#quxian").find("option:selected").val();
                if(ifNotNull(selectCity)){
                    var isCheck=$(".send-type span").eq(1).find("i").hasClass("on_check");
                    if(isCheck){
                        is_self=1;
                    }else{
                        is_self=2;
                    }
                      $.ajax({
                       type: "post",
                       url: "/dsb/company/add",
                       data: {city_id:selectCity,is_self:is_self},
                       dataType: "json",
                       success: function (data) {
                           if (data.code == "200") {
                              if(is_self===1){
                                  that.ajaxInfo(selectCity,selectText);
                              }else{
                                  window.location.reload();
                              }
                              // that.tabelList(data.data);
                              // $('#zilihu>span').text(cityName);
                              // $(".cityq-popup").removeClass("show-popup");
                              // $(".look-hide").removeClass("hide");
                              // $(".canbao-info").addClass("show-popup");
                           } else{
                              popup({txt:data.msg});
                           }
                       },
                       error: function () {
                           popup({txt:"抱歉，系统发生错误！"});
                       }
                      });
                   
                }else{
                    popup({txt:"请选择城市！"});
                }
               
             })
         },
         ajaxInfo:function(city_id,cityName){
            $.ajax({
             type: "post",
             url: "/dsb/company/info",
             data: {city_id:city_id},
             dataType: "json",
             success: function (data) {
                 if (data.code == "200") {
                    that.tabelList(data.data);
                    $(".cityq-popup").removeClass("show-popup");
                    $(".canbao-info").addClass("show-popup");
                    $('#zilihu>span').text(cityName);
                 } else{
                    popup({txt:data.msg});
                 }
             },
             error: function () {
                 popup({txt:"抱歉，系统发生错误！"});
             }
            });
         },
         lookInfo:function(){
            $(".lookInfo").click(function(){
                var $this=$(this);
                var city_id=$this.data("cityid");
                // var area_id=$this.data("areaid");
                var cityName=$this.data("name");
                that.ajaxInfo(city_id,cityName);
                //var isself=$this.data("isself");
                // var gsscale=$this.data("gsscale");
                // var ggscale=$this.data("ggscale");
                //var $isZilihu=$("#isZilihu i");
                //var $isDisable=$(".isDisable");
                // $("#qiyeGs").val(gsscale);
                // $("#qiyeGjj").val(ggscale);
                // $("#gerenGjj").text(ggscale+"%");
                //$("#gsTz,#gjjTz").addClass("vh");

                // if (isself==1) {
                //     //$isZilihu.addClass("checked");
                //     $isDisable.prop("disabled",false);
                // }else{
                //     //$isZilihu.removeClass("checked");
                //     $isDisable.prop("disabled",true);
                // }
                // $.ajax({
                //  type: "post",
                //  url: "/dsb/company/info",
                //  data: {city_id:city_id},
                //  dataType: "json",
                //  success: function (data) {
                //      if (data.code == "200") {
                //         // $(".look-hide").addClass("hide");
                //         that.tabelList(data.data);
                //         $(".canbao-info").addClass("show-popup");
                //         //$('#zilihu>span').text(cityName);
                //         // var str='';
                //         // var res=data.data;
                //         // for (var i = 0; i < res.length; i++) {
                //         //     str+='<option value="'+res[i].area_id+'">'+res[i].area_name+'</option>'
                //         // }
                //         // $quxian.find("select").html(str).end().removeClass("hide");
                //      } else{
                //        // $quxian.addClass("hide").find("select").html('');
                //      }
                //  },
                //  error: function () {
                //      popup({txt:"抱歉，系统发生错误！"});
                //  }
                // });
            })
         },
         removeInfo:function(){
            $(".removeInfo").click(function(){
                var cityid=$(this).siblings("span").data("cityid");
                console.log(cityid)
                popup({txt:"确认删除所选城市信息吗？",btn:2},function(){
                  $.ajax({
                   type: "post",
                   url: "/dsb/company/del",
                   data: {city_id:cityid},
                   dataType: "json",
                   success: function (data) {
                       if (data.code == "200") {
                          location.reload();
                       } else{
                          popup({txt:data.msg});
                       }
                   },
                   error: function () {
                       popup({txt:"抱歉，系统发生错误"});
                   }
                  });
                });
            })
         },
         tabelList:function(data){
            var title="",cont="",cant="",dabingyiliao="",on_check="",on_check1="";
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
                        cont+='<tr class="dataScale yiliao" data-id="'+data[i].list[l].id+'" data-feec="'+data[i].list[l].fee_c+'" data-feep="'+data[i].list[l].fee_p+'" data-ismonth="'+data[i].list[l].is_month+'"><td>'+data[i].list[l].name+'</td><td><input type="text" value="'+data[i].list[l].scale_c+'" class="edit-w" />&nbsp&nbsp%</td>'+
                        '<td><input type="text" value="'+data[i].list[l].scale_p+'" class="edit-w"/>&nbsp&nbsp%</td>'+
                        '<td>'+data[i].list[l].max+'</td><td>'+data[i].list[l].min+'</td></tr><tr class="tc-radio"><td>大病医疗费用</td><td><input type="text" value="'+data[i].list[l].fee_c+'"  class="edit-w"/>&nbsp&nbsp元</td>'+
                        '<td><input type="text" value="'+data[i].list[l].fee_p+'" class="edit-w"/>&nbsp&nbsp元</td>'+
                        '<td class="add-radio"><span><i class="'+on_check+'"><input name="dabing" type="radio"/></i><strong>按月收取</strong></span>'+
                        '</td><td class="add-radio"><span><i class="'+on_check1+'"><input name="dabing" type="radio"/></i><strong>按年收取</strong></span></td></tr>';
                      }else{
                        cont+='<tr class="dataScale" data-id="'+data[i].list[l].id+'" data-feec="'+data[i].list[l].fee_c+'" data-feep="'+data[i].list[l].fee_p+'" data-ismonth="'+data[i].list[l].is_month+'"><td>'+data[i].list[l].name+'</td><td><input type="text" value="'+data[i].list[l].scale_c+'" class="edit-w" />&nbsp&nbsp%</td>'+
                        '<td><input type="text" value="'+data[i].list[l].scale_p+'" class="edit-w"/>&nbsp&nbsp%</td>'+
                        '<td>'+data[i].list[l].max+'</td><td>'+data[i].list[l].min+'</td></tr>';
                      }

                 

                }
                cant+='<table class="table mt20 edit-info"><tbody>'+title+cont+'</tbody></table>';
              
            }
            $("#cityCont").html(cant);
            
            //按年按月切换
            $(".add-radio span").on("click",function() { 
               var $this=$(this); 
               $this.find('i').addClass('on_check');
               $this.find('i input').prop('checked','true'); 
               $this.parent('td').siblings().find('i').removeClass("on_check")
            }); 

            that.changeBili();
         },
         saveSet:function(){
            $("#saveSz").click(function(){
                //var sid=$("#saveSz").data("sid");
                //var city_name=$("#zilihu>span").text();
                //var city_id=$("#selectCity").find("option:selected").val();
                //var area_name=$("#quxian").find("option:selected").text();
                //var area_id=$("#quxian").find("option:selected").val();
                //var add_at=$("#add_at").find("option:selected").val();
                //var add_jz=$("#add_jz").find("option:selected").val();
                //var bill_at=$("#bill_at").find("option:selected").val();
                // var gs_scale_c=$("#qiyeGs").val();
                // var gg_scale_c=$("#qiyeGjj").val();
                //var gg_scale_p=$("#gerenGjj").val();


                // if (!ifNotNull(add_at)) {
                //     popup({txt:"请选择增员日期！"});
                //     return false;
                // }else if(!ifNotNull(add_jz)){
                //     popup({txt:"请选择增员截止日期！"});
                //     return false;
                // }else if(!ifNotNull(bill_at)){
                //     popup({txt:"请选择账单日期！"});
                //     return false;
                // }
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

                // {
                //     "data": [{
                //         "list": [{
                //                     "id": 1,
                //                     "scale_p": "8",
                //                     "fee_p": 0,
                //                     "scale_c": "19",
                //                     "fee_c": 0,
                //                     "is_month": 1
                //                 }, {
                //                     "scale_p": "2",
                //                     "fee_p": 0,
                //                     "scale_c": "9",
                //                     "fee_c": 0,
                //                     "is_month": 1
                //                 }]
                //     },{
                //         "list": [{
                //                     "scale_p": "8",
                //                     "fee_p": 0,
                //                     "scale_c": "19",
                //                     "fee_c": 0,
                //                     "is_month": 1
                //                 }, {
                //                     "scale_p": "2",
                //                     "fee_p": 0,
                //                     "scale_c": "9",
                //                     "fee_c": 0,
                //                     "is_month": 1
                //                 }]
                //     }]
                // }


                // var $item=$("#isZilihu").find("i");
                // var isCheck=$item.hasClass("checked");
                // var is_self;
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
                var data=JSON.stringify(arrScale_list);
                //console.log(data)

               

                // var arrScale_id_list=[];
                // for (var i = 0; i < arrId.length; i++) {
                //     arrScale_id_list.push({"id":arrId[i]});
                // }

                // var arrScale_c_list=[];
                // for (var i = 0; i < arrScale_c.length; i++) {
                //     arrScale_c_list.push({"scale_c":arrScale_c[i]});
                // }

                // var arrScale_p_list=[];
                // for (var i = 0; i < arrScale_p.length; i++) {
                //     arrScale_p_list.push({"scale_p":arrScale_p[i]});
                // }

                // var arrScale_c_key={};
                // for(var key  in arrScale_c){
                //     arrScale_c_key["scale_c"]=arrScale_c[key];
                // }
                //  console.log(arrScale_id_list)
                // console.log(arrScale_c_list)
                // console.log(arrScale_p_list)
                //console.log(arrScale_p)
                $.ajax({
                 type: "post",
                 url: "/dsb/company/save",
                 data: {data:data},
                 dataType: "json",
                 success: function (data) {
                     if (data.code == "200") {
                        location.reload();
                     } else{
                        popup({txt:data.msg});
                     }
                 },
                 error: function () {
                     popup({txt:"抱歉，系统发生错误"});
                 }
                });
            })
         },
         changeBili:function(){
            var isNum=new RegExp(/^\d+\.?\d{0,2}$/);
            $(".edit-w").blur(function(){
              var val=$(this).val();
              if(!val.match(isNum)){
                  popup({txt:"比例必须是数字！"});
                  return false;
              }
            })
            // var isNum=new RegExp(/^\d+\.?\d{0,2}$/);
            // $("#gsTz").click(function(){
            //     var gs=$("#qiyeGs").val();
            //     if(ifNotNull(gs)){
            //         if(!gs.match(isNum)){
            //             popup({txt:"企业工伤比例必须是数字！"});
            //             return false;
            //         }else{
            //             popup({txt:"已修改"});
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
            //             popup({txt:"已修改"});
            //             $("#gerenGjj").text(gs+"%");
            //             $(".gongjijinbili").text(gs+"%");
            //         }
            //     }
            // })
         },
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