//禁止页面滚动
function pageNoScroll(){
     $("body").css({"position":"fixed","overflow":"hidden"});
}
//解除防止页面滚动
function pageScroll(){
     $("body").css({"position":"static","overflow":"auto"});
}

//获取地址栏参数
function GetQueryString(paras) {
        var url = location.href;
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        var paraObj = {}
        for (i = 0; j = paraString[i]; i++) {
            paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
        }
        var returnValue = paraObj[paras.toLowerCase()];
        if (typeof (returnValue) == "undefined") {
            return "";
        } else {
            return decodeURIComponent(returnValue);
        }
}
//判断是否为空
function ifNotNull(obj) {
if(obj != null && obj != "undefined" && obj != "null" && typeof(obj) != "undefined" && obj != undefined && typeof(obj) != undefined) {
    obj = $.trim(obj+"");
    if(obj != "") {
        return true;
    } else {
        return false;
    }
} else {
    return false;
}
}
//添加到本地存储
function addLocal(name,value) {
    if(ifNotNull(getCookie("noLocal"))){
        addCookie(name,value);
    }else{
        try{
            localStorage.setItem(name,value);
            addCookie(name,value);
        }catch(e){
            addCookie("noLocal","true");//浏览器不支持local存储
            addCookie(name,value);
        }
    }
}
//获得本地存储
function getLocal(name) {
    if(ifNotNull(getCookie("noLocal"))){
        return getCookie(name);
    }else{
        return localStorage.getItem(name);

    }
}
//删除本地存储
function delLocal(name) {
    if(ifNotNull(getCookie("noLocal"))){
        addCookie(name,"");
    }else{
        localStorage.removeItem(name);
    }
}
//添加cookie
function addCookie(name,value,expires){
    var str = name+"="+escape(value);
    var localhost_no = window.location.host.indexOf("test") > -1 ? "test.spider.com.cn" : window.location.host;
    if(expires!=""){
        var date=new Date();
        date.setTime(date.getTime()+expires*24*3600*1000);//expires单位为天
        str+=";expires="+date.toGMTString();
    }
    str += ";path=/;domain="+localhost_no;
    document.cookie = str;
    str += ";path=/;domain=.spider.com.cn";
    document.cookie = str;
}
//取得cookie
function getCookie(name){
    var str=document.cookie.split(";");
    for(var i=0;i<str.length;i++){
        var str2=str[i].split("=");
        if(str2[0].trim()==name) return unescape(str2[1]);
    }
}
function createCookie(name, value, days, Tdom) {
    var Tdom = (Tdom) ? Tdom : "/";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else {
        var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=" + Tdom;
}


//提示框
function popup(data, callback) { //调用例子dom.popup({txt:'xxxxxx',btn:2})
    $('#popup_pub').remove();
    var btn = '',
        txt_true = '确定',
        txt_false = '取消',
        txt_title = '提示:',
        style = '',
        btn_style = '',
        hd_style = '',
        txt_style = '';
    data = data || {};
    txt_title = data.txt_title || txt_title;
    style = data.style || style;
    hd_style = data.hd_style || hd_style;
    txt_style = data.txt_style || txt_style;
    btn_style = data.btn_style || btn_style;
    txt_true = data.txt_true || txt_true;
    txt_false = data.txt_false || txt_false;
    if (data.btn == '2') {
        btn = '<span class="popup_false" id="popup_false">' + txt_false + '</span><span class="popup_true" id="popup_true">' + txt_true + '</span>';
    } else {
        btn = '<span class="popup_true" style="margin: auto;width:120px;" id="popup_true">我知道了</span>';
    }

    var html = '<div class="loading_line" id="popup_pub" style="visibility: visible;">' +
        '<div class="box-middle">' +
        '<div class="popup_box fs_13" ' + style + '>' +
        '<div class="popup_title" ' + hd_style + '>' + txt_title  +'<i class="icon iconfont icon-guanbi offPopup"></i></div>' +
        '<div class="popup_txt" ' + txt_style + '><div>' + data.txt + '</div></div>' +
        '<div class="popup_btn" ' + btn_style + '>' + btn + '</div>' +
        '</div>' +
        '</div></div>';
    $("body").append(html);
    $('#popup_true').bind('click', function(e) {
        e.preventDefault();
        $('#popup_pub').hide();
        if (callback) {
            callback();
        }
    });
    $('#popup_false,.offPopup').bind('click', function(e) {
        e.preventDefault();
        $('#popup_pub').hide();
    });
}

//退出
$(".tuichu").hover(function(){
     $(".logout").show();
},function () {
     $(".logout").hide(); 
})




