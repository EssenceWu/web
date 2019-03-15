$(function(){
  var salaryemployeedetail={
    init:function(){
      that = this;
      that.start();
    },
    start:function(){
      var $changeMonth=$("#changeMonth");
      var $changePici=$("#changePici");
      var staff_month;
      var staff_batch;
      var com=function(){
        staff_month=$changeMonth.find("option:selected").val();
        staff_batch=$changePici.find("option:selected").val();
      }
      var len=$changeMonth.find("option").length;
      var len1=$changePici.find("option").length;

      if (len===1) {
           $(".l i").hide();
      }
      if (len1===1) {
           $(".r i").hide();
      }

     
      $changeMonth.change(function(){
        com();
        window.location.href="/dsb/Companysalarystaff/salaryEmployeeDetail/staff_month/"+staff_month+"/staff_batch/"+staff_batch;
      });
      $changePici.change(function(){
        com();
        window.location.href="/dsb/Companysalarystaff/salaryEmployeeDetail/staff_month/"+staff_month+"/staff_batch/"+staff_batch;
      });

    },
    
  }
  salaryemployeedetail.init();
})