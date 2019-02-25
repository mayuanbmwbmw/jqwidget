// JavaScript Document
(function ($) {
	var defaults = {
		//高度值需要微调，否则有间隙。
		p_h: 400
		,c_w: 300
	};
    $.fn.zl_scrollBar = function ( options ) {
			setOptions( options );
			var currentPos = 100;
			var opts = getOptions();
			var obj = $( this );
			var obj_parent = obj.parent();
			var scrollPane = $("<div class='scroll-pane ui-widget'>");
			var scrollBarWrapDiv = $("<div class='scrollBarWrapDiv'/>");
			var scrollBarWrap = $("<div class='scroll-bar-wrap ui-widget-content ui-corner-bottom'>");
			var upRoll = $("<div class='upRoll'>");
			var downRoll = $("<div class='downRoll'>");
			var scrollContent = obj;
			var bar = $("<div class='scroll-bar'>");
			bar.appendTo(scrollBarWrap);
			scrollContent.appendTo(scrollPane,obj_parent);
			scrollBarWrapDiv.appendTo(scrollPane,obj_parent);
			upRoll.appendTo(scrollBarWrapDiv);
			scrollBarWrap.appendTo(scrollBarWrapDiv);
			downRoll.appendTo(scrollBarWrapDiv);
			scrollPane.appendTo(obj_parent);
			scrollPane.height(getOptions().p_h);
			scrollContent.width(getOptions().c_w);
			if(scrollContent.height() < scrollPane.height()){return;}
			scrollBarWrapDiv.show();
			
			//初始化滚动条
			var scrollbar = bar.slider({
				orientation: "vertical",
				value: 100,
				slide: function( event, ui ) {
				
					if ( scrollContent.height() > scrollPane.height() ) {
						scrollContent.css( "margin-top", Math.round(
							( 100 - ui.value ) / 100 * ( scrollPane.height() - scrollContent.height() )
						) + "px" );
					} else {
						scrollContent.css( "margin-top", 0 );
					}
					currentPos = ui.value;
				}
			});
			scrollBarWrapDiv.width(scrollBarWrap.outerWidth());
			scrollBarWrap.height(opts.p_h - upRoll.outerHeight(true) - downRoll.outerHeight(true));
			upRoll.width(scrollBarWrap.outerWidth());
			downRoll.width(scrollBarWrap.outerWidth());
			//追加滚动条拖动条
			var handleHelper = scrollbar.find( ".ui-slider-handle" )
			.mousedown(function() {
				scrollbar.height( handleHelper.height() );
				var h = scrollBarWrap.height() - scrollbar.height();
				scrollbar.css( { "margin-top" : h + "px" });
				handleHelper.css({ "margin-top" : 0 + "px" })
			})
			.mouseup(function() {
				scrollbar.height( "100%" );
				var h = scrollBarWrap.height() - handleHelper.height();
				scrollbar.css( { "margin-top" : 0 + "px" });
				handleHelper.css( { "margin-top" : h + "px" } );
			})
			.append( "<span class='ui-icon ui-icon-grip-dotted-horizontal'></span>" )
			.wrap( "<div class='ui-handle-helper-parent'></div>" ).parent();
			var sliderHandle = $(".ui-slider-handle",handleHelper);
			//change overflow to hidden now that slider handles the scrolling
			scrollPane.css( {"overflow": "hidden"} );

			upRoll.bind("mousedown",function(){
				if(currentPos == 100){return;}

				if ( scrollContent.height() > scrollPane.height() ) {
					//console.log(ui.value);
					scrollContent.css( "margin-top", Math.round(
						( 100 - (currentPos + 1) ) / 100 * ( scrollPane.height() - scrollContent.height() )
					) + "px" );
					sliderHandle.css("bottom",100 - ( 100 - (currentPos + 1) ) +"%");
				} else {
					scrollContent.css( "margin-top", 0 );
					sliderHandle.css("bottom",0);
				}
				currentPos = currentPos + 1; 
			})
			downRoll.bind("mousedown",function(){
				if(currentPos == 0){return;}

				if ( scrollContent.height() > scrollPane.height() ) {
					//console.log(ui.value);
					scrollContent.css( "margin-top", Math.round(
						( 100 - (currentPos - 1) ) / 100 * ( scrollPane.height() - scrollContent.height() )
					) + "px" );
					sliderHandle.css("bottom",100 - ( 100 - (currentPos - 1) ) +"%");
				} else {
					scrollContent.css( "margin-top", 0 );
					sliderHandle.css("bottom",0);
				}
				currentPos = currentPos - 1;  
			})
			
			//size scrollbar and handle proportionally to scroll distance
			function sizeScrollbar() {
				var remainder = scrollContent.height() - scrollPane.height();
				var proportion = remainder / scrollContent.height();
				var handleSize = scrollPane.height() - ( proportion * scrollPane.height() );
				//保持拖动条最小为40px
				if(handleSize < 40){
					handleSize = 40;
				}
				scrollbar.find( ".ui-slider-handle" ).css({
					height: handleSize
					,"margin-top": -(handleSize / 2)
				});
				handleHelper.height( "" ).height( Number(scrollbar.height()- handleSize - 2).toFixed());
				var h = scrollBarWrap.height() - handleHelper.height();
				handleHelper.css( { "margin-top" : h + "px" });
			}
			
			//change handle position on window resize
			$( window ).resize(function() {
				sizeScrollbar();
			});
			
			setTimeout( sizeScrollbar, 10 );//safari wants a timeout
    };
	var methods = {
		
	}
	//合并参数
	function setOptions(options) {
		defaults = $.extend({}, defaults, options);
		return defaults;
	}
	//得到参数集合
	function getOptions() {
		return defaults;
	}
})(jQuery);