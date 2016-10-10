(function($){

	  $.freezColumn = function( elem ,options ) {
	  		var _this = this;
	    	_this.settings = $.extend({},$.freezColumn.defaultOptions, options);

        	if( $(elem).parent().hasClass("fixtablscroller")){
        		// only calulate column
        		if( $(elem).width() <= $(elem).parent().parent().parent().width()) {
		        		$(elem).parent().parent().replaceWith(elem);
		        		return;
		        	}
        		return;
        	}
        	if( $(elem).width() <= $(elem).parent().width()) {
        		return;
        	}

			var clonetable = $(elem).clone();
			$(elem).wrap(function() {
			  return "<div class='fixtable'><div class='fixtablscroller'></div></div>";
			});
			var fixtablscroller = $(elem).parent();
			fixtablscroller.css({overflow: "auto"});
			fixtablscroller.after("<div class='fixtablecolumn'></div>");

			var fixtable = fixtablscroller.parent();
			fixtable.css({position: "relative"});


			var columnwidth = $("td:eq(" +  parseInt( _this.settings["col"]) +")",elem).position().left+1;
			console.log("columnwidth: ", columnwidth ,elem);

			var fixtablecolumn = fixtablscroller.next();
			fixtablecolumn.css({
	        	position: "absolute",
	        	top: 0,
	        	left: 0,
	        	overflow: "hidden",
				width: columnwidth
			}).append(clonetable);
			fixtablscroller.floatingScrollbar();

	  };


	    $.freezColumn.defaultOptions = {
            "col": 1
        };
        $.freezColumn.fixtablObj = [];

        $.fn.freezColumn = function(options){
        	return this.each(function(){

				$.freezColumn.fixtablObj.push(this);
        		$.freezColumn(this, options);
        	});

        };

        $(window).on("resize",function(i,v){
			for( var el in $.freezColumn.fixtablObj){
				$.freezColumn($.freezColumn.fixtablObj[el] );
			}
		})
})(jQuery);
