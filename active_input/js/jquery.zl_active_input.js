// JavaScript Document
$(function(){
	editWraper();
	//添加的选项，只可以选中删除，不可修改。
	$(".enterBlock.noEdit").each(function(){
		contentBlockEvent($(this));
	})
})
function editWraper(){
	//阻止容器内其它元素触发容器的click事件。
	$(".editContainer").delegate("*","click",function(event){
		var e = e||event;
		e.stopPropagation();
	})
	//点击容器，使输入框获得焦点。
	$(".editContainer").bind("click",function(){
		$(".selItem").focus();
	})
}
//输入框鼠标keydown触发事件
function okd(e,obj){
	var e = window.event || e;
	var code;
	//不同浏览器获取”分号“keycode.当输入内容为空时，不创建内容块。
	if(((e.keyCode && e.keyCode == 186) || (e.which && e.which == 59)) && $(obj).val() != ""){
		creatItem(obj);
		return false;
	}
}
//输入框鼠标keyup触发事件
function oku(e,obj){
	var e = window.event || e;
	var code;
	//不同浏览器获取”分号“keycode.
	if((e.keyCode && e.keyCode == 186)  || (e.which && e.which == 59)){
		//输入完成，清空循环使用的输入框。
		$(obj).val("");
		return true;
	}
}
//输入框鼠标blur触发事件
function ob(e,obj){
	if($(obj).val() == ""){return}
	creatItem(obj);
	$(obj).attr("size",2);
}
//创建内容块。
function creatItem(obj){
	//内容块容器
	var enterBlock = $("<div class='enterBlock' unselectable='on'/>");
	//内容
	var b = $("<b/>");
	//分号
	var span = $("<span class='semicolon'/>");
	b.appendTo(enterBlock);
	span.appendTo(enterBlock);
	b.text($(obj).val());
	span.text(";");
	enterBlock.insertBefore(".itemWraper");
	//内容块over和click事件
	contentBlockEvent(enterBlock);
	//内容块双击事件
	enterBlock.bind("dblclick",function(){
		enterBlock.removeClass("enterBlock_select");
		//创建可编辑内容框替换b
		var text = $("b",enterBlock).text();
		var input = $("<input class='selItem_new' type='text' size='2' maxlength='100'/>");
		input.css("width",$("b",enterBlock).width());
		input.prependTo(enterBlock);
		//输入检查字符长度，input元素宽度自适应。
		input.bind("keypress",function(){
			checkLength(this);
		})
		//input编辑框失去焦点时，b替换input
		input.bind("blur",function(){
			var text = $("input",enterBlock).val();
			if(text == ""){enterBlock.remove();return}
			var b = $("<b/>");
			b.prependTo(enterBlock);
			b.text(text);
			$("input",enterBlock).remove();
		})
		input.val(text);
		input.focus();
		$("b",enterBlock).remove();
	})
	enterBlock.bind("blur",function(){
		$(this).removeClass("enterBlock_select");
	})
	$(obj).val("");
}
//input框输入字符长度
function checkLength(which) {
	$(which).removeAttr("style");
    var maxchar=100;
	iCount = which.value.replace(/[^\u0000-\u00ff]/g,"aa").length;
    if(iCount<=maxchar)
    {
   	 	which.size=iCount+2;
    }
    else;
}
//内容块over和click事件
function contentBlockEvent(enterBlock){
	enterBlock.hover(function(){
		enterBlock.addClass("enterBlock_over");
	},
	function(){
		enterBlock.removeClass("enterBlock_over");
	})
	enterBlock.bind("click",function(){
		$("body").unbind("keydown",contentBlock_bodykeydown);
		$("body").unbind("click",contentBlock_bodyclick);
		$(".editContainer .enterBlock").removeClass("enterBlock_select");
		enterBlock.removeClass("enterBlock_over");
		enterBlock.addClass("enterBlock_select");
		//body注册事件，点击时内容块样式恢复。
		$("body").bind("click",{enterBlock: enterBlock},contentBlock_bodyclick);
		//监控body的键盘事件，backspace和delete
		$("body").bind("keydown",{enterBlock: enterBlock},contentBlock_bodykeydown);
	})
}
var contentBlock_bodykeydown = function(e){
	var enterBlock = e.data.enterBlock;
	var e = window.event || e;
	var code = e.keyCode || e.which;
	//焦点没有在内容块的输入框中。
	if((code == 46 || code == 8)  && !$(":focus").hasClass("selItem_new")){
		//删除内容块
		enterBlock.remove();
		$(this).unbind("keydown",contentBlock_bodykeydown);
		//backspace取消默认浏览器回退事件
		if(e.returnValue){
			e.returnValue = false ;
		}
		if(e.preventDefault ){
			e.preventDefault();
		}                
	}
}
var contentBlock_bodyclick = function(e){
	var enterBlock = e.data.enterBlock;
	var e = window.event || e;
	enterBlock.removeClass("enterBlock_select");
	//解除body绑定事件。
	$(this).unbind("click",contentBlock_bodyclick);
}