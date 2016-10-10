    var fixtablObj = [];
        function fixtabl(elem , colfix){
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

			var columnwidth = $("td:eq(2)",elem).position().left+1;
			var fixtablecolumn = fixtablscroller.next();
			fixtablecolumn.css({
	        	position: "absolute",
	        	top: 0,
	        	left: 0,
	        	overflow: "hidden",
				width: columnwidth
			}).append(clonetable);
			fixtablscroller.floatingScrollbar();
        }

        	$(document).ready(function () {
				$("table").each(function (i,v) {
					fixtablObj.push(this);
        			fixtabl(this );
        		});
        		$(window).on("resize",function(i,v){
        			for( var el in fixtablObj){
        				fixtabl(fixtablObj[el] );
        			}
        		})
        	})