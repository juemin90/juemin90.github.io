(function($){
	$(function(){
		// navigation animation
		var lis = $("#sidebar ul li"), dashboards = $("section.dashboard");
		lis.each(function(i){
			$(this).click(function(){
				lis.eq(i).addClass("active").siblings("li").removeClass("active");
				dashboards.eq(i).css("display", "block").siblings("section").css("display", "none");
			})
		})
		var navs = $("#nav div");
			navs.eq(0).mouseenter(function(){
				navs.eq(1).css({bottom:'100px'});
				navs.eq(2).css({bottom:'170px'});
				navs.eq(3).css({bottom:'240px'});

			});
			$("#nav").mouseleave(function(){
				navs.eq(1).css({bottom:'30px'});
				navs.eq(2).css({bottom:'30px', right:'30px'});
				navs.eq(3).css({bottom:'30px'});
		});

		// header change
		$(document).scroll(function(){
			var page_scroll = window.pageYOffset,
				head = $("header");
				prev_height = head.height()+"px";
			if(page_scroll>100){
				head.addClass("scrolled")
			} else if(page_scroll<100) {
				head.removeClass("scrolled");
			}
		})
	})
})(jQuery);
