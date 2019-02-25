// JavaScript Document
(function ($) {
	var defaults;
    $.fn.inputBt = function ( options ) {
		defaults = {
			w: 200
			,h: 26
			,imgClick: null
			,text: null
		};
		setOptions( options );
		var opts = getOptions();
		var objArray = $( this );
		objArray.each(function( index, ele){
			var obj = $( this );   
			//避免重复应用组件样式
			if($(".select-container",obj).length != 0){return true;}
			obj.addClass("inputBt");
			var container = $("<a class='select-container' onclick='return false;' tabindex='-1' />");
			var content = $("input",obj);
			var icon = $("<div />");
			getOptions().text != null ? icon.text(getOptions().text) : icon.addClass("icon");
			content.appendTo(container);
			icon.appendTo(container);
			container.appendTo(obj);
			obj.width(getOptions().w);
			container.height(getOptions().h);
			container.css("line-height",getOptions().h + "px");
			var ih = container.innerHeight();
			var iconw = icon.outerWidth();
			//input控件宽度,高度
			//10是container的内边距和边框宽度之和。
			content.width(getOptions().w - 10 - iconw);
			content.height(ih);
			icon.bind("click",function(){
			   $.isFunction(opts.imgClick)?opts.imgClick():methods._clean(obj);
		   	});
		})
		return objArray;
    };
	var methods = {
		_clean:function(obj){
			$("input",obj).val("");
		}
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