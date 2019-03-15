var pullDown=function(ajaxData,wrapper){
   var myScroll,
       pullUpEl, pullUpOffset;
   function pullUpAction () {
    ajaxData(function(){
         myScroll.refresh();
    })
    // setTimeout(function () {    // <-- Simulate network congestion, remove setTimeout from production!
    //     myScroll.refresh();     // Remember to refresh when contents are loaded (ie: on ajax completion)
    //  }, 1000);   // <-- Simulate network congestion, remove setTimeout from production!
   }



   function loaded() {
       pullUpEl = document.getElementById('pullUp');    
       pullUpOffset = pullUpEl.offsetHeight;
       
       myScroll = new iScroll('wrapper', {
           useTransition: true,
           onRefresh: function () {
                if (pullUpEl.className.match('loading')) {
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '下拉刷新';
                }
           },
           onScrollMove: function () {
                if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'flip';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始刷新';
                    this.maxScrollY = this.maxScrollY;
                } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '下拉刷新';
                    this.maxScrollY = pullUpOffset;
                }
           },
           onScrollEnd: function () {
               if (pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'loading';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';                
                    pullUpAction(); // Execute custom function (ajax call?)
               }
           }
       });
       
       setTimeout(function () { wrapper.style.left = '0'; }, 800);
   }

   document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

   document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
}
