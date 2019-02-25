// JavaScript Document
(function ($) {
	var defaults = {
		w: 400 /*容器宽度*/
	   	,h: 300 /*容器高度*/
	   	,s: "s1" /*所需要的显示样式*/
		,data: [] /*图片集合数据*/
		,showNumber: 1 /*每个场景显示图片数量*/
		,start_index: 5 /*初始化时，从第几张开始显示*/
		,autoplay: true /*是否支持自动轮播*/
	};
    $.fn.zl_slide = function ( options ) {
		setOptions( options );
		var opts = getOptions();
		var obj = $( this );
		var sf = opts.s;
		eval("styleFun."+sf)(obj, opts);
    };
	
	var styleFun = {
		/**
		* 图片数据量比较大，支持淡入动画显示效果，左右按钮切换图片。
		* 支持参数：
		w: 400
	   	,h: 300
	   	,s: "s1"
		,data: []
		,start_index: 5
		*
		**/
		s1:function(obj, opts){
			var leftDiv,
			rightDiv;
			obj.css({"width":opts.w,"height":opts.h});
			var obj_pic = $("<div />");
			obj_pic.css({"width":"100%","height":"100%","background":"url(images/pic/"+opts.data[opts.start_index]['name']+") no-repeat"});
			obj_pic.appendTo(obj);
			$(obj).data("index",opts.start_index);
			obj.hover(
				function(){
					leftDiv = $("<div class='picShow_handle_left'/>").appendTo(obj);
					rightDiv = $("<div class='picShow_handle_right'/>").appendTo(obj);
					leftDiv.css("top",(obj.height()-leftDiv.height())/2);
					rightDiv.css("top",(obj.height()-rightDiv.height())/2);
					leftDiv.bind("click",function(){methods._left_handle( obj, obj_pic, leftDiv, rightDiv )});
					rightDiv.bind("click",function(){methods._right_handle( obj, obj_pic, leftDiv, rightDiv )});
					//第一张或最后一张隐藏左右切换按钮。
					if($(obj).data("index") == 0){
						$(leftDiv,obj).hide();
					}else if($(obj).data("index") == opts.data.length-1){
						$(rightDiv,obj).hide();
					}
				},
				function(){
					leftDiv.remove();
					rightDiv.remove();
				}
			)
		},
		/**
		* 图片数据量比较大，支持淡入动画显示效果，多个点击切换按钮。
		* 支持参数：
		w: 400
	   	,h: 300
	   	,s: "s1"
		,data: []
		,start_index: 5
		*
		**/
		s2:function(obj, opts){
			obj.css({"width":opts.w,"height":opts.h});
			$(obj).data("index",opts.start_index);
			var ulEle;
			var obj_pic = $("<div />");
			obj_pic.css({"width":"100%","height":"100%","background":"url(images/pic/"+opts.data[opts.start_index]['name']+") no-repeat"});
			obj_pic.appendTo(obj);
			ulEle = $("<ul/>");
			ulEle.appendTo(obj);
			$.each(opts.data, function(i, n){
				  var liEle = $("<li/>");
				  liEle.prependTo(ulEle);
				  if(i == opts.start_index){liEle.addClass("selected")}
				  liEle.bind("click",function(){
					 $("li",ulEle).removeClass("selected");
					 liEle.addClass("selected");
					 obj_pic.hide().css({"background":"url(images/pic/"+opts.data[i]['name']+") no-repeat"}).fadeIn("slow"); 
				  })
									  
			})
			
		},
		/**
		* 图片数据量较少，支持鼠标指针滑动切换。
		* 支持参数：
		w: 400
	   	,h: 300
	   	,s: "s1"
		,data: []
		,start_index: 5
		*
		**/
		s3:function(obj, opts){
			//所有图片最外层容器
			var items = $("<div/>");
			//所有图片总宽度
			var items_w = 0;
			//记录鼠标开始拖动位置
			var mouse_start;
			//记录鼠标结束拖动位置
			var mouse_stop;
			//存储当前展示图片序号
			$(obj).data("index",opts.start_index);
			items.css({"position":"absolute"});
			items.appendTo(obj);
			//构建图片容器div
			$.each(opts.data, function(i, n){
				  var itemsDiv = $("<div/>");
				  itemsDiv.css({"width":opts.w,"height":opts.h,"float":"left","position": "relative","background":"url(images/pic/"+opts.data[i]['name']+") no-repeat"});
				  itemsDiv.appendTo(items);
				  items_w = itemsDiv.width() + items_w;  
			})
			items.width(items_w);
			//得到图片宽度高度
			var item_w = $(">div>div:eq(0)",obj).width();
			var item_h = $(">div>div:eq(0)",obj).height();
			obj.width(item_w);
			obj.height(item_h);
			//初始化所展示图片
			var current_deviation = (opts.start_index) * item_w;
			items.animate({"left":"-"+current_deviation},"slow");
			//拖拽图片层
			items.draggable({axis: 'x',
				drag:function(event, ui){},
				start:function(event, ui){
					var e = event || window.event;
					mouse_start = e.clientX;	
				},
				stop:function(event, ui){
					var e = event || window.event;
					mouse_stop = e.clientX;
					//鼠标滑动距离
					var distance = mouse_stop - mouse_start;
					var selectIndex = $(obj).data("index");
					//滑动距离决定是否滑动
					if(Math.abs(distance) >= 100){
						//向右滑动
						if(distance < 0){
							if(selectIndex == opts.data.length-1){
								items.animate({"left":"-"+current_deviation},"slow");
								return;
							}
							var deviation = (selectIndex + 1) * item_w;
							items.animate({"left":"-"+deviation},"slow");
							var nextIndex = parseInt(selectIndex)+1;
							$(obj).data("index",nextIndex);
							current_deviation = deviation;
						}else{
							//向左滑动
							if(selectIndex == 0){
								items.animate({"left":"-"+current_deviation},"slow");
								return;
							}
							var deviation = (selectIndex - 1) * item_w;
							items.animate({"left":"-"+deviation},"slow");
							var preIndex = parseInt(selectIndex)-1;
							$(obj).data("index",preIndex);
							current_deviation = deviation;
						}
					}else{
						items.animate({"left":"-"+current_deviation},"slow");
					}
				}
			})
		},
		/**
		* 图片数据量比较少，支持无缝轮播效果，左右按钮切换图片。
		* 支持参数：
		w: 400
	   	,h: 300
	   	,s: "s1"
		,data: []
		,showNumber: 1
		,start_index: 5
		*
		**/
		s4:function(obj, opts){
			//所有图片最外层容器
			var items = $("<div/>");
			//所有图片总宽度
			var items_w = 0;
			//存储当前展示图片序号
			$(obj).data("index",opts.start_index);
			items.css({"position":"absolute"});
			items.appendTo(obj);
			//构建图片容器div
			$.each(opts.data, function(i, n){
				var itemsDiv = $("<div/>");
			  	itemsDiv.css({"width":opts.w,"height":opts.h,"float":"left","position": "relative","background":"url(images/pic/"+opts.data[i]['name']+") no-repeat"});
			  	itemsDiv.appendTo(items);
			  	items_w = itemsDiv.width() + items_w;  
			})
			items.width(items_w);
			//得到图片宽度高度
			var item_w = $(">div>div:eq(0)",obj).width();
			var item_h = $(">div>div:eq(0)",obj).height();
			if(opts.showNumber){
				obj.width(item_w * opts.showNumber);
			}else{
				obj.width(item_w);
			}
			var tl = 0;
			(opts.data.length % opts.showNumber) != 0 ? tl = parseInt(opts.data.length / opts.showNumber) + 1 : tl = opts.data.length / opts.showNumber;

			obj.height(item_h);
			//初始化所展示图片
			var current_deviation = (opts.start_index) * item_w;
			items.animate({"left":"-"+current_deviation},"slow");

			//拖拽图片层
			obj.hover(
				function(){
					leftDiv = $("<div class='picShow_handle_left'/>").appendTo(obj);
					rightDiv = $("<div class='picShow_handle_right'/>").appendTo(obj);
					leftDiv.css("top",(obj.height()-leftDiv.height())/2);
					rightDiv.css("top",(obj.height()-rightDiv.height())/2);
					leftDiv.bind("click",function(){
						rightDiv.show();
						var selectIndex = $(obj).data("index");
						var preIndex = parseInt(selectIndex) - 1;
						if(preIndex == 0){
							$(leftDiv).hide();
						}
						var deviation = (selectIndex - 1) * item_w * opts.showNumber;
						items.animate({"left":"-"+deviation},"slow");
						$(obj).data("index",preIndex);
						current_deviation = deviation;
				  	});
					rightDiv.bind("click",function(){
						leftDiv.show();
					   	var selectIndex = $(obj).data("index");
					   	var nextIndex = parseInt(selectIndex) + 1;
						if(nextIndex == tl - 1){
							$(rightDiv).hide();
						}
						var deviation = (selectIndex + 1) * item_w * opts.showNumber;
						items.animate({"left":"-"+deviation},"slow");
						
						$(obj).data("index",nextIndex);
						current_deviation = deviation;   
					});
					//第一张或最后一张隐藏左右切换按钮。
					if($(obj).data("index") == 0){
						$(leftDiv,obj).hide();
					}else if($(obj).data("index") == tl - 1){
						$(rightDiv,obj).hide();
					}
				},
				function(){
					leftDiv.remove();
					rightDiv.remove();
				}
			)
		},
		/**
		* 图片数据量比较少，支持淡入动画显示效果，多个点击切换按钮。
		* 支持参数：
		w: 400
	   	,h: 300
	   	,s: "s1"
		,data: []
		,start_index: 5
		,autoplay: true
		*
		**/
		s5:function(obj, opts){
			//所有图片最外层容器
			var items = $("<div/>");
			//所有图片总宽度
			var items_w = 0;
			//存储当前展示图片序号
			var current_time;
			var click_time = new Date().getTime();
			var clearTime;
			$(obj).data("index",opts.start_index);
			items.css({"position":"absolute"});
			items.appendTo(obj);
			//构建图片容器div
			$.each(opts.data, function(i, n){
				var itemsDiv = $("<div/>");
			  	itemsDiv.css({"width":opts.w,"height":opts.h,"float":"left","position": "relative","background":"url(images/pic/"+opts.data[i]['name']+") no-repeat"});
			  	itemsDiv.appendTo(items);
			  	items_w = itemsDiv.width() + items_w;  
			})
			//在最后附加一张图片，用于无缝轮播时使用。
			if(opts.autoplay){
				var itemsDiv = $("<div/>");
			  	itemsDiv.css({"width":opts.w,"height":opts.h,"float":"left","position": "relative","background":"url(images/pic/"+opts.data[0]['name']+") no-repeat"});
			  	itemsDiv.appendTo(items);
			  	items_w = itemsDiv.width() + items_w;  
			}
			items.width(items_w);
			//得到图片宽度高度
			var item_w = $(">div>div:eq(0)",obj).width();
			var item_h = $(">div>div:eq(0)",obj).height();
			obj.width(item_w);
			obj.height(item_h);
			//初始化所展示图片
			var init_deviation = (opts.start_index) * item_w;
			items.animate({"left":"-"+init_deviation},"slow");

			//创建图片切换按钮
			var ulEle;
			ulEle = $("<ul/>");
			ulEle.appendTo(obj);
			$.each(opts.data, function(i, n){
				var liEle = $("<li/>");
			  	liEle.appendTo(ulEle);
				if(i == opts.start_index){liEle.addClass("selected")}
			  	liEle.bind("click",function(){
					window.clearInterval(clearTime);
					//$("div.others",items).remove();
					var deviation = Number(i) * item_w;
					$("li",ulEle).removeClass("selected");
					liEle.addClass("selected");
					items.stop(true).animate({"left":"-"+deviation},"slow");
					$(obj).data("index",i);
					click_time = new Date().getTime();
					//是否自动播放
					if(opts.autoplay){
						clearTime = methods._interval(clearTime, current_time, click_time, obj, item_w, ulEle, items);
					}
				})  
			})
			
			//是否自动播放
			if(opts.autoplay){
				clearTime = methods._interval(clearTime, current_time, click_time, obj, item_w, ulEle, items);
			}
		}
	}
	
	var methods = {
		_left_handle:function(obj, obj_pic, leftDiv, rightDiv){
			rightDiv.show();
			var selectIndex = $(obj).data("index");
			var preIndex = parseInt(selectIndex)-1;
			if(preIndex == 0){
				$(leftDiv).hide();
			}
			this._switch_pic(obj, obj_pic, preIndex);
		},
		_right_handle:function(obj, obj_pic, leftDiv, rightDiv){
			leftDiv.show();
			var selectIndex = $(obj).data("index");
			var nextIndex = parseInt(selectIndex)+1;
			if(nextIndex == getOptions().data.length-1){
				$(rightDiv).hide();
			}
			this._switch_pic(obj, obj_pic, nextIndex); 
		},
		_switch_pic:function(obj, obj_pic, index){
			$(obj).data("index",index);
			$(obj_pic).hide().css({
				"background":"url(images/pic/"+getOptions().data[index]['name']+") no-repeat",
				"background-color":"#ebebeb"
			}).fadeIn("slow");
		},
		_interval:function( clearTime, current_time, click_time, obj, item_w, ulEle, items ){
			var that = this;
			clearTime = setInterval(function(){
					current_time = new Date().getTime();
					if(current_time - click_time > 3000){
						var selectIndex = $(obj).data("index");
						var deviation = Number(selectIndex) * item_w;
						$("li",ulEle).removeClass("selected");
						
						//这是最后一张附加的图片即将被选中时。
						if(selectIndex == getOptions().data.length) {
							$("li:eq(0)",ulEle).addClass("selected");
						}else{
							$("li:eq("+selectIndex+")",ulEle).addClass("selected");
						}
						that._itemsPos( obj, items, selectIndex, deviation );
					}
					
				},3000);
			return clearTime;
		},
		_itemsPos:function( obj, items, selectIndex, deviation ){
			items.animate({"left":"-"+deviation},"slow",function(){
				//最后一张图片滑动过后
				if(selectIndex == getOptions().data.length-1){
					var nextIndex = parseInt(selectIndex)+1;
					$(obj).data("index",nextIndex);
				}
				//添加的最后一张图片滑动过后
				else if(selectIndex == getOptions().data.length) {
					$(obj).data("index",1);
					items.css({"left":0});
				}else{
					var nextIndex = parseInt(selectIndex)+1;
					$(obj).data("index",nextIndex);
				}
			});
			
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