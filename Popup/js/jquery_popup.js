// JavaScript Document
(function ($) {
	$.fn.popup = function(options){
		return $(this).click(function(){     
			   if($(".tc_popup")){$(".tc_popup").remove();}              	//判断是否存在其他弹出层，如果存在就删除
			  
			   var css_popup =                                         //自定义参数
			     {
				   Height:"200px",
				   Width:"400px",
				   Position:"fixed",
				   Border:"1px solid #515151",
				   Box_shadow:"2px 2px 6px 1px #000",
				   Background_color:"#FFF",
				   Box_class:"",
				  // Title_text:"Title",
				   Title_class:"",
				   Shade:true,
				   Opacity:0.5
				  };
				  
			var obj = $.extend(css_popup, options);
			
	        var zzc_div=$('<div></div>');//遮罩层
			      zzc_div.css({
					  "z-index":99,
					  "position":"fixed",
					  "width":"100%",
					  "height":"100%",
					  "left":"0px",
					  "top":"0px",
					  "opacity":obj.Opacity,
					  "filter":"alpha(opacity="+obj.Opacity*100+")",
					  "background-color":"#000"
					  })	
			
		    var close_popup=$("<a>关闭</a>");                              //关闭元素和样式
			    close_popup.css({
					"position":"absolute",
					"top":"0px",
					"right":"5px",
					"color":"#00F",
					"cursor":"pointer",
					"line-height":"30px"	
					});
					
				close_popup.hover(function(){
					$(this).css("transform","scale(1.2)");
					},function(){$(this).css("transform","scale(1)");});
					
					
				close_popup.click(function(){                              //关闭弹出点击事件
					  if($("#"+obj.Data_id)){
						  $("body").append($("#"+obj.Data_id));
						  $("#"+obj.Data_id).hide();
						   $(this).parent().remove();
						   zzc_div.remove();
						  }
						  else
						  {
						   $(this).parent().remove();
						   zzc_div.remove();  
							  }
					});
					
			var title_div=$("<div></div>");                    
			    title_div.css({                                             //标题默认样式
					 "font-size":"14px",
					 "height":"30px",
					 "line-height":"30px",
					 "font-family":"Microsoft Yahei",
					 "font-weight":900,
					 "border-bottom":"1px solid #515151",
					 "padding-left":"20px",
					 "display":"block"
					});
					
				title_div.text(obj.Title_text);                            //标题自定义文本
				title_div.addClass(obj.Title_class);                       //标题添加自定样式
								
			var popup_div=$('<div class="tc_popup"></div>');               //弹出层外壳和样式
			    popup_div.css({
					"min-height":obj.Height,
					"width":obj.Width,
					"position":obj.Position,
					"border":obj.Border,
					"z-index":999,
					"overflow":"hidden",
					"box-shadow":obj.Box_shadow,
					"background-color":obj.Background_color
					});
					
			$.set_zb = function(){                                         //弹出层坐标
				 popup_div.css({
					"left":($(window).width()<popup_div.width())?0:($(window).width()-popup_div.width())/2,
					"top":($(window).height()<popup_div.height())?0:($(window).height()-popup_div.height())/2
					});	
				};		
		       
			    popup_div.addClass(obj.Box_class);                             //弹出层外壳添加自定义的样式
				   
			 var main_popup=$("<div></div>");                              //内容层和样式
			     main_popup.css({
					 "padding":"10px",
					  "overflow":"hidden",
					  "min-height":parseInt(obj.Height)-55,
					  "background-color":"#FFF"			  	  
					 });
	                  
					
			$.popup_show = function(){                                      //插入弹出层
				    if(obj.Shade){$("body").append(zzc_div);} ;
					$("body").append(popup_div);
					popup_div.append(close_popup);
					if(obj.Title_text){popup_div.append(title_div);};
					popup_div.append(main_popup);
					if(obj.Data_form){$.data_add_list()};
					if(obj.Data_text){$.data_add_text()};
					if(obj.Data_table_th){$.data_add_table();};
					if(obj.Data_url){$.data_add_url()};
					if(obj.Data_id){$.data_add_obj()};
			        if(main_popup&&!$.trim(main_popup.html())){main_popup.text("暂无数据")};
				    $.set_zb();
				};	
									
				
				$.data_add_list = function(){                               //列表数据添加
					var jsonStrr = eval(obj.Data_form);
					var input_div="";
                    var str=input_div;
					for(var i in jsonStrr){ 
					    if(jsonStrr[i].nub==1){
							ys_type='<input type='+jsonStrr[i].type+'>';
							};
						if(jsonStrr[i].nub==2){
							ys_type='<textarea></textarea>';
							};
						if(jsonStrr[i].nub==3){
							 ys_type='<div>'+jsonStrr[i].text+'</div>';
							 };
						if(jsonStrr[i].nub==4){
							ys_type='<label>男</label><input type='+jsonStrr[i].type+'><label>女</label><input type='+jsonStrr[i].type+'>'
							};
						 if(jsonStrr[i].nub==null){
							 ys_type='';
							 };	    	
					 	input_div = '<div class='+jsonStrr[i]["class"]+'><span>'+jsonStrr[i].name_id+'：</span>'+ys_type+'</div>';
						str+=input_div;
						 };	
				       main_popup.append(str);
					};
					
				$.data_add_text =function(){                                   //文本数据添加
					   var data_text = eval(obj.Data_text);
					   var text_p='';
					   var str=text_p;
					   for(i=0;i<data_text.length;i++){
						   text_p='<p style="line-height:18px;text-indent:2em;overflow:hidden;margin-bottom:8px;">'+data_text[i].text+'</p>';
						   str+=text_p;
						   }
						  main_popup.append(str);
					};	
					
			  	$.data_add_table= function(){                                   //表格数据添加
					 var data_table_th = eval(obj.Data_table_th);
					 var data_table_td = eval(obj.Data_table_td);
					 var table="";
					 var str=table;
						 table='<table width="100%" cellpadding="0" cellspacing="0" border="1"><tr>';
						for(var i in data_table_th){
							table+='<th>'+data_table_th[i].th_id+'</th>';
							};
						 table+='</tr>';
					        for(var i in data_table_td){
				               table+='<tr>';
							      for(var a in data_table_td[i]){
							           table+='<td>'+data_table_td[i][a].td_text+'</td>';
							     }
							   table+='</tr>';
						 	 };
						 table+='</table>';
						 str+=table;
						 main_popup.append(str);
						 };
						  
				$.data_add_url = function(){                                    //url数据添加
				    var Hf = main_popup.height();
					var Wf = main_popup.width();
					var Iframe=$('<iframe scrolling="no" frameborder="0" src='+obj.Data_url+' width='+Wf+' height='+Hf+'></iframe>');
					main_popup.append(Iframe);
					Iframe.load(function(){
						var Fh = Iframe.contents().find("body").height();
						Iframe.attr("height",Fh);
						})
					};		 
								
				$.data_add_obj = function(){                                 //对象数据添加
					var Nobj=$("#"+obj.Data_id);
					 if(Nobj.is(":hidden")){Nobj.show();}
					 main_popup.append(Nobj);
					};	
						 
			$.popup_show();
			})
		}
})(jQuery);
