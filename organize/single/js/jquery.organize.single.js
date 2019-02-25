// JavaScript Document
(function ($) {
    $.fn.zl_organize_single = function (options) {
        var defaults = {
			data: []//层级数据结构
        };
		$.extend({
			levelFor: function(data, obj){
				//循环树形数据结构
			 	$.each(data,function(i,val){
					var name = val.name,//节点名称
						levelSe = val.levelSe,//节点标识
						levelId = val.levelId,//节点标识
						childs = val.childs,//子节点数组
						levels = levelSe.split("-").length,
						li = $("<li>")
							.attr({"levelse":levelSe,"levelId":levelId}),//层级节点唯一标识属性
						a = $("<a>").text(name).appendTo(li);
					li.appendTo(obj);
					//创建子节点
					if(childs.length > 0){
						var ul = $("<ul>");
						ul.appendTo(li);
						//层级结构ul,li的错层显示，不是由ul或li的padding形成的，而是由a标签的动态padding形成，折叠三角离边的距离是由background-position的动态值形成。
						//10:左边距
						//20:折叠三角和文字距离
						a
						.css({"background-position":10 + 20 * (levels - 1),"padding-left":10 + 20 + 20 * (levels - 1)})
						.addClass("icon");
						//递归构建下层树形节点
						$.levelFor(childs, ul);
					} else if(childs.length == 0 && levelSe.split("-").length != 1){//叶子节点
						a
						.css({"padding":0,"padding-left":10 + 20 * (levels - 1)});
					}
					
					//展开层级
					/*(li.on("click","a",function(){
						var that = $(this);
						alert(that.html())
						if(that.hasClass("icon")){
							a.parent("li").find("ul").toggle();
						} else {
							$("a",obj).removeClass("hover");
							that.addClass("hover");
						}
					})*/
					a.bind("click",function(){
						var that = $(this);
						if(that.hasClass("icon")){
							a.parent("li").find("ul").toggle();
						}else {
							var ow = $(obj).parents(".organize-single-wrapper:first");
							$(".level-ul a",ow).removeClass("hover");
							that.addClass("hover");
						}
					})
				})
			}
		})
        setOptions(options);
        var opts = [];
        var obj = $(this);
		var data = getOptions().data;
		
		//创建组织层级区域
		$.levelFor(data, obj);
		
        //合并参数
        function setOptions(options) {
            defaults = $.extend(defaults, options);
            return defaults;
        }

        //得到参数集合
        function getOptions() {
            return defaults;
        }

        return obj;
    };
})(jQuery);