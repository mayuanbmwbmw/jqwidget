// JavaScript Document
(function ($) {
    $.fn.searchStyle = function (options) {
        var defaults = {
            hasClose: false,
            hasEnter: false,
            btnW: 18,
            enterCallback: $.noop()
        };
        setOptions(options);
        this.each(function () {
            var obj = $(this);
            var h = obj.outerHeight();
            var w = obj.outerWidth();
            var p_obj = obj.parent();
            var texts = obj.attr("msg");
            var div_forms = $("<div class='div_forms'/>");
            var i = 0;
            if (defaults.hasClose){
                i++;
            }
            if (defaults.hasEnter){
                i++;
            }
            div_forms.width(w+defaults.btnW*i);
            div_forms.height(h);

            div_forms.appendTo(p_obj);
            var div_text = $("<div class='div_text'/>");
            div_text.attr("msg", texts);
            div_text.text(texts);
            div_text.appendTo(div_forms);
            if ($.nodeName(obj[0], "INPUT")) {
                div_text.css({"top": (h - div_text.outerHeight()) / 2, "left": "2px"});
            } else {
                div_text.css({"top": "2px", "left": "2px"});
            }
            obj.appendTo(div_forms);

            var btn_empty = $("<span class='btn_empty'></span>");
            var btn_enter = $("<span class='btn_enter'></span>");
            if(defaults.hasEnter){
                btn_enter.appendTo(div_forms)
                    .bind("click",function(){
                        !!defaults.enterCallback&&defaults.enterCallback.call(obj,obj.val());
                    });
                btn_enter.css({"top": (h - div_text.outerHeight()) / 2});
            }
			if(defaults.hasClose){
                btn_empty.appendTo(div_forms)
                    .bind("click",function(){
                        $(this).hide();
                        obj.val("").focus();
                    });
                btn_empty.css({"top": (h - div_text.outerHeight()) / 2}).hide();
            }


            var currentE = $(".div_text", p_obj);
            //文本框焦点获取
            obj.bind("focus", function (e) {
                var e = window.event || e;
                var eventTarget = e.srcElement || e.target;
                if (currentE.attr("msg") == currentE.text()) {
                    currentE.text("");
                    $(eventTarget).val("");
                    //$(eventTarget).css('color','#6084a4');
                }
            });
            //文本框焦点移出
            obj.bind("blur", function (e) {
                var e = window.event || e;
                var eventTarget = e.srcElement || e.target;
                if (currentE.text() == "" && $(eventTarget).val() == "") {
                    currentE.text(currentE.attr("msg"));
                    //currentE.css('color','#a0a0a0');
                }

            });
            //为搜索联系人绑定删除事件
            obj.bind("input propertychange", function(){
                if($(this).val().length>0){
                    $(this).siblings(".btn_empty").show().css("display","inline-block");
                }else{
                    $(this).siblings(".btn_empty").hide();
                }
            });
			//捕捉输入框回车事件
			obj.bind("keydown",function(e){
				var code = e.keyCode || e.which;
				if(code == 13){
					!!defaults.enterCallback&&defaults.enterCallback.call(obj,obj.val());
				
				}
			})
        });

        //合并参数
        function setOptions(options) {
            defaults = $.extend(defaults, options);
            return defaults;
        }

        //得到参数集合
        function getOptions() {
            return defaults;
        }
    };

})(jQuery);