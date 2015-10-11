(function($){
	$(function(){
		var lis = $("#sidebar ul li"), dashboards = $("section.dashboard");
		lis.each(function(i){
			$(this).click(function(){
				lis.eq(i).addClass("active").siblings("li").removeClass("active");
				dashboards.eq(i).css("display", "block").siblings("section").css("display", "none");
			})
		})
				
		var navs = $("#nav div");
			$("#nav").find("#home").mouseenter(function(){
				navs.eq(1).css({bottom:'100px'});
				navs.eq(2).css({bottom:'100px', right:'100px'});
				navs.eq(3).css({right:'100px'});

			}).end().mouseleave(function(){
				navs.eq(1).css({bottom:'30px'});
				navs.eq(2).css({bottom:'30px', right:'30px'});
				navs.eq(3).css({right:'30px'});
		})
		var query_ip = $(".ip_content");
		query_ip.each(function(i){
			$(this).click(function(e){
				e.stopPropagation();
				var dialog = new Dialog();
				var ip_address = $(this).find("span").html();
				var user_behavior = $.ajax({
					type:'POST',
					url:"search_visited_page.php",
					data:{ip:ip_address},
					async:false,
					success:function(d){
						var result_json = $.parseJSON(d);
						var result = "";
						$("#dialog").show(100);
						$("#dialog").css({left:(e.clientX+20), top:(e.clientY-40)});
						for(var i in result_json){
							result += ("<p>"+ i +": " + result_json[i]+"</p>");
						}
						$("#dialog_body").html(result);
					}
				});
				
			})
		})
		$(document).click(function(){
			$("#dialog").hide();
		})
	})
})(jQuery);

function Dialog(){

}