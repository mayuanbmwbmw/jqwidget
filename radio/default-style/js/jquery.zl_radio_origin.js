// JavaScript Document
(function ($) {
    $.fn.zl_radio = function () {
			var radio_array = $("div.zl_radio");
			radio_array.each(function( index, ele ){
								var eleObj,
									eleName;
								eleObj = $( ele );	
								eleName = eleObj.attr("name");
								eleObj.bind("hover",function(){},function(){});
								eleObj.bind("click",function(){
								 	$("div.zl_radio[name="+eleName+"]").removeClass("zl_radio_down");
								 	$("div.zl_radio[name="+eleName+"]").addClass("zl_radio_normal");
								 	eleObj.addClass("zl_radio_down");
								})
								//将radio组件样式恢复默认
								$("div.zl_radio[name="+eleName+"]")
								.removeClass("zl_radio_down")
								.addClass("zl_radio_normal");
								//根据radiobutton的选中状态，设置raido组件的选中样式。
								$(":radio:checked","div.zl_radio[name="+eleName+"]")
								.parent("div.zl_radio")
								.removeClass("zl_radio_normal")
								.addClass("zl_radio_down");
			
			})
    };
	var methods = {}
})(jQuery);