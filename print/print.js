// JavaScript Document
(function($){
	$.printFun = function(){
		_pageSetup_Null();
		var temp = $("<div/>");
		temp.appendTo("body").hide();
		$("div.PrintArea").each(function(){
			var areaClone = $(this).clone();
			areaClone.appendTo(temp);
		})
		alert(temp.html());
  		temp.printArea();
		temp.remove();
	}
	_pageSetup_Null = function(){  
		var hkey_root,hkey_path,hkey_key;  
		hkey_root="HKEY_CURRENT_USER";  
		hkey_path="\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
		try{  
			var RegWsh = new ActiveXObject("WScript.Shell") ;  
			hkey_key="header" ;  
			RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"") ;  
			hkey_key="footer" ;  
			RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"") ;  
		 }  
		catch(e){}  
	}  
})(jQuery)