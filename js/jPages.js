(function($){
	$.fn.jPages = function(options){
		if(this.css('display')=='inline'){
				console.log("do not use this");
				return 0;
			}

		var default_setting = {
			pages:2
		},
			jPages = [],
			setting = $.extend(default_setting, options);

		jContainer_width = jPage_width = this.width(),
		jContainer_height = jPage_height = this.height(),
		jPage_left = this.css('left');
		jPage_right = this.css('right');
		jPage_top = this.css('top');
		jPage_bototm = this.css('bottom');
		jPage_box_shadow = this.css('boxShadow');
		jPage_color = this.css("backgroundColor");
		jPage_position = this.css("position");
		jWrapper = $("<div></div>").addClass("jWrapper").css({
			display:'inline-block', 
			position:jPage_position,
			paddingLeft:-jPage_left,
			paddingRight:-jPage_right,
			paddingTop:-jPage_top,
			paddingBottom:-jPage_bototm,
			left:jPage_left,
			right:jPage_right,
			top:jPage_top,
			bottom:jPage_bototm
		});
		this.css({top:0, left:0, bottom:0, right:0, zIndex:2})

		this.wrap(jWrapper);
		for(var i=0, l=setting.pages; i<l; i++){
			jPages[i] = $("<div>").addClass("jPages jPages"+i);
			var deg = Math.random()*10-5;
			this.after(jPages[i]);
			jPages[i].css({
				width:jPage_width, 
				height:jPage_height, 
				position:'absolute', 
				transform:"rotate("+deg+"deg)", 
				zIndex:1,
				backgroundColor:jPage_color,
				boxShadow:jPage_box_shadow
			});
		}
	}
})(jQuery);