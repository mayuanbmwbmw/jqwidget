// JavaScript Document
(function ($) {
    $.fn.formsStyle = function () {
        this.each(function () {
			var obj = $(this);
			var h = obj.outerHeight();
			var w = obj.width();
			var p_obj = obj.parent();
			var texts = obj.attr("msg");
			var div_forms = $("<div class='div_forms'/>");
			div_forms.width(w);
			div_forms.height(h);
			
			div_forms.prependTo(p_obj);
			var div_text = $("<div class='div_text'/>");
			div_text.attr("msg",texts);
			div_text.text(texts);
			div_text.appendTo(div_forms);
			obj.appendTo(div_forms);
			var currentE = $(".div_text",p_obj);
			obj.bind("focus",function(e){
				var e = window.event||e;
				var eventTarget = e.srcElement||e.target;
				if(currentE.attr("msg") == currentE.text()){
					currentE.text("");
					$(eventTarget).val("");
					//$(eventTarget).addClass("input_focus");
				} 
												 
			});
			obj.bind("blur",function(e){
				var e = window.event||e;
				var eventTarget = e.srcElement||e.target;
				if(currentE.text() == "" && $(eventTarget).val() == ""){
					currentE.text(currentE.attr("msg"));
					//$(currentE).addClass("div_text_blur");
				} 
												 
			});

        }); 
    }; 

})(jQuery);