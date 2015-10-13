(function($){
	$(function(){
		$.fn.jPages = function(options){
			var default_setting = {
				pages:2
			},
			me = this;
			setting = $.extend(default_setting, options),
			jPages = [];

			for(var i=setting.pages; i>0; i--){
				jPages[i] = $("<div>").addClass("jPages jPages"+i).css({
					height:this.height(),
					width:this.width(),
					backgroundColor:this.css('backgroundColor'),
					margin:this.css('margin'),
					position:this.css('position'),
					top:this.css('top'),
					bottom:this.css('bottom'),
					left:this.css('left'),
					right:this.css('right'),
					transform:'rotate('+(Math.random()*20-10)+'deg)',
					boxShadow:'0px 0px 10px 2px #666',
					// z-index:-1
				});
				this.before(jPages[i]);
				if(this.css('position')!=='absolute' && this.css('position')!=='fixed') {

				} else if(this.css('position')=='relative') {
					jPages[i].css({top:(i*this.css('height'))})
				} else {

				}
			}
		}
	});
})(jQuery);