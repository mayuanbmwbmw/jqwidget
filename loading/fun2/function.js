// JavaScript Document
function loading(iframe_name){
	var mask_div = $("<div class='mask_loading'/>");
	var loading_img = $("<div class='loading_img'/>");
	mask_div.css({"width":"100%","height":document.documentElement.scrollHeight});
	loading_img.appendTo(mask_div);
	mask_div.appendTo("body");
	var iframe = document.getElementsByName(iframe_name)[0];
	if (iframe.attachEvent){ 
		iframe.attachEvent("onload",function(){
			setTimeout(function(){mask_div.remove()},1000);
		})
	}else{
		iframe.onload = function(){
			setTimeout(function(){mask_div.remove()},1000);
		}
	}
}