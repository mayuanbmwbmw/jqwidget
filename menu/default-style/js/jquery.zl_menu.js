// JavaScript Document
(function ($) {
	var defaults = {
		animation: {opacity: 'show'},
		animationOut: {opacity: 'hide'},
		speed: 'normal',
		speedOut: 'normal',
		nextLevelW:null
	};
    $.fn.zl_menu = function ( options ) {
		setOptions( options );
		var obj,
			first_menu;
		obj = $( this );
		first_menu = $(">li",obj);
		obj.css({height:first_menu.first().outerHeight(true)})
		methods._creat_childs(first_menu, obj);
    };
	var methods = {
		_li_first_over:function(obj,eleObj){
			var secondMenuTop,
				secondMenuLeft,
				secondMenuStyle,
				that;
			that = this;
			secondMenuTop = eleObj.offset().top;
			secondMenuLeft = eleObj.offset().left;
			//横竖菜单二级菜单位置
			if(obj.hasClass("zl_menu_vertical")){
				secondMenuStyle = {"top":secondMenuTop,"left":secondMenuLeft+eleObj.outerWidth()}
			}else{
				secondMenuStyle = {width:getOptions().nextLevelW ? getOptions().nextLevelW : eleObj.outerWidth(),"top":secondMenuTop+obj.height(),"left":secondMenuLeft}
			}
			that._animate(eleObj, secondMenuStyle);
		},
		_li_level_over:function(obj,eleObj,i){
			var levelStyle,
				that;
			that = this;
			//横竖菜单二级以下菜单位置
			levelStyle = {"top":obj.height()*i,"left":eleObj.parent("ul:first").outerWidth()}
			that._animate(eleObj, levelStyle);
		},
		_creat_childs:function(first_menu, obj){
			var that = this;
			first_menu.each(function( i , e){
				 var eleObj = $(e),
				 o;
				 if($(">ul",eleObj).length == 0){
					eleObj.hover(function(){eleObj.addClass("zl_menu_li_over");},function(){eleObj.removeClass("zl_menu_li_over");})
				 	eleObj.bind("click",function(){/*$(">li",obj).removeClass("zl_menu_li_down");eleObj.addClass("zl_menu_li_down")*/});
				 }else{
					eleObj.hover(function(){
						eleObj.addClass("zl_menu_li_over");
						if(obj.hasClass("zl_menu")){
							methods._li_first_over(obj,eleObj);
						}else{
							methods._li_level_over(obj,eleObj,i);
						}
						$(">ul",eleObj).each(function(j , k)  { 
						   var first_menu = $(">li",k);
						   that._creat_childs(first_menu, eleObj);
						})
					 },
					 function(){
						o = getOptions();
						eleObj.removeClass("zl_menu_li_over");
						$(">ul",eleObj)
						.stop(true, true)
						.animate(o.animationOut, o.speedOut);
					 })
				 	//eleObj.bind("click",function(){显示二级菜单});
				 }
			})
		},
		_animate:function(eleObj, levelStyle){
			var o = getOptions();
			
			$(">ul",eleObj)
			.css(levelStyle)
			.stop(true, true)
			.animate(o.animation, o.speed);
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