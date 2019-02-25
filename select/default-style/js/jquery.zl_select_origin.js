// JavaScript Document
(function ($) {
    $.fn.zl_select = function ( options ) {
		this.defaults = {
			w: 200
			,h: 26
			,items_w: null
			,items_h: null
		};
		this.defaults = setOptions( options, this );
		var opts = getOptions( this );
		var objArray = $( this );
		var that = this;
		objArray.each(function( index, ele){
			var obj = $( this );    
			//避免重复应用组件样式
			if($(".select-container",obj).length != 0){return true;}
			var container = $("<a class='select-container' onclick='return false;' href='#' tabindex='-1' />");
			var content = $("<span />");
			var icon = $("<div />");
			content.appendTo(container);
			icon.appendTo(container);
			container.appendTo(obj);
			obj.width(getOptions( that ).w);
			container.height(getOptions( that ).h);
			container.css("line-height",getOptions( that ).h + "px");
			var top = container.offset().top;
			var left = container.offset().left;
			var iw = container.innerWidth();
			var oh = container.outerHeight();
			var iconw = icon.outerWidth();
			//内容区宽度
			//10是container的内边距和边框宽度之和。
			content.width(getOptions( that ).w - 10 - iconw);
			
			var drop = $("<div class='select-drop' />");
			var items = $("<ul class='items' />");
			items.appendTo(drop);
			drop.appendTo("body");
			var selectEle = $(">select",obj);
			var opts = selectEle.find("option");
			
			//初始化时，select元素的当前值。
			var copt = selectEle.find("option:selected");
			var cv = copt.attr("value");
			
			//当select元素触发change时，select组件自动变更值。
			$(obj).delegate(selectEle,"change",function(e){
				var cv = $(selectEle).val();
				$("li",items).each(function(i,ele){
					var v = $(ele).attr("v");
					if(cv == v){
						$(">span",container).text($(ele).text());
						$("li",items).removeClass("down");
						$(ele).addClass("down");
					}
				}) 
			})
			
			//分解select元素项，构建select组件结构。
			opts.each(function(i,d){
			   var o = $("<li />");
			   o.appendTo(items);
			   var txt = $(d).text();
			   var val = $(d).attr("value");
			   o.text(txt);
			   o.attr("v",val);
			   
			   if(cv == val){
				   //设置默认当前值
				   $(">span",container).text(txt);
				   $("li",items).removeClass("down");
				   o.addClass("down");
			   }
			   //select组件item项绑定事件。
			   methods._item_click(o,selectEle,container,txt,items,drop);
			   methods._item_hover(o);
			})
			
			//select组件内容框绑定事件。
			container.bind("click",function(){
				if(selectEle.attr("disabled")){return;}//select被disabled。
				if(drop.is(":hidden")){
					drop.show();
					var top = container.offset().top;
					var left = container.offset().left;
					var iw = container.innerWidth();
					var w = container.width();
					var oh = container.outerHeight();
					var iconw = icon.outerWidth();
					var dropHeight;
					if(getOptions( that ).items_h){
						dropHeight = getOptions( that ).items_h;
					}else{
						dropHeight = "auto";
					}
					drop.css({"top": top + oh, "left": left, "width": getOptions( that ).items_w ? getOptions( that ).items_w : iw, "height": dropHeight });
					//内容区宽度
					content.width(getOptions( that ).w - 10 - iconw);
					//触发body,隐藏select组件下拉项。
					$(document).delegate("body","click",function(e){
						var evt = e.target;
						//点击事件触发元素是select组件内容框时，不隐藏select组件下拉项。
						if($(evt).closest("a.select-container").length == 0){
							drop.hide();
							$(document).undelegate("body","click");
						}
					})
				}else{
					drop.hide();
				}
				
			})
			
			//当select下拉选项集合有改变时，组件下拉需要重新获取新的集合。
			objArray.reloadData = function(obj){
				var opts,copt,cv,obj;
				items.empty();
				opts = selectEle.find("option");
				//初始化时，select元素的当前值。
				copt = selectEle.find("option:selected");
				cv = copt.attr("value");
				//分解select元素项，构建select组件结构。
				opts.each(function(i,d){
				   var o = $("<li />");
				   o.appendTo(items);
				   var txt = $(d).text();
				   var val = $(d).attr("value");
				   o.text(txt);
				   o.attr("v",val);
				   
				   if(cv == val){
					   //设置默认当前值
					   $(">span",container).text(txt);
					   $("li",items).removeClass("down");
					   o.addClass("down");
				   }
				   
				  //select组件item项绑定事件。
				   methods._item_click(o,selectEle,container,txt,items,drop);
				   methods._item_hover(o);
				})
			}
		})
		
		return objArray;
    };
	var methods = {
		_item_click:function(o,selectEle,container,txt,items,drop){
			o.bind("click",function(){   
			   var v = o.attr("v");
			   selectEle.val(v);
			   $(">span",container).text(txt);
			   $("li",items).removeClass("down");
			   o.addClass("down");
			   drop.hide();   
			   //触发select的change事件
			   selectEle.trigger("change");
			}) 
			
		},
		_item_hover:function(o){
		   o.hover(function(){
				$(this).addClass("over");
			},
			function (){
				$(this).removeClass("over");
			})
		}
	}
	//合并参数
	function setOptions(options, t) {
		t.defaults = $.extend({}, t.defaults, options);
		return t.defaults;
	}
	//得到参数集合
	function getOptions(t) {
		return t.defaults;
	}
})(jQuery);