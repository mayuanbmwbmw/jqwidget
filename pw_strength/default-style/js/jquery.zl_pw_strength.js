// JavaScript Document
(function ($) {
	var defaults = {
		pw_level: 'strong',
		name: ''
	};
    $.fn.zl_pw_strength = function ( options ) {
			setOptions( options );
			var opts = getOptions();
			var eleObj;
			var eleObj = $("div.pw_strength[name="+opts.name+"]");
			eleObj.empty();
			var pw_strength_text = $("<div class='pw_strength_text' />");
			
			pw_strength_text.appendTo(eleObj);
			$("<div class='pw_level_text' />").text("弱").appendTo(pw_strength_text);
			$("<div class='pw_level_text' />").text("中").appendTo(pw_strength_text);
			$("<div class='pw_level_text' />").text("强").appendTo(pw_strength_text);
			
			var pw_strength_color = $("<div class='pw_strength_color' />");
			pw_strength_color.appendTo(eleObj);
			$("<div class='pw_lower pw_bg' />").appendTo(pw_strength_color);
			$("<div class='pw_middle pw_bg' />").appendTo(pw_strength_color);
			$("<div class='pw_strong pw_bg' />").appendTo(pw_strength_color);
			
			methods._creat_pw_part( eleObj, opts.pw_level );
			
    };
	var methods = {
		_creat_pw_part:function( eleObj, pw_level ){
			switch( pw_level ){
				case "lower":
					$(".pw_strength_color .pw_lower", eleObj).addClass("pw_four_radius pw_lower_color");
					break; 
				case "middle":
					$(".pw_strength_color .pw_lower", eleObj).addClass("pw_left_radius pw_middle_color");
					$(".pw_strength_color .pw_middle", eleObj).addClass("pw_right_radius pw_middle_color");
					break;
				case "strong":
					$(".pw_strength_color .pw_lower", eleObj).addClass("pw_left_radius pw_strong_color");
					$(".pw_strength_color .pw_middle", eleObj).addClass("pw_strong_color");
					$(".pw_strength_color .pw_strong", eleObj).addClass("pw_right_radius pw_strong_color");
					break;
				default:
					break;
				
			}
			
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