// JavaScript Document
$(function(){
	editWraper();
	//��ӵ�ѡ�ֻ����ѡ��ɾ���������޸ġ�
	$(".enterBlock.noEdit").each(function(){
		contentBlockEvent($(this));
	})
})
function editWraper(){
	//��ֹ����������Ԫ�ش���������click�¼���
	$(".editContainer").delegate("*","click",function(event){
		var e = e||event;
		e.stopPropagation();
	})
	//���������ʹ������ý��㡣
	$(".editContainer").bind("click",function(){
		$(".selItem").focus();
	})
}
//��������keydown�����¼�
function okd(e,obj){
	var e = window.event || e;
	var code;
	//��ͬ�������ȡ���ֺš�keycode.����������Ϊ��ʱ�����������ݿ顣
	if(((e.keyCode && e.keyCode == 186) || (e.which && e.which == 59)) && $(obj).val() != ""){
		creatItem(obj);
		return false;
	}
}
//��������keyup�����¼�
function oku(e,obj){
	var e = window.event || e;
	var code;
	//��ͬ�������ȡ���ֺš�keycode.
	if((e.keyCode && e.keyCode == 186)  || (e.which && e.which == 59)){
		//������ɣ����ѭ��ʹ�õ������
		$(obj).val("");
		return true;
	}
}
//��������blur�����¼�
function ob(e,obj){
	if($(obj).val() == ""){return}
	creatItem(obj);
	$(obj).attr("size",2);
}
//�������ݿ顣
function creatItem(obj){
	//���ݿ�����
	var enterBlock = $("<div class='enterBlock' unselectable='on'/>");
	//����
	var b = $("<b/>");
	//�ֺ�
	var span = $("<span class='semicolon'/>");
	b.appendTo(enterBlock);
	span.appendTo(enterBlock);
	b.text($(obj).val());
	span.text(";");
	enterBlock.insertBefore(".itemWraper");
	//���ݿ�over��click�¼�
	contentBlockEvent(enterBlock);
	//���ݿ�˫���¼�
	enterBlock.bind("dblclick",function(){
		enterBlock.removeClass("enterBlock_select");
		//�����ɱ༭���ݿ��滻b
		var text = $("b",enterBlock).text();
		var input = $("<input class='selItem_new' type='text' size='2' maxlength='100'/>");
		input.css("width",$("b",enterBlock).width());
		input.prependTo(enterBlock);
		//�������ַ����ȣ�inputԪ�ؿ������Ӧ��
		input.bind("keypress",function(){
			checkLength(this);
		})
		//input�༭��ʧȥ����ʱ��b�滻input
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
//input�������ַ�����
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
//���ݿ�over��click�¼�
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
		//bodyע���¼������ʱ���ݿ���ʽ�ָ���
		$("body").bind("click",{enterBlock: enterBlock},contentBlock_bodyclick);
		//���body�ļ����¼���backspace��delete
		$("body").bind("keydown",{enterBlock: enterBlock},contentBlock_bodykeydown);
	})
}
var contentBlock_bodykeydown = function(e){
	var enterBlock = e.data.enterBlock;
	var e = window.event || e;
	var code = e.keyCode || e.which;
	//����û�������ݿ��������С�
	if((code == 46 || code == 8)  && !$(":focus").hasClass("selItem_new")){
		//ɾ�����ݿ�
		enterBlock.remove();
		$(this).unbind("keydown",contentBlock_bodykeydown);
		//backspaceȡ��Ĭ������������¼�
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
	//���body���¼���
	$(this).unbind("click",contentBlock_bodyclick);
}