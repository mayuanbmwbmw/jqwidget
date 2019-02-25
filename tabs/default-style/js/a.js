// JavaScript Document
(function ($) {
	/**
	*event: 触发事件方法
	*c_w: 标签页面宽度
	*c_h:标签页面高度
	*current_select:初始化时选中第几个标签
	*/
	var defaults = {
		event: 'click',
		c_w: '100%',
		c_h: '100%',
		current_select:0
	};
    $.fn.zl_tabs = function ( options ) {
			setOptions( options );
			var opts = getOptions();
			var obj = $( this );
			var li_array = $("> ul > li",obj);
			li_array.each(function( index, ele ){
								var that_a,
									that_span,
									that_a_href,
									tabs_parts,
									eleObj,
									panel_c_class,
									ele_class;
								eleObj = $( ele );	
								ele_class = eleObj.attr("class");
								panel_c_class = ele_class + "_c";
								tabs_parts = $("<ul class = 'tabs_parts' />");
								tabs_parts.appendTo( eleObj );
								$("<li class='leftBorder leftBorder_normal' />").appendTo( tabs_parts );
								$("<li class='contentInner contentInner_normal' />").appendTo( tabs_parts );
								$("<li class='rightBorder rightBorder_normal' />").appendTo( tabs_parts );
								that_a = eleObj.find("a");
								
								//当前tab是否是加载远程页面
								if(that_a.length != 0){
									that_a_href = that_a.attr("href");
									//注销锚点默认事件
									that_a.attr("href","javascript:void(0)");
									that_a.appendTo( $(".contentInner", eleObj) );
									eleObj.bind(opts.event,function(){
										methods._load_remote( eleObj, obj, that_a_href, panel_c_class );
										methods._li_click( eleObj, obj );
								  	})  
									eleObj.hover(function(){methods._li_over( eleObj )}, function(){methods._li_out( eleObj )});
								}else{
									that_span = eleObj.find("span");
									that_span.appendTo($(".contentInner", eleObj));
									$("." + panel_c_class,obj).css({width:opts.c_w, height:opts.c_h});
									eleObj.bind( opts.event, function(){
										methods._panel_view( eleObj, obj, panel_c_class );
										methods._li_click( eleObj, obj );
									})
									eleObj.hover(function(){methods._li_over( eleObj )}, function(){methods._li_out( eleObj )});
								}
			
			})
			//默认选中第一个tab
			$("> ul > li:eq("+ opts.current_select +")",obj).trigger( opts.event );
    };
	var methods = {
		//点击切换tab样式
		_li_click:function(eleObj, obj){
			$("li.selectedTab",obj).each(function(){ 
				$(this).removeClass("selectedTab");
				$(".leftBorder",this).removeClass("leftBorder_down");
				$(".leftBorder",this).addClass("leftBorder_normal");
				$(".contentInner",this).removeClass("contentInner_down");
				$(".contentInner",this).addClass("contentInner_normal");
				$(".rightBorder",this).removeClass("rightBorder_down");
				$(".rightBorder",this).addClass("rightBorder_normal");
			})
			
			$(".leftBorder",eleObj).removeClass("leftBorder_over");
			$(".leftBorder",eleObj).removeClass("leftBorder_normal");
			$(".leftBorder",eleObj).addClass("leftBorder_down");
			$(".contentInner",eleObj).removeClass("contentInner_over");
			$(".contentInner",eleObj).removeClass("contentInner_normal");
			$(".contentInner",eleObj).addClass("contentInner_down");
			$(".rightBorder",eleObj).removeClass("rightBorder_over");
			$(".rightBorder",eleObj).removeClass("rightBorder_normal");
			$(".rightBorder",eleObj).addClass("rightBorder_down");
			eleObj.addClass("selectedTab");
		},
		//鼠标over切换tab样式
		_li_over:function(eleObj){
			var selectedBoolean = $(eleObj).hasClass("selectedTab");
			if(!selectedBoolean){
				$(".leftBorder",eleObj).removeClass("leftBorder_normal");
				$(".leftBorder",eleObj).addClass("leftBorder_over");
				$(".contentInner",eleObj).removeClass("contentInner_normal");
				$(".contentInner",eleObj).addClass("contentInner_over");
				$(".rightBorder",eleObj).removeClass("rightBorder_normal");
				$(".rightBorder",eleObj).addClass("rightBorder_over");
			}
			
		},
		//鼠标out切换tab样式
		_li_out:function(eleObj){
			var selectedBoolean = $(eleObj).hasClass("selectedTab");
			if(!selectedBoolean){
				$(".leftBorder",eleObj).removeClass("leftBorder_over");
				$(".leftBorder",eleObj).addClass("leftBorder_normal");
				$(".contentInner",eleObj).removeClass("contentInner_over");
				$(".contentInner",eleObj).addClass("contentInner_normal");
				$(".rightBorder",eleObj).removeClass("rightBorder_over");
				$(".rightBorder",eleObj).addClass("rightBorder_normal");
			}
		},
		//构建加载内容层panel,并加载远程服务器页面。
		_load_remote:function(eleObj, obj, that_a_href, panel_c_class){
			var ele_loadType,
				iframe_ele,
				panel_c;
			var that = this;
			ele_loadType = eleObj.attr("load");
			//是否第一次点击时创建
			if($("." + panel_c_class,obj).length != 0){
				//是否每次点击重新加载
				if(ele_loadType == "true"){
					$("iframe","." + panel_c_class,obj).attr("src",that_a_href);
				}
			}else{
				panel_c = $("<div class = " + panel_c_class + " />");
				panel_c.css({width:getOptions().c_w, height:getOptions().c_h});
				iframe_ele = $("<iframe width = '100%' height = '100%' frameborder = '0' allowTransparency = 'true'/>");
				panel_c.appendTo(obj);
				iframe_ele.appendTo( panel_c );
				
				iframe_ele.attr("src", that_a_href);
				window.setTimeout(function(){iframe_ele.attr("onload",that._ifraLoad(iframe_ele, panel_c));},100)
				//iframe_ele.attr("onload",that._ifraLoad(iframe_ele, panel_c));
			}
			this._panel_view( eleObj, obj, panel_c_class );
		},
		//隐藏所有内容层panel,显示当前选中内容层。
		_panel_view:function(eleObj, obj, panel_c_class){
			$("div[class$='_c']", obj).hide();
			$("." + panel_c_class, obj).show(); 
		},
		
		_ifraLoad:function(obj, panel_c){
			var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
			var _iframeDoc =  !isChrome? obj.get(0).contentWindow.document.documentElement: obj.get(0).ownerDocument.documentElement;
			var ifra_height = $(_iframeDoc)[0].scrollHeight;
			panel_c.css({height:ifra_height});
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