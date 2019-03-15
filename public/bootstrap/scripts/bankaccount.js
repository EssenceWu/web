$(function(){
	var bankaccount={
		 init:function(){
		 	 that = this;
             that.bankSubmit();
		 },
		 bankSubmit:function(){
             $("#bankSubmit").click(function(){
             	var name=$.trim($("#name").val());
             	var address=$.trim($("#address").val());
             	var bank_address=$.trim($("#bank_address").val());
             	var bank_number=$.trim($("#bank_number").val());
     

             	if (!ifNotNull(name)) { 
                   popup({txt:"公司名称不能为空！"});
                   return false;
                 }else if (!ifNotNull(address)) {
                   popup({txt:"银行名称不能为空！"});
                   return false;
		         }else if (!ifNotNull(bank_address)) {
                   popup({txt:"开户行地址不能为空！"});
                   return false;
		         }else if (!ifNotNull(bank_number)) {
                   popup({txt:"银行卡卡号不能为空！"});
                   return false;
		         }else if (!ifNotNull(bank_number)) {
		         	var isNum=new RegExp(/^[1-9]\d*$/);
                    if(!bank_number.match(isNum)){
	         	        popup({txt:"银行卡卡号必须为数字！"});
	         	        return false;
	         	    }
		         }else{
		           $(".bankform").submit();
                 } 

             })
		 },
	}
	bankaccount.init();
})