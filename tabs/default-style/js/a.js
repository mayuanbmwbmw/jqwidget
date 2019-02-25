// JavaScript Document
(function ($) {
	/**
	*event: �����¼�����
	*c_w: ��ǩҳ����
	*c_h:��ǩҳ��߶�
	*current_select:��ʼ��ʱѡ�еڼ�����ǩ
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
								
								//��ǰtab�Ƿ��Ǽ���Զ��ҳ��
								if(that_a.length != 0){
									that_a_href = that_a.attr("href");
									//ע��ê��Ĭ���¼�
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
			//Ĭ��ѡ�е�һ��tab
			$("> ul > li:eq("+ opts.current_select +")",obj).trigger( opts.event );
    };
	var methods = {
		//����л�tab��ʽ
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
		//���over�л�tab��ʽ
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
		//���out�л�tab��ʽ
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
		//�����������ݲ�panel,������Զ�̷�����ҳ�档
		_load_remote:function(eleObj, obj, that_a_href, panel_c_class){
			var ele_loadType,
				iframe_ele,
				panel_c;
			var that = this;
			ele_loadType = eleObj.attr("load");
			//�Ƿ��һ�ε��ʱ����
			if($("." + panel_c_class,obj).length != 0){
				//�Ƿ�ÿ�ε�����¼���
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
		//�����������ݲ�panel,��ʾ��ǰѡ�����ݲ㡣
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
	//�ϲ�����
	function setOptions(options) {
		defaults = $.extend({}, defaults, options);
		return defaults;
	}
	//�õ���������
	function getOptions() {
		return defaults;
	}
})(jQuery);